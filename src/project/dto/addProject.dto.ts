import { IsString } from 'class-validator';

export default class addProjectDto {
  @IsString()
  description: string;

  @IsString()
  name: string;
}
