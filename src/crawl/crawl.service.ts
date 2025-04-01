import { Injectable, Logger } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import axiosRetry from "axios-retry";
import { CronJob } from "cron";
import { QiDetailResponse } from "./dtos/qi-detail-response.dto";
import { Repository } from "typeorm";
import { QiDataHourlyEntity } from "./qi-data-hourly/qi-data-hourly.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CrawlService {
  private job: CronJob;
  private logger: Logger;
  private axios: AxiosInstance;
  constructor(
    @InjectRepository(QiDataHourlyEntity) private readonly qiDataHourlyRepo: Repository<QiDataHourlyEntity>,
  ) {
    const job = CronJob.from({
      cronTime: "0 0,6,12,18 * * *", // Every day 12AM, 6 AM, 12 PM, and 6 PM
      onTick: async () => {
        await this.processCrawlQiDataHourly();
      },
      start: true,
      timeZone: "Asia/Ho_Chi_Minh", // Time zone for Vietnam
    });
    this.job = job;

    this.logger = new Logger("CrawlService");
    this.axios = axios.create();
    axiosRetry(this.axios, {
      retries: 3,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  async testProcessCrawlQiDataHourly() {
    return await this.processCrawlQiDataHourly();
  }

  async processCrawlQiDataHourly() {
    const stations = await this.getAqiStations();
    this.logger.log(`Crawling Qi Data Hourly for stations ${stations.length}`);

    for (const station of stations) {
      const stationId = station.id;
      const crawlDate = new Date();
      try {
        const result = await this.getQiDataHourly({ stationId });
        if (!result) {
          throw new Error("No data returned from getQiDataHourly");
        }
        const upsertData = result.map(([time, detail]) => {
          return {
            crawlDate,
            stationId,
            time,
            detail,
          };
        });
        await this.qiDataHourlyRepo.upsert(upsertData, ["stationId", "time"]);
      }
      catch (error) {
        this.logger.error(`Error processing station ${stationId}, station name ${station.station_name}`, station, error);
      }
    }
  }

  async testCrawlStation() {
    return await this.getAqiStations();
  }

  async testCrawlQiDataHourly({ stationId }) {
    return await this.getQiDataHourly({ stationId });
  }

  async getQiDataHourly({ stationId }) {
    const data = await this.getQiDetail({ stationId });

    const timeMap = new Map();

    if (data.success === false) {
      this.logger.error("Get Qi Data Hourly failed", data);
      return;
    }

    Object.entries(data.res).forEach(([pollutant, detail]) => {
      detail.values.forEach((item) => {
        Object.entries(item).forEach(([aqi, timeString]) => {
          if (timeMap.has(timeString)) {
            timeMap.get(timeString)[pollutant] = aqi;
          }
          else {
            timeMap.set(timeString, { [pollutant]: aqi });
          }
        });
      });
    });

    return Array.from(timeMap.entries());
  }

  async getAqiStations() {
    const { data } = await axios.post<AqiStationResponse>("https://envisoft.gov.vn/eos/services/call/json/get_stations", {
      is_qi: true,
      is_public: true,
      qi_type: "aqi",
    });

    return data.stations;
  }

  async getQiDetail({ stationId }) {
    const { data } = await this.axios.post<QiDetailResponse>("https://envisoft.gov.vn/eos/services/call/json/qi_detail", {
      station_id: stationId,
    });

    return data;
  }
}
