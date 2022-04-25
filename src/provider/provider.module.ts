import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// SERVICES
import { ProviderService } from './provider.service';

@Module({
    providers: [ProviderService],
    imports: [ConfigModule],
    exports: [ProviderService]
})
export class ProviderModule { }
