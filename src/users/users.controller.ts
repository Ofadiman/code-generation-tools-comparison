import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersControllerRegisterRequestBodyDto } from './dto/users.register.dto'
import {
  UsersControllerChangeEmailRequestBodyDto,
  UsersControllerChangeEmailRequestPathDto,
} from './dto/users.change-email.dto'
import { UsersControllerGetByIdRequestParamDto } from './dto/users.get-by-id'

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post('register')
  public async register(@Body() body: UsersControllerRegisterRequestBodyDto) {
    return this.usersService.register(body)
  }

  @Patch(':userId/email')
  public async changeEmail(
    @Body() body: UsersControllerChangeEmailRequestBodyDto,
    @Param() param: UsersControllerChangeEmailRequestPathDto,
  ) {
    return this.usersService.changeEmail({ ...body, ...param })
  }

  @Get(':userId')
  public async getById(@Param() param: UsersControllerGetByIdRequestParamDto) {
    return this.usersService.getById(param)
  }
}
