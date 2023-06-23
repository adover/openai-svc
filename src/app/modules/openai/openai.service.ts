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
export class OpenAiService {
  private logger = new Logger(OpenAiService.name);
  configuration: Configuration;
  openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    this.initialiseOpenAi(configService);
  }

  /**
   * Checks for keys and bootstraps OpenAI
   */
  private initialiseOpenAi(
    configService: ConfigService<Record<string, unknown>, false>
  ) {
    this.logger.debug('Starting OpenAI Service');

    const apiKey = configService.get('OPENAI_API_KEY');
    const organization = configService.get('OPENAI_ORG_ID');

    if (!apiKey) {
      this.logger.error('OPENAI_API_KEY not set!');
      return;
    }

    if (!organization) {
      this.logger.error('OPENAI_ORG_ID not set!');
      return;
    }

    this.configuration = new Configuration({
      apiKey,
      organization,
    });

    this.openai = new OpenAIApi(this.configuration);
  }

  /**
   * EDITS
   * Given a prompt and an instruction, the model will return an edited version of the prompt.
   */
  async createEdit(type: CompletionType, config: CreateEditRequest) {
    this.throwIfNotInitialised();

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
    this.throwIfNotInitialised();

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
    this.throwIfNotInitialised();

    const chatCompletion = await this.openai.createChatCompletion({
      model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
      max_tokens: this.configService.get(`OPENAI_DEFAULT_MAX_TOKENS_${type}`),
      ...config,
    });

    return chatCompletion;
  }

  private throwIfNotInitialised() {
    // TODO: Custom Error Type
    if (!this.openai) throw new Error('OpenAI not initialised');
  }
}
