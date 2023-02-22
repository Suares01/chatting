import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashService } from '../hash-service';

@Injectable()
export class BcryptService implements HashService {
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }

  compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
