import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from '../users/entity/user.entity';
import { UserModule } from '../users/user.module';
import { AccessTokenEntity } from '../users/entity/access.token.entity';
import { FilesModule } from '../files/files.module';
import { BookEntity } from '../bookinist/book.entity';
import { BookModule } from '../bookinist/book.module';
import { MessageModule } from '../messenger/message.module';
import { MessageEntity } from '../messenger/message.entity';

@Module({
  imports: [
    UserModule,
    FilesModule,
    BookModule,
    MessageModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          autoLoadEntities: true,
          username: 'postgres',
          password: 'byazrov127214315',
          database: 'terraDB',
          entities: [UserEntity, AccessTokenEntity, BookEntity, MessageEntity],
          synchronize: true,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
