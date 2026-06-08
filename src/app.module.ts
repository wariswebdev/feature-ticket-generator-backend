import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { TicketEntity } from './tickets/entities/ticket.entity';

@Module({
  imports: [
    // Automatically creates an SQL local database file named database.sqlite
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [TicketEntity],
      synchronize: true, // Auto-build tables on change
    }),
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}