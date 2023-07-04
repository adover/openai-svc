import { ArrayNotEmpty, IsDefined } from 'class-validator';
import { CreateCompletionRequestPrompt } from 'openai';

export class CreateCompletionDto {
  @IsDefined()
  model: string;

  @ArrayNotEmpty()
  prompt: CreateCompletionRequestPrompt[];

  temperature?: number | null = 0;
}
