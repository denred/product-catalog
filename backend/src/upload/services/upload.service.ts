import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

import { UPLOAD_CONFIG } from '../constants/upload.constants';
import { AwsConfigKeys } from '../enums/aws-config-keys';

interface UploadFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.bucketName = this.configService.get<string>(AwsConfigKeys.S3_BUCKET_NAME) || '';

    const region = this.configService.get<string>(AwsConfigKeys.REGION) || '';
    const accessKeyId = this.configService.get<string>(AwsConfigKeys.ACCESS_KEY_ID) || '';
    const secretAccessKey = this.configService.get<string>(AwsConfigKeys.SECRET_ACCESS_KEY) || '';

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadFile(file: UploadFile): Promise<string> {
    if (!file) {
      throw new BadRequestException(UPLOAD_CONFIG.ERROR_MESSAGES.NO_FILE);
    }

    if (
      !UPLOAD_CONFIG.ALLOWED_MIME_TYPES.includes(
        file.mimetype as (typeof UPLOAD_CONFIG.ALLOWED_MIME_TYPES)[number],
      )
    ) {
      throw new BadRequestException(UPLOAD_CONFIG.ERROR_MESSAGES.INVALID_TYPE);
    }

    if (file.size > UPLOAD_CONFIG.MAX_FILE_SIZE) {
      throw new BadRequestException(UPLOAD_CONFIG.ERROR_MESSAGES.FILE_TOO_LARGE);
    }

    const fileExtension =
      file.originalname.split('.').pop() || UPLOAD_CONFIG.DEFAULT_FILE_EXTENSION;
    const fileName = `${UPLOAD_CONFIG.UPLOAD_FOLDER}/${uuidv4()}.${fileExtension}`;

    if (!this.bucketName) {
      throw new BadRequestException(UPLOAD_CONFIG.ERROR_MESSAGES.S3_CONFIG_INCOMPLETE);
    }

    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
      });

      await this.s3Client.send(command);

      const region =
        this.configService.get<string>(AwsConfigKeys.REGION) || UPLOAD_CONFIG.DEFAULT_REGION;
      const url = `https://${this.bucketName}.s3.${region}.amazonaws.com/${fileName}`;

      return url;
    } catch (error) {
      this.logger.error('UploadService: Error uploading file to S3:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown S3 error';
      throw new BadRequestException(
        `${UPLOAD_CONFIG.ERROR_MESSAGES.S3_UPLOAD_FAILED}: ${errorMessage}`,
      );
    }
  }
}
