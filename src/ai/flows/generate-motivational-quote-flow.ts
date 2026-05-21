'use server';
/**
 * @fileOverview A Genkit flow for generating motivational quotes based on a provided theme.
 *
 * - generateMotivationalQuote - A function that handles the motivational quote generation process.
 * - GenerateMotivationalQuoteInput - The input type for the generateMotivationalQuote function.
 * - GenerateMotivationalQuoteOutput - The return type for the generateMotivationalQuote function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMotivationalQuoteInputSchema = z.object({
  theme: z
    .string()
    .describe(
      'The theme for the motivational quote or affirmation (e.g., "perseverance", "creativity").'
    ),
});
export type GenerateMotivationalQuoteInput = z.infer<
  typeof GenerateMotivationalQuoteInputSchema
>;

const GenerateMotivationalQuoteOutputSchema = z.object({
  quote: z.string().describe('The AI-generated motivational quote or affirmation.'),
});
export type GenerateMotivationalQuoteOutput = z.infer<
  typeof GenerateMotivationalQuoteOutputSchema
>;

export async function generateMotivationalQuote(
  input: GenerateMotivationalQuoteInput
): Promise<GenerateMotivationalQuoteOutput> {
  return generateMotivationalQuoteFlow(input);
}

const generateMotivationalQuotePrompt = ai.definePrompt({
  name: 'generateMotivationalQuotePrompt',
  input: {schema: GenerateMotivationalQuoteInputSchema},
  output: {schema: GenerateMotivationalQuoteOutputSchema},
  prompt: `You are an AI assistant specialized in creating unique and inspiring motivational quotes and affirmations.

Generate a single, concise, and powerful motivational quote or affirmation based on the following theme:
Theme: {{{theme}}}

Ensure the quote is positive, uplifting, and directly related to the provided theme.`,
});

const generateMotivationalQuoteFlow = ai.defineFlow(
  {
    name: 'generateMotivationalQuoteFlow',
    inputSchema: GenerateMotivationalQuoteInputSchema,
    outputSchema: GenerateMotivationalQuoteOutputSchema,
  },
  async input => {
    const {output} = await generateMotivationalQuotePrompt(input);
    return output!;
  }
);
