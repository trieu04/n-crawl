import { Module } from "@nestjs/common";
import { QiDataHourlyService } from "./qi-data-hourly.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QiDataHourlyEntity } from "./qi-data-hourly.entity";
import { QiDataHourlyController } from "./qi-data-hourly.controller";

@Module({
  imports: [
    TypeOrmModule.forFeature([QiDataHourlyEntity]),
  ],
  controllers: [QiDataHourlyController],
  providers: [QiDataHourlyService],
})
export class QiDataHourlyModule {}
