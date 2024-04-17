import { Injectable } from '@nestjs/common';
import { DatabaseHandler, IDatabaseHandler } from 'db/DatabaseHandler';

@Injectable()
export class DatabaseService
  extends DatabaseHandler
  implements IDatabaseHandler {}
