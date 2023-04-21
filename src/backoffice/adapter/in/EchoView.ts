import { Expose } from "class-transformer";
import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class EchoView{

  @ApiProperty()
  @IsString()
  @Expose()
  response: string[]

  constructor(response) {
    this.response = response;
  }
}