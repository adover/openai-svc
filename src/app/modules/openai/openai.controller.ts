import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateEditRequest,
  CreateCompletionRequest,
  CreateChatCompletionRequest,
} from 'openai';
import { CompletionType, OpenAiService } from './openai.service';
import { handleRequestError } from 'src/app/errors/handleRequestError';

@Controller('gpt')
export class OpenAiController {
  private logger = new Logger(OpenAiController.name);
  constructor(private readonly openaiService: OpenAiService) {}

  @Post('edit')
  async createEdit(
    @Body() config: CreateEditRequest,
    @Param() type: CompletionType
  ) {
    try {
      const edit = await this.openaiService.createEdit(type, config);
      return edit;
    } catch (error) {
      handleRequestError(this.logger, error, 'createEdit');
    }
  }

  @Post('completion/:type')
  async createCompletion(
    @Body() config: CreateCompletionRequest,
    @Param() type: CompletionType
  ) {
    try {
      const completion = await this.openaiService.createCompletion(
        type,
        config
      );
      return completion;
    } catch (error) {
      handleRequestError(this.logger, error, 'createCompletion');
    }
  }

  @Post('chat')
  async createChatCompletion(
    @Body() config: CreateChatCompletionRequest,
    @Param() type: CompletionType
  ) {
    try {
      const chatCompletion = await this.openaiService.createChatCompletion(
        type,
        config
      );
      return chatCompletion;
    } catch (error) {
      handleRequestError(this.logger, error, 'createChatCompletion');
    }
  }
}
