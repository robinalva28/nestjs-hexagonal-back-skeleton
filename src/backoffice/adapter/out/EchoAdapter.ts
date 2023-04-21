import { EchoPort } from "../../application/port/out/EchoPort";
import { Echo } from "./EchoSchema";
import { InjectModel } from "@nestjs/mongoose";
import { Logger } from "@nestjs/common";


export class EchoAdapter implements EchoPort {

  private readonly echoRepository;
  private readonly ECHO_MESSAGE: string = 'Echo from DB';
  private readonly logger = new Logger('EchoAdapter');
  constructor(
    @InjectModel('Echo')
      echoRepository,
  ) {
    this.echoRepository = echoRepository;
  }


  public async getEcho(): Promise<Echo> {
    this.logger.log('obtaining echo...');

    const echo = await this.echoRepository.find();
    if(echo.length != 0){
      this.logger.log('obtaining echo... OK');
      return echo;
    }

    const newEcho = new this.echoRepository({response: this.ECHO_MESSAGE});
    return await newEcho.save();
  }

}