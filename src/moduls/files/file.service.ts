import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { logger } from '../logger/logger';

@Injectable()
export class FileService {
  async getAvatar(res, fileName) {
    //проверить, есть ли у этого пользоватля такой аватора
    res.set('Content-Type', 'image/png');
    try {
      await res.sendFile(path.join(__dirname, '../../../uploads/avatars', `${fileName}`));
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[FileService_findAvatar]', e.message);
    }
    // ужадить старый аватар
  }


  async findBookPhoto(res, fileName) {
    res.set('Content-Type', 'image/png');
    try {
      await res.sendFile(path.join(__dirname, '../../../uploads/books', `${fileName}`));
    } catch (e) {
      logger.error(e);
      throw new BadRequestException('[FileService_findAvatar]', e.message);
    }
  }

  async findPostPhoto(res, fileName) {
    try {
      res.set('Content-Type', 'image/png');
      await res.sendFile(path.join(__dirname, '../../../uploads/posts', `${fileName}`));
    } catch (e) {
      logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}