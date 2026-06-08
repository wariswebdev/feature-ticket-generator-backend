import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketsService } from './tickets.service';
import { GenerateTicketDto } from './dto/generate-ticket.dto';
import { TicketEntity } from './entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(
    private readonly ticketsService: TicketsService,
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  @Post('generate')
  @HttpCode(HttpStatus.OK)
  async generateAndFlushToDatabase(@Body() dto: GenerateTicketDto) {
    // 1. Ask Gemini to compile structural ticket blueprints
    const generatedData = await this.ticketsService.generateTicketsFromPrompt(dto.prompt);

    // 2. Loop through and batch save the records straight into your SQL DB
    const savedTickets: TicketEntity[] = [];
    for (const task of generatedData.tasks) {
      const newTicket = this.ticketRepository.create({
        featureGroupName: generatedData.featureName,
        featureSummary: generatedData.summary,
        title: task.title,
        technicalDescription: task.technicalDescription,
        estimatedPoints: task.estimatedPoints,
        priority: task.priority,
      });
      const saved = await this.ticketRepository.save(newTicket);
      savedTickets.push(saved);
    }

    // 3. Return clean confirmation state back to the UI
    return {
      success: true,
      feature: generatedData.featureName,
      summary: generatedData.summary,
      insertedTicketsCount: savedTickets.length,
      tickets: savedTickets,
    };
  }
}