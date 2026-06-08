import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 Import ConfigModule
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketsModule } from './tickets/tickets.module';
import { TicketEntity } from './tickets/entities/ticket.entity';

const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'database.sqlite',
  entities: [TicketEntity],
  synchronize: true,
};

@Module({
  imports: [
    // 👈 Load and inject .env variables globally across the system
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TicketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}