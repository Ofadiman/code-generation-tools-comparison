import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'
import { USER_CONSTRAINTS } from '../user.constraints'

export class UsersControllerRegisterRequestBodyDto {
  @IsString()
  @MinLength(USER_CONSTRAINTS.FIRST_NAME.MIN_LENGTH)
  @MaxLength(USER_CONSTRAINTS.FIRST_NAME.MAX_LENGTH)
  public readonly firstName: string

  @IsString()
  @MinLength(USER_CONSTRAINTS.LAST_NAME.MIN_LENGTH)
  @MaxLength(USER_CONSTRAINTS.LAST_NAME.MAX_LENGTH)
  public readonly lastName: string

  @IsString()
  @IsEmail()
  @MinLength(USER_CONSTRAINTS.EMAIL.MIN_LENGTH)
  @MaxLength(USER_CONSTRAINTS.EMAIL.MAX_LENGTH)
  public readonly email: string

  @IsString()
  @MinLength(USER_CONSTRAINTS.PASSWORD.MIN_LENGTH)
  @MaxLength(USER_CONSTRAINTS.PASSWORD.MAX_LENGTH)
  public readonly password: string
}
