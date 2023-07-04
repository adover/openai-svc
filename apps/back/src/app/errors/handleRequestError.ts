import { HttpException, HttpStatus, Logger } from '@nestjs/common';

export const handleRequestError = (
  logger: Logger,
  error: Error,
  methodName: string
): void => {
  logger.error(`Error in '${methodName}': ${error.message}`);

  const message = process.env.ERROR_STACK_TRACE
    ? error.message
    : 'An error occurred during request processing.';

  throw new HttpException(message, HttpStatus.INTERNAL_SERVER_ERROR);
};
