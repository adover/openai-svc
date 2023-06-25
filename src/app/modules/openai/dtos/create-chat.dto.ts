import { ArrayNotEmpty, IsDefined } from 'class-validator';
import { ChatCompletionRequestMessage } from 'openai';

export class CreateChatDto {
  @IsDefined()
  model: string;

  @ArrayNotEmpty()
  messages: ChatCompletionRequestMessage[];

  temperature?: number | null = 0;
}
