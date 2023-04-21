import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BackofficeModule } from './backoffice/backoffice.module';
import * as process from "process";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_DB_ATLAS,
      {dbName: process.env.MONGO_DB_NAME}
      ),
    BackofficeModule,
  ],
  // ------------------------------------------- CONTROLLERS
  controllers: [],
  // ------------------------------------------- PROVIDERS
  providers: [
    //{provide: 'some', useClass: someClass},
    //...
  ],
  // ------------------------------------------- EXPORTS
})
export class AppModule {}
