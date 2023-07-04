import {
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { ReviewParameter } from '../entities/review-parameter.entity';

export type Language =
  | 'css'
  | 'html'
  | 'typescript'
  | 'javascript'
  | 'csharp'
  | 'angular'
  | 'react'
  | 'python';

export class NewReviewDto {
  @IsNotEmpty()
  language: Language;

  @ArrayNotEmpty()
  parameters: ReviewParameter[];

  @IsString()
  @MinLength(11)
  code: string;
}
