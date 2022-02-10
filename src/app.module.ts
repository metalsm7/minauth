import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './v1/auth/auth.controller';
import { RequestExtMiddleware } from './middleware/request-ext.middleware';
import { urlencoded, json } from 'express';

@Module({
  imports: [],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(urlencoded({ limit: '5mb', }), json({ limit: '5mb', }))
    .forRoutes('*')
      .apply(RequestExtMiddleware)
      .forRoutes('*');
  }
}
