import { ContractSpec, Address } from '@stellar/stellar-sdk';
import { Buffer } from "buffer";
import {
  AssembledTransaction,
  ContractClient,
  ContractClientOptions,
} from '@stellar/stellar-sdk/lib/contract_client/index.js';
import type {
  u32,
  i32,
  u64,
  i64,
  u128,
  i128,
  u256,
  i256,
  Option,
  Typepoint,
  Duration,
} from '@stellar/stellar-sdk/lib/contract_client';
import { Result } from '@stellar/stellar-sdk/lib/rust_types/index.js';
export * from '@stellar/stellar-sdk'
export * from '@stellar/stellar-sdk/lib/contract_client/index.js'
export * from '@stellar/stellar-sdk/lib/rust_types/index.js'

if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}


export const networks = {
  testnet: {
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: "CCNWZLAOERFUX7UR2DUOBFAR3NLJ5WWJAWBGDBDDNTYSAKI5JF7BVVET",
  }
} as const

export type DataKey = {tag: "Admin", values: void} | {tag: "GlobalStats", values: void};


export interface GlobalStats {
  total_dice_rolled: u32;
  total_value_rolled: u32;
  which_dice_rolled: Array<u32>;
}

export const Errors = {
  1: {message:""},
  2: {message:""},
  3: {message:""},
  4: {message:""},
  5: {message:""},
  6: {message:""},
  7: {message:""}
}

export interface DieStatistics {
  num_faces: u32;
  rolled_freq: Map<u32, u32>;
}

export type DiceStatistics = {tag: "StatsForD", values: readonly [u32]};


