import { Module, ValidationPipe } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { ENVIRONMENT_VARIABLES } from '@constants'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./.${process.env.NODE_ENV}.env`,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get(ENVIRONMENT_VARIABLES.DATABASE_URI),
          authSource: 'admin',
          auth: {
            username: configService.get(ENVIRONMENT_VARIABLES.DATABASE_USER),
            password: configService.get(ENVIRONMENT_VARIABLES.DATABASE_PASSWORD),
          },
        }
      },
    }),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        transform: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
