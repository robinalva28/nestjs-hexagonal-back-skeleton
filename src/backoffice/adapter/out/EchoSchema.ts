import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Echo {

  @Prop()
  response: string;

  @Prop({ type: String, select: false })
  _id: string;

  @Prop({ type: Number, select: false })
  __v: number;
}

export const EchoSchema = SchemaFactory.createForClass(Echo);