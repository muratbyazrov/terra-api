import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from '../users/entity/user.entity';
import { UserModule } from '../users/user.module';
import { AccessTokenEntity } from '../users/entity/access.token.entity';

@Module({
  imports: [
    UserModule,
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
          entities: [UserEntity, AccessTokenEntity],
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
