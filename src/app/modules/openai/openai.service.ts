import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from 'openai';

/**
 * /v1/chat/completions	gpt-4, gpt-4-0613, gpt-4-32k, gpt-4-32k-0613, gpt-3.5-turbo, gpt-3.5-turbo-0613, gpt-3.5-turbo-16k, gpt-3.5-turbo-16k-0613
/v1/completions	text-davinci-003, text-davinci-002, text-curie-001, text-babbage-001, text-ada-001
/v1/edits	text-davinci-edit-001, code-davinci-edit-001
/v1/audio/transcriptions	whisper-1
/v1/audio/translations	whisper-1
/v1/fine-tunes	davinci, curie, babbage, ada
/v1/embeddings	text-embedding-ada-002, text-search-ada-doc-001
/v1/moderations	text-moderation-stable, text-moderation-latest
 */
@Injectable()
export class OpenaiService {
  private logger = new Logger(OpenaiService.name);
  configuration: Configuration;

  constructor(private http: HttpService, private configService: ConfigService) {
    this.configuration = new Configuration({
      apiKey: configService.get('OPENAI_API_KEY'),
      organization: configService.get('OPENAI_ORG_ID'),
    });
  }

  /**
   * EDITS
   * Given a prompt and an instruction, the model will return an edited version of the prompt.
   */

  /**
   * COMPLETIONS
   * Given a prompt, the model will return one or more predicted completions, and can also return the probabilities of alternative tokens at each position.
   */

  /**
   * CHAT
   * Given a list of messages comprising a conversation, the model will return a response.
   */
}
