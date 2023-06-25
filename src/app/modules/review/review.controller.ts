import { Controller, Post, Body } from '@nestjs/common';
import { ReviewService } from './review.service';
import { NewReviewDto } from './dto/new-review.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('review')
@ApiTags('Reviews Methods')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({
    summary: 'Post New Code Review',
    description:
      'Passing a desired language, a set of options choosing the parameters for the review, and the code; this will return a review of the code.',
  })
  newCodeReview(@Body() newReviewDto: NewReviewDto) {
    return this.reviewService.new(newReviewDto);
  }
}
