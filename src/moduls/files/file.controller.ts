import { Controller, Get, Param, Res } from '@nestjs/common';

import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @Get('avatar/:fileName')
  getAvatar(@Res() res, @Param('fileName') fileName) {
    return this.fileService.getAvatar(res, fileName);
  }

  @Get('bookPhoto/:fileName')
  getBookPhoto(@Res() res, @Param('fileName') fileName) {
    return this.fileService.findBookPhoto(res, fileName);
  }

  @Get('post/:fileName')
  findPostPhoto(@Res() res, @Param('fileName') fileName) {
    return this.fileService.findPostPhoto(res, fileName);
  }
}