import { Injectable, Logger } from '@nestjs/common';
import { NewReviewDto } from './dto/new-review.dto';
import { CompletionType, OpenAiService } from '../openai/openai.service';
import {
  codeReviewSystemRequest,
  codeReviewUserRequest,
} from '../openai/prompts/code-review';

@Injectable()
export class ReviewService {
  private logger = new Logger(ReviewService.name);

  constructor(private openAiService: OpenAiService) {}

  async new(newReviewDto: NewReviewDto) {
    this.logger.log('New review posted');
    this.logger.debug('Review content', newReviewDto);

    const { language, parameters, code } = newReviewDto;

    const systemMessage = codeReviewSystemRequest(language, parameters);

    const userMessage = codeReviewUserRequest(language, code);

    const messages = [systemMessage, userMessage];

    this.logger.debug('Built messages', messages);

    const res = await this.openAiService.createChatCompletion(
      CompletionType.text,
      { messages }
    );

    this.logger.log('Completion created successfully!');

    this.logger.debug(res);
  }
}
