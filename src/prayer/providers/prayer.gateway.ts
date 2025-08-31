import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class PrayerGateway {
  @WebSocketServer()
  server: Server;

  notifyPrayerTime(message: string) {
    this.server.emit('prayer-time', { message });
  }
}
