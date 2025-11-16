'use server';
/**
 * @fileOverview AI-powered pizza recommendation flow.
 *
 * - getPersonalizedPizzaRecommendations - A function that returns personalized pizza recommendations.
 * - PersonalizedPizzaRecommendationsInput - The input type for the getPersonalizedPizzaRecommendations function.
 * - PersonalizedPizzaRecommendationsOutput - The return type for the getPersonalizedPizzaRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedPizzaRecommendationsInputSchema = z.object({
  orderHistory: z.array(z.string()).describe('List of past pizza orders.'),
  currentTrends: z.array(z.string()).describe('List of current trending pizza items.'),
});
export type PersonalizedPizzaRecommendationsInput = z.infer<
  typeof PersonalizedPizzaRecommendationsInputSchema
>;

const PersonalizedPizzaRecommendationsOutputSchema = z.object({
  recommendations: z
    .array(z.string())
    .describe('A list of personalized pizza recommendations.'),
});
export type PersonalizedPizzaRecommendationsOutput = z.infer<
  typeof PersonalizedPizzaRecommendationsOutputSchema
>;

export async function getPersonalizedPizzaRecommendations(
  input: PersonalizedPizzaRecommendationsInput
): Promise<PersonalizedPizzaRecommendationsOutput> {
  return personalizedPizzaRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedPizzaRecommendationsPrompt',
  input: {schema: PersonalizedPizzaRecommendationsInputSchema},
  output: {schema: PersonalizedPizzaRecommendationsOutputSchema},
  prompt: `You are a pizza expert. You will generate personalized pizza recommendations for the user based on their order history and current trending items.

Order History: {{orderHistory}}
Current Trends: {{currentTrends}}

Based on this information, provide a list of pizza recommendations that the user might enjoy.`,
});

const personalizedPizzaRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedPizzaRecommendationsFlow',
    inputSchema: PersonalizedPizzaRecommendationsInputSchema,
    outputSchema: PersonalizedPizzaRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
