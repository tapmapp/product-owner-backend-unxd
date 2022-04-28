import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() wss: Server;

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: Server): void {
    this.logger.log('Socket initialized!');
  }

  handleConnection(client: Socket): void {
    console.log(client.handshake.headers);
    this.logger.log('Client connected!', client.id);
  }

  handleDisconnect(client: Socket): void {
    this.logger.log('Client disconnected!', client.id);
  }

}
