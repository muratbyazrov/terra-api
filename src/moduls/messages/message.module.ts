import { Module } from '@nestjs/common';
import { UserService } from '../users/service/user.service';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';

@Module({
  controllers: [MessageController],
  providers: [UserService, MessageService],
  exports: [],
})
export class MessageModule {
}