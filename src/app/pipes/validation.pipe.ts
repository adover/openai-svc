import { PipeTransform, ArgumentMetadata } from '@nestjs/common';

/**
 * TODO: Hook up with Joi as per https://blog.logrocket.com/understanding-object-validation-joi-nestjs/
 */
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
