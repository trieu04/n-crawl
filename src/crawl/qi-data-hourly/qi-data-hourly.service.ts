import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QiDataHourlyEntity } from "./qi-data-hourly.entity";
import * as XLSX from "xlsx";
import { CrudRequest, GetManyDefaultResponse } from "@dataui/crud";
import { Response } from "express";

@Injectable()
export class QiDataHourlyService extends TypeOrmCrudService<QiDataHourlyEntity> {
  constructor(
    @InjectRepository(QiDataHourlyEntity)
    private readonly repository: Repository<QiDataHourlyEntity>,
  ) {
    super(repository);
  }

  async exportToXlsx(req: CrudRequest, res: Response) {
    const result = await this.getMany(req) as GetManyDefaultResponse<QiDataHourlyEntity>;

    const data = result.data.map((item) => {
      return {
        crawlAt: item.crawlAt,
        stationId: item.stationId,
        time: item.time,
        ...(item.detail || {}),
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=qi-data-hourly.xlsx");

    res.send(buffer);
  }
}
