import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Configuration,
  CreateChatCompletionRequest,
  CreateCompletionRequest,
  CreateEditRequest,
  OpenAIApi,
} from 'openai';

export enum CompletionType {
  Text = 'TEXT',
  Code = 'CODE',
}

/**
 * OpenAI Code Reference for later
 * https://github.com/openai/openai-node/blob/master/dist/api.js
 */
@Injectable()
export class OpenaiService {
  private logger = new Logger(OpenaiService.name);
  configuration: Configuration;
  openai: OpenAIApi;

  constructor(private http: HttpService, private configService: ConfigService) {
    this.configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
      organization: configService.get('OPENAI_ORG_ID'),
    });

    this.openai = new OpenAIApi(this.configuration);
  }

  /**
   * EDITS
   * Given a prompt and an instruction, the model will return an edited version of the prompt.
   */
  async createEdit(type: CompletionType, config: CreateEditRequest) {
    const edit = await this.openai.createEdit({
      model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
      ...config,
    });

    return edit;
  }

  /**
   * COMPLETIONS
   * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
   */
  async createCompletion(
    type: CompletionType,
    config: CreateCompletionRequest
  ) {
    const completion = await this.openai.createCompletion({
      model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
      max_tokens: this.configService.get(`OPENAI_DEFAULT_MAX_TOKENS_${type}`),
      ...config,
    });

    return completion;
  }

  /**
   * CHAT
   * Given a list of messages comprising a conversation, the model will return a response.
   */
  async createChatCompletion(
    type: CompletionType,
    config: CreateChatCompletionRequest
  ) {
    const chatCompletion = await this.openai.createChatCompletion({
      model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
      max_tokens: this.configService.get(`OPENAI_DEFAULT_MAX_TOKENS_${type}`),
      ...config,
    });

    return chatCompletion;
  }
}
