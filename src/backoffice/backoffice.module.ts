import { Module } from '@nestjs/common';
import { EchoService } from "./application/service/EchoService";
import { EchoAdapter } from "./adapter/out/EchoAdapter";
import { EchoController } from "./adapter/in/EchoController";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { Echo, EchoSchema } from "./adapter/out/EchoSchema";

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:Echo.name, schema: EchoSchema},
        //...
    ]),
    ConfigModule.forRoot(),
  ],
  // ------------------------------------------- CONTROLLERS
  controllers: [EchoController],
  // ------------------------------------------- PROVIDERS
  providers: [
    EchoService,
    EchoAdapter,
    {provide: 'GetEchoUseCase', useClass: EchoService},
    {provide: 'EchoPort', useClass: EchoAdapter},
    //...
  ],
  // ------------------------------------------- EXPORTS
  exports: [
    MongooseModule,
  ]
})
export class BackofficeModule {}
