import { Module } from '@nestjs/common';
import { RandomController } from './random/random.controller';

@Module({
  imports: [],
  controllers: [RandomController],
  providers: [],
})
export class AppModule {}
