import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export default class updateTaskDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  weight: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  progress: number;
}
