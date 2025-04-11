import { Server } from '@/server';
import { Logger } from '@/global/logging/logger';
import { ConnectDB } from './global/config/db/db.config';

class ContentApprovalApplication {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'ContentApprovalApplication',
  });
  constructor(
    private readonly server: Server,
    private readonly connectDB: ConnectDB,
  ) {}

  public async run() {
    try {
      await this.connectDB.connect();
      this.server.start();
    } catch (error: unknown) {
      this.logger.error({ error }, 'Failed to start application');
      process.exit(1);
    }
  }
}

void new ContentApprovalApplication(new Server(), new ConnectDB()).run();
