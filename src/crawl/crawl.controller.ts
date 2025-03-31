import { Controller, Get, Param, Post } from "@nestjs/common";
import { CrawlService } from "./crawl.service";

@Controller("crawl")
export class CrawlController {
  constructor(
    private readonly crawlService: CrawlService,
  ) {}

  @Get("test-crawl-qi-data-hourly")
  async test(@Param("stationId") stationId: string) {
    return this.crawlService.testCrawlQiDataHourly({ stationId });
  }

  @Get("test-crawl-station")
  async testStation() {
    return this.crawlService.testCrawlStation();
  }

  @Post("test-process-crawl-qi-data-hourly")
  async testProcessCrawlQiDataHourly() {
    return this.crawlService.testProcessCrawlQiDataHourly();
  }
}
