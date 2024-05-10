import { PUBLIC_SOROBAN_RPC_URL, PUBLIC_SOROBAN_NETWORK_PASSPHRASE } from '$env/static/public'

export const rpcUrl = PUBLIC_SOROBAN_RPC_URL ?? 'https://soroban-testnet.stellar.org'
export const networkPassphrase =
    PUBLIC_SOROBAN_NETWORK_PASSPHRASE ?? 'Test SDF Network ; September 2015'
