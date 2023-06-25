import { Injectable, Logger } from '@nestjs/common';
import { NewReviewDto } from './dto/new-review.dto';

@Injectable()
export class ReviewService {
  private logger = new Logger(ReviewService.name);
  new(newReviewDto: NewReviewDto) {
    return 'This action adds a new review';
  }
}
