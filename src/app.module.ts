import { HttpModule } from '@nestjs/axios';
import { CacheModule, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { RandomController } from './random/random.controller';
import { RandomService } from './random/random.service';

@Module({
  imports: [
    ThrottlerModule.forRoot({
        ttl: 60,
        limit: 30
      }),
    HttpModule,
    CacheModule.register()
  ],
  controllers: [RandomController],
  providers: [
    RandomService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ],
})
export class AppModule {}
