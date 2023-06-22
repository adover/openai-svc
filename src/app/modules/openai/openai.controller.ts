import { Body, Controller, Param, Post } from '@nestjs/common';
import {
  CreateEditRequest,
  CreateCompletionRequest,
  CreateChatCompletionRequest,
} from 'openai';
import { CompletionType, OpenaiService } from './openai.service';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('edit')
  async createEdit(
    @Body() config: CreateEditRequest,
    @Param() type: CompletionType
  ) {
    const edit = await this.openaiService.createEdit(type, config);
    return edit;
  }

  @Post('completion/:type')
  async createCompletion(
    @Body() config: CreateCompletionRequest,
    @Param() type: CompletionType
  ) {
    const completion = await this.openaiService.createCompletion(type, config);
    return completion;
  }

  @Post('chat')
  async createChatCompletion(
    @Body() config: CreateChatCompletionRequest,
    @Param() type: CompletionType
  ) {
    const chatCompletion = await this.openaiService.createChatCompletion(
      type,
      config
    );
    return chatCompletion;
  }
}
