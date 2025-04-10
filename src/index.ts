import { Server } from '@/server';
import { Logger } from '@/global/logging/logger';

class ContentApprovalApplication {
  private readonly logger = Logger.getInstance().createChildLogger({
    service: 'ContentApprovalApplication',
  });
  constructor(private readonly server: Server) {}

  public async run() {
    try {
      await this.server.start();
    } catch (error: unknown) {
      this.logger.error({ error }, 'Failed to start application');
      process.exit(1);
    }
  }
}

void new ContentApprovalApplication(new Server()).run();
