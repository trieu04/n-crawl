import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@dataui/crud";
import { Controller, Get, Response as NestResponse, UseInterceptors } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";
import { CrudGetManyQueries } from "src/common/decorators/get-many-query.decorator";
import { QiDataHourlyEntity } from "./qi-data-hourly.entity";
import { QiDataHourlyService } from "./qi-data-hourly.service";

@UseInterceptors(CrudRequestInterceptor)
@Crud({
  model: {
    type: QiDataHourlyEntity,
  },
  routes: {
    only: ["getManyBase"],
  },
})
@ApiTags("App", "Qi Data Hourly")
@Controller("qi-data-hourly")
export class QiDataHourlyController {
  constructor(public service: QiDataHourlyService) {}


  @Override("getManyBase")
  async getMany(@ParsedRequest() req: CrudRequest) {
    return this.service.getMany(req);
  }

  @CrudGetManyQueries()
  @Get("/export")
  async exportToXlsx(@ParsedRequest() req: CrudRequest, @NestResponse() res: Response) {
    return this.service.exportToXlsx(req, res);
  }
}
