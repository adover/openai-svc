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
  text = 'TEXT',
  code = 'CODE',
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

    const { apiKey, orgKey: organization } = configService.get('openai');

    if (!apiKey) {
      this.logger.error('OPENAI_API_KEY not set!');
      return;
    }

    if (!organization) {
      this.logger.error('OPENAI_ORG_KEY not set!');
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
    try {
      this.throwIfNotInitialised();

      const edit = await this.openai.createEdit({
        model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
        temperature: this.configService.get('OPENAI_TEMPERATURE'),
        ...config,
      });

      return edit;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      throw error;
    }
  }

  /**
   * COMPLETIONS
   * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
   */
  async createCompletion(
    type: CompletionType,
    config: CreateCompletionRequest
  ) {
    this.logger.debug('Enter createCompletion with config', config);

    try {
      this.throwIfNotInitialised();

      const completion = await this.openai.createCompletion({
        model: this.configService.get(`OPENAI_DEFAULT_MODEL_${type}`),
        temperature: this.configService.get('OPENAI_TEMPERATURE'),
        max_tokens: this.configService.get(`OPENAI_DEFAULT_MAX_TOKENS_${type}`),
        ...config,
      });

      return completion;
    } catch (error) {
      console.log(error);
      this.logger.error(error.message, error.stack);

      throw error;
    }
  }

  /**
   * CHAT
   * Given a list of messages comprising a conversation, the model will return a response.
   */
  async createChatCompletion(
    type: CompletionType,
    config: CreateChatCompletionRequest
  ) {
    try {
      this.throwIfNotInitialised();

      if (CompletionType[type] !== CompletionType.text) {
        // TODO: Turn into a bad request error
        throw new Error(
          'Only text completion available on this OpenAI endpoint'
        );
      }

      const req = {
        model: this.configService.get(
          `OPENAI_DEFAULT_MODEL_${CompletionType[type]}`
        ),
        temperature: this.configService.get('OPENAI_TEMPERATURE'),
        max_tokens: Number(
          this.configService.get(
            `OPENAI_DEFAULT_MAX_TOKENS_${CompletionType[type]}`
          )
        ),
        ...config,
      };

      const res = await this.openai.createChatCompletion(req);

      return res.data.choices[0].message.content;
    } catch (error) {
      this.logger.error(error.message, error.stack);

      throw error;
    }
  }

  private throwIfNotInitialised() {
    // TODO: Custom Error Type
    if (!this.openai) throw new Error('OpenAI not initialised');
  }
}
