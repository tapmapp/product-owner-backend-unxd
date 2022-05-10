import { Injectable } from '@nestjs/common';
import { TransactionReceipt } from 'web3-core';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { OwnerRepository } from './owner.repository';

// NFT
// import { mintItem } from '../utils/deploy-nft';

@Injectable()
export class OwnerService {

    constructor(private ownerRepository: OwnerRepository) { }

    async addOwner(brandId: string, productReference: string, productIdentifier: string, transactionHash: string): Promise<Owner> {
        return await this.ownerRepository.addOwner(brandId, productReference, productIdentifier, transactionHash);
    }
}
