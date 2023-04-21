import { Controller, Get, Inject } from "@nestjs/common";
import { GetEchoUseCase } from "../../application/port/in/GetEchoUseCase";
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from "@nestjs/swagger";
import { EchoView } from "./EchoView";
import { Echo } from "../out/EchoSchema";


@Controller('echo')
@ApiTags('Echo')
export class EchoController {
  private readonly getEchoUseCase
  constructor(@Inject('GetEchoUseCase') getEchoUseCase: GetEchoUseCase){
    this.getEchoUseCase = getEchoUseCase;
  }

  @Get()
  @ApiExtraModels(EchoView)
  @ApiOkResponse({
    description: 'echo OK',
    status:200,
    schema: {
      $ref: getSchemaPath(EchoView),
    },
  })
  async getEcho(): Promise<EchoView>{
    return await this.getEchoUseCase.printEcho();
  }
}

