"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Errors = exports.networks = void 0;
const stellar_sdk_1 = require("@stellar/stellar-sdk");
const buffer_1 = require("buffer");
const index_js_1 = require("@stellar/stellar-sdk/lib/contract_client/index.js");
__exportStar(require("@stellar/stellar-sdk"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/contract_client/index.js"), exports);
__exportStar(require("@stellar/stellar-sdk/lib/rust_types/index.js"), exports);
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || buffer_1.Buffer;
}
exports.networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CCNWZLAOERFUX7UR2DUOBFAR3NLJ5WWJAWBGDBDDNTYSAKI5JF7BVVET",
    }
};
exports.Errors = {
    1: { message: "" },
    2: { message: "" },
    3: { message: "" },
    4: { message: "" },
    5: { message: "" },
    6: { message: "" },
    7: { message: "" }
};
class Client extends index_js_1.ContractClient {
    options;
    constructor(options) {
        super(new stellar_sdk_1.ContractSpec(["AAAAAAAAAAAAAAAKaW5pdGlhbGl6ZQAAAAAAAQAAAAAAAAAFYWRtaW4AAAAAAAATAAAAAQAAA+kAAAPtAAAAAAAAAAM=",
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
            "AAAAAgAAAAAAAAAAAAAADkRpY2VTdGF0aXN0aWNzAAAAAAABAAAAAQAAAAAAAAAJU3RhdHNGb3JEAAAAAAAAAQAAAAQ="]), options);
        this.options = options;
    }
    fromJSON = {
        initialize: (this.txFromJSON),
        upgrade: (this.txFromJSON),
        roll: (this.txFromJSON),
        get_global_stats: (this.txFromJSON),
        get_die_stats: (this.txFromJSON),
        get_dice_stats: (this.txFromJSON),
        get_all_stats: (this.txFromJSON)
    };
}
exports.Client = Client;
