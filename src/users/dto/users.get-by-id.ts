import { IsMongoId } from 'class-validator'

export class UsersControllerGetByIdRequestParamDto {
  @IsMongoId()
  public readonly userId: string
}
