#![cfg(test)]

use super::*;
use soroban_sdk::{Env, String, Symbol};

extern crate std;

#[test]
fn test_1d20_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    let dice_roll_result = client.roll(&1, &20);
    assert!(dice_roll_result.total < 21);
}

#[test]
fn test_2d20_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    let dice_roll_result = client.roll(&2, &20);
    assert!(dice_roll_result.total < 41);
    for roll in dice_roll_result.rolls.iter() {
        assert!(roll < 21);
    }
}

#[test]
fn test_50d6_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    let dice_roll_result = client.roll(&50, &6);
    assert!(dice_roll_result.total < 301);
    for roll in dice_roll_result.rolls.iter() {
        assert!(roll < 7);
    }
}
