import { Module } from "@nestjs/common";
import { CrawlService } from "./crawl.service";
import { CrawlController } from "./crawl.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QiDataHourlyEntity } from "./entities/qi-data-hourly.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([QiDataHourlyEntity]),
  ],
  providers: [CrawlService],
  controllers: [CrawlController],
})
export class CrawlModule {}