export interface Client {
  /**
   * Construct and simulate a initialize transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  initialize: ({admin}: {admin: string}, options?: {
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
  }) => Promise<AssembledTransaction<Result<void>>>

  /**
   * Construct and simulate a upgrade transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  upgrade: ({new_wasm_hash}: {new_wasm_hash: Buffer}, options?: {
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
  }) => Promise<AssembledTransaction<Result<void>>>

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
  roll: ({roller, num_dice, num_faces}: {roller: string, num_dice: u32, num_faces: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<u32>>>>

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
  }) => Promise<AssembledTransaction<Result<GlobalStats>>>

  /**
   * Construct and simulate a get_die_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_die_stats: ({num_faces}: {num_faces: u32}, options?: {
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
  }) => Promise<AssembledTransaction<Result<DieStatistics>>>

  /**
   * Construct and simulate a get_dice_stats transaction. Returns an `AssembledTransaction` object which will have a `result` field containing the result of the simulation. If this transaction changes contract state, you will need to call `signAndSend()` on the returned object.
   */
  get_dice_stats: ({dice}: {dice: Array<u32>}, options?: {
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
  }) => Promise<AssembledTransaction<Result<Array<DieStatistics>>>>

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
  }) => Promise<AssembledTransaction<Result<Array<DieStatistics>>>>

}
export class Client extends ContractClient {
  constructor(public readonly options: ContractClientOptions) {
    super(
      new ContractSpec([ "AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
        "AAAAAAAAAAAAAAAHdXBncmFkZQAAAAABAAAAAAAAAA1uZXdfd2FzbV9oYXNoAAAAAAAD7gAAACAAAAABAAAD6QAAA+0AAAAAAAAAAw==",
        "AAAAAAAAAadSb2xsIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkdXBsaWNhdGUgZGljZSwgZWFjaCB3aXRoIHRoZSBzYW1lIHNwZWNpZmllZApudW1iZXIgb2YgZmFjZXMuCgojIEFyZ3VtZW50cwoKKiBgbnVtX2RpY2VgIC0gVGhlIG51bWJlciBvZiBkaWNlIHRvIHJvbGwuIE11c3QgYmUgbm8gbGFyZ2VyIHRoYW4gMjU1LgoqIGBudW1fZmFjZXNgIC0gVGhlIG51bWJlciBvZiBmYWNlcyBvbiBlYWNoIGRpZS4gTXVzdCBiZSBubyBsYXJnZXIgdGhhbgoyNTUuCgojIFBhbmljcwoKSWYgZWl0aGVyIGFyZ3VtZW50IGlzIGxhcmdlciB0aGFuIDI1NS4KCiMgRXZlbnRzCgpFbWl0cyBhbiBldmVudCB3aXRoIHRvcGljcyBgWyJyb2xsIiwgcm9sbGVyOiBBZGRyZXNzLCBudW1fZGljZTogdTMyLCBudW1fZmFjZXM6IHUzMl0sCmRhdGEgPSBbcm9sbHM6IFZlYzx1MzI+XWAAAAAABHJvbGwAAAADAAAAAAAAAAZyb2xsZXIAAAAAABMAAAAAAAAACG51bV9kaWNlAAAABAAAAAAAAAAJbnVtX2ZhY2VzAAAAAAAABAAAAAEAAAPpAAAD6gAAAAQAAAAD",
        "AAAAAAAAAAAAAAAQZ2V0X2dsb2JhbF9zdGF0cwAAAAAAAAABAAAD6QAAB9AAAAALR2xvYmFsU3RhdHMAAAAAAw==",
        "AAAAAAAAAAAAAAANZ2V0X2RpZV9zdGF0cwAAAAAAAAEAAAAAAAAACW51bV9mYWNlcwAAAAAAAAQAAAABAAAD6QAAB9AAAAANRGllU3RhdGlzdGljcwAAAAAAAAM=",
        "AAAAAAAAAAAAAAAOZ2V0X2RpY2Vfc3RhdHMAAAAAAAEAAAAAAAAABGRpY2UAAAPqAAAABAAAAAEAAAPpAAAD6gAAB9AAAAANRGllU3RhdGlzdGljcwAAAAAAAAM=",
        "AAAAAAAAAAAAAAANZ2V0X2FsbF9zdGF0cwAAAAAAAAAAAAABAAAD6QAAA+oAAAfQAAAADURpZVN0YXRpc3RpY3MAAAAAAAAD",
        "AAAAAgAAAAAAAAAAAAAAB0RhdGFLZXkAAAAAAgAAAAAAAAAAAAAABUFkbWluAAAAAAAAAAAAAAAAAAALR2xvYmFsU3RhdHMA",
        "AAAAAQAAAAAAAAAAAAAAC0dsb2JhbFN0YXRzAAAAAAMAAAAAAAAAEXRvdGFsX2RpY2Vfcm9sbGVkAAAAAAAABAAAAAAAAAASdG90YWxfdmFsdWVfcm9sbGVkAAAAAAAEAAAAAAAAABF3aGljaF9kaWNlX3JvbGxlZAAAAAAAA+oAAAAE",
        "AAAABAAAAAAAAAAAAAAABUVycm9yAAAAAAAABwAAAAAAAAAOTm90SW5pdGlhbGl6ZWQAAAAAAAEAAAAAAAAAEkFscmVhZHlJbml0aWFsaXplZAAAAAAAAgAAAAAAAAALVG9vTWFueURpY2UAAAAAAwAAAAAAAAAMVG9vTWFueVNpZGVzAAAABAAAAAAAAAAQSW52YWxpZFNwZWVkRGlhbAAAAAUAAAAAAAAAD0RpZU5vdFJvbGxlZFlldAAAAAAGAAAAAAAAAA9Ob0RpY2VSb2xsZWRZZXQAAAAABw==",
        "AAAAAQAAAAAAAAAAAAAADURpZVN0YXRpc3RpY3MAAAAAAAACAAAAAAAAAAludW1fZmFjZXMAAAAAAAAEAAAAAAAAAAtyb2xsZWRfZnJlcQAAAAPsAAAABAAAAAQ=",
        "AAAAAgAAAAAAAAAAAAAADkRpY2VTdGF0aXN0aWNzAAAAAAABAAAAAQAAAAAAAAAJU3RhdHNGb3JEAAAAAAAAAQAAAAQ=" ]),
      options
    )
  }
  public readonly fromJSON = {
    initialize: this.txFromJSON<Result<void>>,
        upgrade: this.txFromJSON<Result<void>>,
        roll: this.txFromJSON<Result<Array<u32>>>,
        get_global_stats: this.txFromJSON<Result<GlobalStats>>,
        get_die_stats: this.txFromJSON<Result<DieStatistics>>,
        get_dice_stats: this.txFromJSON<Result<Array<DieStatistics>>>,
        get_all_stats: this.txFromJSON<Result<Array<DieStatistics>>>
  }
}