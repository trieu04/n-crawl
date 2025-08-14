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
        "id": item.id,
        "crawlAt": item.crawlAt,
        "stationId": item.stationId,
        "time": item.time,
        "CO": item.detail?.CO ?? null,
        "PM-10": item.detail["PM-10"] ?? null,
        "SO2": item.detail?.SO2 ?? null,
        "PM-2-5": item.detail["PM-2-5"] ?? null,
        "O3": item.detail?.O3 ?? null,
        "NO2": item.detail?.NO2 ?? null,
      };
    });

    const heading = [["id", "crawlAt", "stationId", "time", "CO", "PM-10", "SO2", "PM-2-5", "O3", "NO2"]];
    const headingStyle = { font: { bold: true } };
    const ws = XLSX.utils.json_to_sheet([]);
    XLSX.utils.sheet_add_aoa(ws, heading);

    const headerRange = { s: { r: 0, c: 0 }, e: { r: 0, c: heading[0].length - 1 } };
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: headerRange.s.r, c: C });
      if (!ws[cellAddress])
        continue;
      ws[cellAddress].s = headingStyle;
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.sheet_add_json(ws, data, { origin: "A2", skipHeader: true });
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    const buffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=qi-data-hourly.xlsx");

    res.send(buffer);
  }
}
