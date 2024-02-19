import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private config: NestConfigService) {}

  get JWT_SECRET() {
    return this.config.getOrThrow<string>('JWT_SECRET');
  }
  get DB_HOST() {
    return this.config.getOrThrow<string>('DB_HOST');
  }
  get DB_PORT() {
    return this.config.getOrThrow<number>('DB_PORT');
  }
  get DB_USER() {
    return this.config.getOrThrow<string>('DB_USER');
  }
  get DB_PASSWORD() {
    return this.config.getOrThrow<string>('DB_PASSWORD');
  }
  get DB_DATABASE() {
    return this.config.getOrThrow<string>('DB_DATABASE');
  }
}
