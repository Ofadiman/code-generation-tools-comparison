import { IsEmail, IsMongoId, IsString, MaxLength, MinLength } from 'class-validator'
import { USER_CONSTRAINTS } from '../user.constraints'

export class UsersControllerChangeEmailRequestBodyDto {
  @IsString()
  @IsEmail()
  @MinLength(USER_CONSTRAINTS.EMAIL.MIN_LENGTH)
  @MaxLength(USER_CONSTRAINTS.EMAIL.MAX_LENGTH)
  public readonly newEmail: string
}

export class UsersControllerChangeEmailRequestPathDto {
  @IsMongoId()
  public readonly userId: string
}
