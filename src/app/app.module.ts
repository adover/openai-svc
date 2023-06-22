import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenaiModule } from './modules/openai/openai.module';

import config from '../config/config';
import { LoggerModule } from 'nestjs-pino';

/**
 * Pino Notes
 * Passing objects into the Pino logs
 * You will likely want to pass in objects
 * into your logs and make use of the built-in
 * JSON nature of Pino. To do that you'll need to
 * follow the "Pino" way of doing things, where you
 * pass in the object as the first argument and the log
 * message as the 2nd argument.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, isGlobal: true, load: [config] }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    OpenaiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
