import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

// CONFIG
import { Chain } from '../config';

@Injectable()
export class ProviderService {
  private providers: { [key: string]: ethers.providers.JsonRpcProvider }[] = [];

  constructor(private configService: ConfigService) {
    this.createProvider(Chain.RPT);
  }

  private createProvider(chainId: number): void {
    this.providers[chainId.toString()] = new ethers.providers.JsonRpcProvider(
      this.configService.get<string>(`_${chainId}_PROVIDER_URL`),
    );
  }

  public getProvider(chainId: number): ethers.providers.JsonRpcProvider {
    return this.providers[chainId.toString()];
  }

}
