import { ArrayNotEmpty, IsDefined } from 'class-validator';
import { ChatCompletionRequestMessage } from 'openai';

export class CreateCompletionDto {
  @IsDefined()
  model: string;

  @ArrayNotEmpty()
  messages: ChatCompletionRequestMessage[];

  temperature?: number | null = 0;
}
