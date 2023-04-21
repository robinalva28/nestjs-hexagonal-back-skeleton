import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { GetEchoUseCase } from "../port/in/GetEchoUseCase";
import { EchoPort } from "../port/out/EchoPort";


@Injectable()
export class EchoService implements GetEchoUseCase{
  private readonly echoPort;
  private readonly logger = new Logger('EchoService');

  constructor(@Inject('EchoPort') echoPort: EchoPort) {
    this.echoPort = echoPort;
  }

  async printEcho() {
    const echo = await this.echoPort.getEcho();
    if (!echo) {
      this.logger.error('echo not found')
      throw new NotFoundException('Echo not found');
    }
    return echo;
  }

}