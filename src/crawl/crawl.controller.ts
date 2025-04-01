import { Controller, HttpCode, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { CrawlService } from "./crawl.service";

@ApiTags("Crawl", "App")
@Controller("crawl")
export class CrawlController {
  constructor(
    private readonly crawlService: CrawlService,
  ) {}

  @ApiOperation({
    summary: "Test crawl station",
  })
  @Post("test-crawl-station")
  @HttpCode(200)
  async testStation() {
    return this.crawlService.testCrawlStation();
  }

  @ApiOperation({
    summary: "Test crawl qi data hourly",
  })
  @Post("test-crawl-qi-data-hourly")
  @HttpCode(200)
  async test(@Param("stationId") stationId: string) {
    return this.crawlService.testCrawlQiDataHourly({ stationId });
  }

  @ApiOperation({
    summary: "Test process crawl qi data hourly",
    description: "Status code 200 indicates a successful request, does not include any response data.",
  })
  @Post("test-process-crawl-qi-data-hourly")
  @HttpCode(200)
  async testProcessCrawlQiDataHourly() {
    return this.crawlService.testProcessCrawlQiDataHourly();
  }
}
