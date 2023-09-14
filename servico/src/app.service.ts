import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isAlive(): any {
    return { alive: true };
  }
}
