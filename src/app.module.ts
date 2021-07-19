import { Module } from '@nestjs/common';
import { RandomController } from './random/random.controller';
import { RandomService } from './random/random.service';

@Module({
  imports: [],
  controllers: [RandomController],
  providers: [RandomService],
})
export class AppModule {}
