import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwt.guard';
import { FileService } from '../service/file.service';

@Controller('file')
export class FileController {
  constructor(private fileService: FileService) {
  }

  @Get('avatar')
  @UseGuards(JwtGuard)
  getAvatar(@Res() res) {
    return this.fileService.getAvatar(res);
  }

}