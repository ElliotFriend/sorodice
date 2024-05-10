import { Buffer } from "buffer";
import { AssembledTransaction, ContractClient, ContractClientOptions } from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type { u32 } from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk';
export * from '@stellar/stellar-sdk/lib/contract_client/index.js';
export * from '@stellar/stellar-sdk/lib/rust_types/index.js';
export declare const networks: {
    readonly testnet: {
        readonly networkPassphrase: "Test SDF Network ; September 2015";
        readonly contractId: "CCNWZLAOERFUX7UR2DUOBFAR3NLJ5WWJAWBGDBDDNTYSAKI5JF7BVVET";
    };
};
export type DataKey = {
    tag: "Admin";
    values: void;
} | {
    tag: "GlobalStats";
    values: void;
};
export interface GlobalStats {
    total_dice_rolled: u32;
    total_value_rolled: u32;
    which_dice_rolled: Array<u32>;
}
export declare const Errors: {
    1: {
        message: string;
    };
    2: {
        message: string;
    };
    3: {
        message: string;
    };
    4: {
        message: string;
    };
    5: {
        message: string;
    };
    6: {
        message: string;
    };
    7: {
        message: string;
    };
};
export interface DieStatistics {
    num_faces: u32;
    rolled_freq: Map<u32, u32>;
}
export type DiceStatistics = {
    tag: "StatsForD";
    values: readonly [u32];
};
export interface Client {
    /**
     * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    initialize: ({ admin }: {
        admin: string;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<void>>>;
    /**
     * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    upgrade: ({ new_wasm_hash }: {
        new_wasm_hash: Buffer;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<void>>>;
    /**
     * Construct and simulate a roll transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.   *
     * Roll a specified number of duplicate dice, each with the same specified
     * number of faces.
     *
     * # Arguments
     *
     * * `num_dice` - The number of dice to roll. Must be no larger than 255.
     * * `num_faces` - The number of faces on each die. Must be no larger than
     * 255.
     *
     * # Panics
     *
     * If either argument is larger than 255.
     *
     * # Events
     *
     * Emits an event with topics `["roll", roller: Address, num_dice: u32, num_faces: u32],
     * data = [rolls: Vec<u32>]`
     */
    roll: ({ roller, num_dice, num_faces }: {
        roller: string;
        num_dice: u32;
        num_faces: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<Array<u32>>>>;
    /**
     * Construct and simulate a get_global_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_global_stats: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<GlobalStats>>>;
    /**
     * Construct and simulate a get_die_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_die_stats: ({ num_faces }: {
        num_faces: u32;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<DieStatistics>>>;
    /**
     * Construct and simulate a get_dice_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_dice_stats: ({ dice }: {
        dice: Array<u32>;
    }, options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<Array<DieStatistics>>>>;
    /**
     * Construct and simulate a get_all_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
     */
    get_all_stats: (options?: {
        /**
         * The fee to pay for the transaction. Default: BASE_FEE
         */
        fee?: number;
        /**
         * The maximum amount of time to wait for the transaction to complete. Default: DEFAULT_TIMEOUT
         */
        timeoutInSeconds?: number;
        /**
         * Whether to automatically simulate the transaction when constructing the AssembledTransaction. Default: true
         */
        simulate?: boolean;
    }) => Promise<AssembledTransaction<Result<Array<DieStatistics>>>>;
}
export declare class Client extends ContractClient {
    readonly options: ContractClientOptions;
    constructor(options: ContractClientOptions);
    readonly fromJSON: {
        initialize: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        upgrade: (json: string) => AssembledTransaction<Result<void, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        roll: (json: string) => AssembledTransaction<Result<number[], import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        get_global_stats: (json: string) => AssembledTransaction<Result<GlobalStats, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        get_die_stats: (json: string) => AssembledTransaction<Result<DieStatistics, import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        get_dice_stats: (json: string) => AssembledTransaction<Result<DieStatistics[], import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
        get_all_stats: (json: string) => AssembledTransaction<Result<DieStatistics[], import("@stellar/stellar-sdk/lib/rust_types/result").ErrorMessage>>;
    };
}
