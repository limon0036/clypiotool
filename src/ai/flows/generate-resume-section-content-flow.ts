'use server';
/**
 * @fileOverview A Genkit flow for generating tailored resume section content (e.g., bullet points) based on user input.
 *
 * - generateResumeSectionContent - A function that handles the generation of resume content.
 * - GenerateResumeSectionContentInput - The input type for the generateResumeSectionContent function.
 * - GenerateResumeSectionContentOutput - The return type for the generateResumeSectionContent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateResumeSectionContentInputSchema = z.object({
  sectionType: z
    .enum(['experience', 'skills', 'summary', 'education', 'custom'])
    .describe('The type of resume section for which to generate content (e.g., experience, skills, summary).'),
  details: z
    .string()
    .describe('Raw details about experience, skills, or other relevant information for the resume section.'),
  targetJobDescription: z
    .string()
    .optional()
    .describe('Optional: A description of the target job to tailor the content towards.'),
  existingContent: z
    .string()
    .optional()
    .describe('Optional: Existing content for the section to refine or expand upon.'),
});
export type GenerateResumeSectionContentInput = z.infer<
  typeof GenerateResumeSectionContentInputSchema
>;

const GenerateResumeSectionContentOutputSchema = z.object({
  content: z
    .array(z.string())
    .describe('An array of tailored and impactful bullet points or section content for the resume.'),
});
export type GenerateResumeSectionContentOutput = z.infer<
  typeof GenerateResumeSectionContentOutputSchema
>;

export async function generateResumeSectionContent(
  input: GenerateResumeSectionContentInput
): Promise<GenerateResumeSectionContentOutput> {
  return generateResumeSectionContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateResumeSectionContentPrompt',
  input: { schema: GenerateResumeSectionContentInputSchema },
  output: { schema: GenerateResumeSectionContentOutputSchema },
  prompt: `You are an expert resume writer. Your task is to generate concise, impactful, and tailored content (bullet points) for a resume section.

The section type is: {{{sectionType}}}

Here are the raw details provided by the user:
{{{details}}}

{{#if existingContent}}
Existing content to refine or expand upon:
{{{existingContent}}}
{{/if}}

{{#if targetJobDescription}}
The content should be tailored to the following target job description:
{{{targetJobDescription}}}
{{/if}}

Generate between 3 to 7 bullet points (or a paragraph for summary sections). Focus on achievements, quantifiable results, and keywords relevant to the section type and target job.

Output format should be a JSON array of strings, where each string is a bullet point.`,
});

const generateResumeSectionContentFlow = ai.defineFlow(
  {
    name: 'generateResumeSectionContentFlow',
    inputSchema: GenerateResumeSectionContentInputSchema,
    outputSchema: GenerateResumeSectionContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
