import { Module } from "@nestjs/common";
import { CrawlService } from "./crawl.service";
import { CrawlController } from "./crawl.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QiDataHourlyEntity } from "./qi-data-hourly/qi-data-hourly.entity";
import { QiDataHourlyModule } from "./qi-data-hourly/qi-data-hourly.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([QiDataHourlyEntity]),
    QiDataHourlyModule,
  ],
  providers: [CrawlService],
  controllers: [CrawlController],
})
export class CrawlModule {}
