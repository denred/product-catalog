import { Controller, Post, Req, BadRequestException, UseGuards, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';

import { FastifyRequest } from 'fastify';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UploadService } from './services/upload.service';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  private readonly logger = new Logger(UploadController.name);

  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload product image' })
  @ApiConsumes('multipart/form-data')
  async uploadImage(@Req() request: FastifyRequest) {
    try {
      const data = await request.file();

      if (!data) {
        throw new BadRequestException('No file uploaded');
      }

      const buffer = await data.toBuffer();

      const file = {
        fieldname: data.fieldname,
        originalname: data.filename,
        encoding: data.encoding,
        mimetype: data.mimetype,
        size: buffer.length,
        buffer: buffer,
      };

      const url = await this.uploadService.uploadFile(file);

      return {
        success: true,
        url,
        message: 'File uploaded successfully',
      };
    } catch (error) {
      this.logger.error('Upload error:', error);

      if (error instanceof BadRequestException) {
        throw error;
      }

      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(`Upload failed: ${errorMessage}`);
      throw new BadRequestException(`Failed to process file upload: ${errorMessage}`);
    }
  }
}
