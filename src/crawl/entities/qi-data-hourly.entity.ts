import { JsonColumn } from "src/common/decorators/json-column.decorator";
import { BaseEntityWithBigintId } from "src/common/entities/base.entity";
import { Column, Entity, Unique } from "typeorm";

@Entity("qi_data_hourly")
@Unique("key", ["stationId", "time"])
export class QiDataHourlyEntity extends BaseEntityWithBigintId {
  @Column({ type: "timestamp", nullable: true })
  crawlAt: Date;

  @Column({ })
  stationId: string;

  @Column({ })
  time: string;

  @JsonColumn()
  detail: any;
}
