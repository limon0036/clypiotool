'use server';
/**
 * @fileOverview A Genkit flow for processing text using AI, offering options like summarization, rephrasing, or expansion.
 *
 * - processTextWithAI - A function that handles the text processing process.
 * - ProcessTextWithAIInput - The input type for the processTextWithAI function.
 * - ProcessTextWithAIOutput - The return type for the processTextWithAI function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProcessTextWithAIInputSchema = z.object({
  text: z.string().describe('The block of text to be processed.'),
  action: z
    .enum(['summarize', 'rephrase', 'expand'])
    .describe('The AI action to perform on the text.'),
});
export type ProcessTextWithAIInput = z.infer<typeof ProcessTextWithAIInputSchema>;

const ProcessTextWithAIOutputSchema = z.object({
  processedText: z.string().describe('The AI-processed text.'),
});
export type ProcessTextWithAIOutput = z.infer<typeof ProcessTextWithAIOutputSchema>;

export async function processTextWithAI(input: ProcessTextWithAIInput): Promise<ProcessTextWithAIOutput> {
  return processTextWithAIFlow(input);
}

const promptGenerator = ai.definePrompt(
  {
    name: 'processTextWithAIPrompt',
    input: {schema: ProcessTextWithAIInputSchema},
    output: {schema: ProcessTextWithAIOutputSchema},
  },
  async input => {
    let instruction = '';
    switch (input.action) {
      case 'summarize':
        instruction = 'Summarize the following text concisely and clearly.';
        break;
      case 'rephrase':
        instruction = 'Rephrase the following text to be more concise and professional.';
        break;
      case 'expand':
        instruction = 'Expand on the ideas presented in the following text, providing more detail and context.';
        break;
      default:
        instruction = 'Process the following text.';
    }

    return {
      prompt: `${instruction}\n\nText: {{{text}}}`,
    };
  }
);

const processTextWithAIFlow = ai.defineFlow(
  {
    name: 'processTextWithAIFlow',
    inputSchema: ProcessTextWithAIInputSchema,
    outputSchema: ProcessTextWithAIOutputSchema,
  },
  async input => {
    const {output} = await promptGenerator(input);
    return output!;
  }
);
