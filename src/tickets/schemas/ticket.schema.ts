import { z } from 'zod';

export const FeatureTicketSchema = z.object({
  featureName: z.string().describe('The high-level unified name of the feature idea.'),
  summary: z.string().describe('A brief architectural and technical overview of the implementation plan.'),
  tasks: z.array(
    z.object({
      title: z.string().describe('Clear, actionable task title (e.g., "Design JWT payload structure").'),
      technicalDescription: z.string().describe('Step-by-step developer implementation blueprint.'),
      estimatedPoints: z.number().int().describe('Story points matching a strict Fibonacci sequence (1, 2, 3, 5, 8, 13).'),
      priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('Urgency level based on deployment hierarchy.')
    })
  ).describe('An ordered array of core sub-tasks required to fully ship the feature.')
});

export type FeatureTicket = z.infer<typeof FeatureTicketSchema>;