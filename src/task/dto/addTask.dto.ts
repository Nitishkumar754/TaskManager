import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import ProjectEntity from 'src/project/project.entity';

export default class addTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  projectId: ProjectEntity;

  @IsString()
  @IsOptional()
  parentTaskId: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  weight: number;
}
