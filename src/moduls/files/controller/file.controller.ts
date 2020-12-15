import { Controller, Get, Param, Res } from '@nestjs/common';

import { FileService } from '../service/file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @Get('avatar/:fileName')
  getAvatar(@Res() res, @Param('fileName') fileName) {
    return this.fileService.getAvatar(res, fileName);
  }

}