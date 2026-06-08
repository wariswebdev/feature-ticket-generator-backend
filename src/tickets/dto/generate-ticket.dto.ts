import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GenerateTicketDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10, { message: 'Please provide a more detailed feature idea (minimum 10 characters).' })
  prompt: string;
}