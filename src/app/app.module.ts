import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "src/auth/auth.module";
import { GlobalConfigModule } from "src/config/global-config.module";
import { HealthModule } from "src/health/health.module";
import { UsersModule } from "src/users/users.module";
import { CrawlModule } from "src/crawl/crawl.module";

@Module({
  imports: [GlobalConfigModule, AuthModule, UsersModule, HealthModule, CrawlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
