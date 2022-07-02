import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

const logger = new Logger('Bootstrap')

async function bootstrap() {
  const nestApplication = await NestFactory.create(AppModule)
  await nestApplication.listen(process.env.PORT)
}

bootstrap()
  .then(() => {
    logger.log(`The application is flying 🚀 on port ${process.env.PORT}!`)
  })
  .catch((error) => {
    logger.log(`The application exploded 💥 emitting the following error:`)
    logger.error(error)
  })
