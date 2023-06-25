import { Body, Controller, Logger, Param, Post } from '@nestjs/common';
import { CreateEditRequest } from 'openai';
import { CompletionType, OpenAiService } from './openai.service';
import { handleRequestError } from 'src/app/errors/handleRequestError';
import { CreateCompletionDto } from './dto/create-completion.dto';
import { CreateChatDto } from './dto/create-chat.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('gpt')
@ApiTags('OpenAI Direct Methods')
export class OpenAiController {
  private logger = new Logger(OpenAiController.name);
  constructor(private readonly openaiService: OpenAiService) {}

  @Post('edit/:type')
  @ApiOperation({
    summary: 'Create Edit',
    description:
      'Given a prompt and an instruction, the model will return an edited version of the prompt.',
  })
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
  @ApiOperation({
    summary: 'Create Completion',
    description:
      'Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.',
  })
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
  @ApiOperation({
    summary: 'Create Chat Completion',
    description:
      'Given a list of messages comprising a conversation, the model will return a response.',
  })
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
