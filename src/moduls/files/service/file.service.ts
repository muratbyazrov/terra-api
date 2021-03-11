import { BadRequestException, Injectable } from '@nestjs/common';
import * as path from 'path';
import { logger } from '../../logger/logger';

@Injectable()
export class FileService {
  async getAvatar(res, fileName) {
    //проверить, есть ли у этого пользоватля такой аватора
    res.set('Content-Type', 'image/png');
    await res.sendFile(path.join(__dirname, '../../../../uploads/avatars', `${fileName}`));
    // ужадить старый аватар
  }


  async getBookPhoto(res, fileName) {
    res.set('Content-Type', 'image/png');
    await res.sendFile(path.join(__dirname, '../../../../uploads/books', `${fileName}`));
  }

  async findPostPhoto(res, fileName) {
    try {
      res.set('Content-Type', 'image/png');
      await res.sendFile(path.join(__dirname, '../../../../uploads/posts', `${fileName}`));
    } catch (err) {
      logger.error(err);
      throw new BadRequestException(err.message);
    }

  }
}