import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { OpenAiService } from '../openai/openai.service';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, OpenAiService],
})
export class ReviewModule {}
