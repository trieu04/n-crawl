import { Crud, CrudRequest, CrudRequestInterceptor, Override, ParsedRequest } from "@dataui/crud";
import { Controller, UseInterceptors } from "@nestjs/common";
import { QiDataHourlyEntity } from "./qi-data-hourly.entity";
import { QiDataHourlyService } from "./qi-data-hourly.service";
import { ApiTags } from "@nestjs/swagger";

@UseInterceptors(CrudRequestInterceptor)
@Crud({
  model: {
    type: QiDataHourlyEntity,
  },
  routes: {
    only: ["getManyBase"],
  },
})
@Controller("qi-data-hourly")
export class QiDataHourlyController {
  constructor(public service: QiDataHourlyService) {}

  @Override()
  @ApiTags("App")
  async getMany(@ParsedRequest() req: CrudRequest) {
    return this.service.getMany(req);
  }
}
