import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtGuard } from '../../guards/jwt.guard';
import { MessageEntity } from './message.entity';
import { UpdateResult } from 'typeorm';
import { CreateMessageDto } from './create.message.dto';
import { UpdateMessageDto } from './update.message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {
  }

  @Get()
  @UseGuards(JwtGuard)
  async find(): Promise<MessageEntity[]> {
    return this.messageService.find();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  async findOne(@Param('id') id: number): Promise<MessageEntity> {
    return this.messageService.findOne(id);
  }

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateMessageDto): Promise<MessageEntity> {
    return this.messageService.create(MessageEntity.create(body));
  }

  @Put('id')
  @UseGuards(JwtGuard)
  async update(@Param('id') id: number, @Body() body: UpdateMessageDto): Promise<UpdateResult> {
    return this.messageService.update(id, body);
  }

  @Delete('id')
  @UseGuards(JwtGuard)
  async delete(@Param('id') id: number): Promise<UpdateResult> {
    return this.messageService.delete(id);
  }

}