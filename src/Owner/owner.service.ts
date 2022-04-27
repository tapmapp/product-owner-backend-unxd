import { Injectable } from '@nestjs/common';
import { TransactionReceipt } from 'web3-core';

// MODELS
import { Owner } from './owner.model';

// SERVICES
import { OwnerRepository } from './owner.repository';

// NFT
import { deployNFT } from './deploy-nft';

@Injectable()
export class OwnerService {

    constructor(private ownerRepository: OwnerRepository) { }

    async mintNFT(brandId: string, productReference: string, productId: string): Promise<TransactionReceipt> {
        const transactionReceipt = await deployNFT(brandId, productReference, productId);
        console.log(transactionReceipt);
        return transactionReceipt;
    }

    async addOwner(brandId: string, productReference: string, productId: string, transactionHash: string): Promise<Owner> {
        return await this.ownerRepository.addOwner(brandId, productReference, productId, transactionHash);
    }
}
