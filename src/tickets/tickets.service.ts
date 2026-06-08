import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { generateObject } from 'ai';
import { google } from '@ai-sdk/google';
import { FeatureTicketSchema, FeatureTicket } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {
  async generateTicketsFromPrompt(rawPrompt: string): Promise<FeatureTicket> {
    try {
      const { object } = await generateObject({
        model: google('gemini-2.5-flash'),
        schema: FeatureTicketSchema,
        system: `You are an expert technical product manager and systems architect. 
                 Your task is to thoroughly analyze raw feature requests, break them down into 
                 logical database-ready engineering sub-tasks, assign precise story points using a 
                 strict Fibonacci sequence, and write technical step-by-step descriptions for developers.`,
        prompt: rawPrompt,
      });

      return object;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to communicate with Gemini API: ${error.message}`,
      );
    }
  }
}