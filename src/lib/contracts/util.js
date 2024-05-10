import { PUBLIC_SOROBAN_RPC_URL, PUBLIC_SOROBAN_NETWORK_PASSPHRASE } from '$env/static/public'

export const rpcUrl = PUBLIC_SOROBAN_RPC_URL ?? 'http://localhost:8000/rpc'
export const networkPassphrase =
    PUBLIC_SOROBAN_NETWORK_PASSPHRASE ?? 'Test SDF Network ; September 2015'
