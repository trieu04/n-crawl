import { TypeOrmCrudService } from "@dataui/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QiDataHourlyEntity } from "./qi-data-hourly.entity";

@Injectable()
export class QiDataHourlyService extends TypeOrmCrudService<QiDataHourlyEntity> {
  constructor(
    @InjectRepository(QiDataHourlyEntity)
    private readonly repository: Repository<QiDataHourlyEntity>,
  ) {
    super(repository);
  }
}
