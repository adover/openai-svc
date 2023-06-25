import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import {
  CreateEditRequest,
  CreateCompletionRequest,
  CreateChatCompletionRequest,
} from 'openai';
import { CompletionType, OpenAiService } from './openai.service';
import { handleRequestError } from 'src/app/errors/handleRequestError';
import { CreateCompletionDto } from './dtos/create-completion.dto';
import { CreateChatDto } from './dtos/create-chat.dto';

@Controller('gpt')
export class OpenAiController {
  private logger = new Logger(OpenAiController.name);
  constructor(private readonly openaiService: OpenAiService) {}

  @Post('edit/:type')
  async createEdit(
    @Body() config: CreateEditRequest,
    @Param('type') type: CompletionType
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
    @Body() config: CreateCompletionDto,
    @Param('type') type: CompletionType
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

  @Post('chat/:type')
  async createChatCompletion(
    @Body() config: CreateChatDto,
    @Param('type') type: CompletionType
  ) {
    try {
      const res = await this.openaiService.createChatCompletion(type, config);

      return res;
    } catch (error) {
      handleRequestError(this.logger, error, 'createChatCompletion');
    }
  }
}
