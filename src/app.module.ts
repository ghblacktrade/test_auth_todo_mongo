import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongoConfig } from './config/mongo';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './to-do/todo.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: mongoConfig,
    }),
    AuthModule,
    TodoModule,
  ],
})
export class AppModule {}
