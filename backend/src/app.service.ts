import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
