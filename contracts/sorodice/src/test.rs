#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Env};

extern crate std;

#[test]
fn test_1d20_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let dice_roll_result = client.roll(&1, &20);
    assert!(dice_roll_result.into_iter().all(|x| x <= 20));
}

#[test]
fn test_2d20_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let dice_roll_result = client.roll(&2, &20);
    assert!(dice_roll_result.into_iter().all(|x| x <= 20));
}

#[test]
fn test_50d6_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let dice_roll_result = client.roll(&50, &6);
    assert!(dice_roll_result.into_iter().all(|x| x <= 6));
}

#[test]
fn test_1d20_and_1d6_roll() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    let mut d20_result = client.roll(&1, &20);
    assert!(d20_result.into_iter().all(|x| x <= 20));

    let d6_result = client.roll(&1, &6);
    assert!(d6_result.into_iter().all(|x| x <= 6));

    d20_result = client.roll(&1, &20);
    assert!(d20_result.into_iter().all(|x| x <= 20));
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")]
fn test_get_global_stats_uninitialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    client.get_global_stats();
}

#[test]
fn test_get_global_stats_initialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // collect global stats, make sure everything is zero/empty/whatever
    let global_stats = client.get_global_stats();
    assert_eq!(global_stats.total_dice_rolled, 0);
    assert_eq!(global_stats.total_value_rolled, 0);
    assert_eq!(global_stats.which_dice_rolled.len(), 0);
}

#[test]
fn test_get_global_stats_with_rolls() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);
    client.roll(&1, &20);
    client.roll(&2, &6);
    client.roll(&3, &10);

    // collect global stats, make sure everything is zero/empty/whatever
    let global_stats = client.get_global_stats();
    assert_eq!(global_stats.total_dice_rolled, 6);
    assert!(global_stats.total_value_rolled < 63);
    assert_eq!(global_stats.which_dice_rolled.len(), 3);
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")]
fn test_get_die_stats_uninitialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    client.get_die_stats(&6);
}

#[test]
#[should_panic(expected = "Error(Contract, #6)")]
fn test_get_die_stats_with_no_rolls() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // try to get die stats for a die that was never rolled
    client.get_die_stats(&6);
}

#[test]
fn test_get_die_stats_with_rolls() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // roll a few d20s, and check the stats
    client.roll(&4, &20);
    let die_stats = client.get_die_stats(&20);
    let total_rolls: u32 = die_stats.clone().rolled_freq.into_iter().map(|x| x.1).sum();
    let total_value: u32 = die_stats
        .clone()
        .rolled_freq
        .into_iter()
        .map(|x| x.0 * x.1)
        .sum();
    assert_eq!(total_rolls, 4);
    assert!(die_stats
        .clone()
        .rolled_freq
        .into_iter()
        .all(|x| x.0 <= die_stats.num_faces));
    assert!(total_value < die_stats.num_faces * total_rolls);
    assert!(die_stats.rolled_freq.len() <= 4);
}

#[test]
#[should_panic(expected = "Error(Contract, #6)")]
fn test_get_die_stats_with_wrong_faces() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // roll a few d20s, and check the stats
    client.roll(&4, &20);
    client.get_die_stats(&6);
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")]
fn test_get_dice_stats_uninitialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    client.get_dice_stats(&vec![&env, 20, 6]);
}

#[test]
#[should_panic(expected = "Error(Contract, #6)")]
fn test_get_dice_stats_with_no_rolls() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // try to get die stats for dice that were never rolled
    client.get_dice_stats(&vec![&env, 20, 6]);
}

#[test]
fn test_get_dice_stats_with_rolls() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // roll a few d6s and d20s, and check the stats
    client.roll(&4, &20);
    client.roll(&5, &6);
    let dice_to_get_stats = [6u32, 20u32];
    let dice_stats = client.get_dice_stats(&Vec::from_array(&env, dice_to_get_stats));
    assert_eq!(dice_stats.len(), 2);
    for die_stat in dice_stats.iter() {
        assert!(dice_to_get_stats.contains(&die_stat.num_faces));
        let total_rolls: u32 = die_stat.clone().rolled_freq.into_iter().map(|x| x.1).sum();
        let total_value: u32 = die_stat.rolled_freq.into_iter().map(|x| x.0 * x.1).sum();
        assert!(total_value <= die_stat.num_faces * total_rolls);
    }
}

#[test]
#[should_panic(expected = "Error(Contract, #6)")]
fn test_get_dice_stats_with_wrong_faces() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    // roll a few d6s and d20s, and check the stats
    client.roll(&4, &20);
    client.roll(&5, &6);
    client.get_dice_stats(&vec![&env, 4, 10]);
}

#[test]
#[should_panic(expected = "Error(Contract, #1)")]
fn test_get_all_stats_uninitialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);

    client.get_all_stats();
}

#[test]
fn test_get_all_stats_initialized() {
    let env = Env::default();
    let contract_id = env.register_contract(None, SorodiceContract);
    let client = SorodiceContractClient::new(&env, &contract_id);
    env.mock_all_auths();

    // initialize the contract
    let admin = Address::generate(&env);
    client.initialize(&admin);

    client.roll(&1, &20);
    client.roll(&2, &6);
    client.roll(&3, &10);

    // collect global stats, make sure everything is zero/empty/whatever
    let all_stats = client.get_all_stats();
    assert_eq!(all_stats.len(), 3);
    for die_stat in all_stats.iter() {
        let total_rolls: u32 = die_stat.clone().rolled_freq.into_iter().map(|x| x.1).sum();
        let total_value: u32 = die_stat.rolled_freq.into_iter().map(|x| x.0 * x.1).sum();
        assert!(total_value <= die_stat.num_faces * total_rolls);
    }
}
