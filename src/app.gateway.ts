import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  private logger: Logger = new Logger('AppGateway');

  afterInit(server: any): void {
    this.logger.log('Socket initialized!');
  }

  handleConnection(): void {
    this.logger.log('Socket connection detected!');
  }

  handleDisconnect(): void {
    this.logger.log('Socket disconnected!');
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: any, payload: any): WsResponse<string> {
    return { event: 'msgToClient', data: 'Hello world!' };
  }
}
