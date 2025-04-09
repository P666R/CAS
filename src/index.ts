import { Server } from '@/server';

class ContentApprovalApplication {
  constructor(private readonly server: Server) {}

  public run() {
    this.server.start();
  }
}

new ContentApprovalApplication(new Server()).run();
