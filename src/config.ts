export enum Chain {
    RPT = 3,
};

export interface SupportedChain {
    chainId: number;
    chain: Chain;
    title: string;
}

export const supportedChains: SupportedChain[] = [
    {
        chainId: 3,
        chain: Chain.RPT,
        title: 'Ropstein',
    },
];
