import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessageRoleEnum,
} from 'openai';

export enum CodeReviewParameter {
  Spelling = 'spelling',
  Logging = 'displaying relevant logging',
  Efficiency = 'efficiency of code including time and space complexity',
  Errors = 'code errors',
  Readability = 'readability',
  BestPractice = 'best practices',
}

export const codeReviewUserRequest = (
  lang: string,
  code: string
): ChatCompletionRequestMessage => ({
  role: ChatCompletionResponseMessageRoleEnum.User,
  content: `Please review my code sample inside the block below: 
    \`\`\`${lang}
    ${code}
    \`\`\`
    `,
});
/**
 * A list of custom prompts
 * role: The role of the messages author. One of system, user, assistant, or function.
 */
export const codeReview = (
  lang: string,
  parameters: CodeReviewParameter[]
): ChatCompletionRequestMessage => ({
  role: ChatCompletionRequestMessageRoleEnum.System,
  content: `You are an expert in developing applications using ${lang} code. You 
  carefully explain code with great detail and accuracy. Read the code which 
  is provided by the user and review the code based on the following 
  parameters: ${parameters.join(
    ', '
  )}. For each issue found, add to a numbered list. Print out the line, 
  or the relevant code block showing the issue, and then show the 
  fixed result. The code blocks are inside markdown formatting 
  Share best practices for writing clean and efficient ${lang} code.`,
});
