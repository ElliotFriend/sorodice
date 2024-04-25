#![no_std]

use soroban_sdk::{
    contract, contractimpl, contractmeta, map, panic_with_error, symbol_short, vec, Address,
    BytesN, Env, Vec,
};
use types::*;

contractmeta!(key = "SoroDice", val = "A dnd dice dapp");

fn check_if_init(env: &Env) {
    if !env.storage().instance().has(&DataKey::Admin) {
        panic_with_error!(env, Error::NotInitialized);
    }
}

fn check_if_die_stats(env: &Env, num_faces: &u32) {
    check_if_init(env);
    if !env
        .storage()
        .persistent()
        .has(&DiceStatistics::StatsForD(*num_faces))
    {
        panic_with_error!(env, Error::DieNotRolledYet);
    }
}

fn check_if_dice_stats(env: &Env, vec_faces: &Vec<u32>) {
    check_if_init(env);
    let GlobalStats {
        which_dice_rolled, ..
    } = env.storage().instance().get(&DataKey::GlobalStats).unwrap();
    for die in vec_faces.iter() {
        if !which_dice_rolled.contains(die) {
            panic_with_error!(env, Error::DieNotRolledYet);
        }
    }
}

fn get_all_dice_rolled(env: &Env) -> Vec<u32> {
    check_if_init(env);
    let GlobalStats {
        which_dice_rolled, ..
    } = env.storage().instance().get(&DataKey::GlobalStats).unwrap();
    if which_dice_rolled.len() < 1 {
        panic_with_error!(env, Error::NoDiceRolledYet);
    }

    return which_dice_rolled;
}

#[contract]
pub struct SorodiceContract;

#[contractimpl]
impl SorodiceContract {
    pub fn initialize(env: Env, admin: Address) -> Result<(), Error> {
        if env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::AlreadyInitialized);
        }

        admin.require_auth();
        env.storage().instance().set(&DataKey::Admin, &admin);
        env.storage().instance().set(
            &DataKey::GlobalStats,
            &GlobalStats {
                total_dice_rolled: 0,
                total_value_rolled: 0,
                which_dice_rolled: vec![&env],
            },
        );
        Ok(())
    }

    pub fn upgrade(env: Env, new_wasm_hash: BytesN<32>) -> Result<(), Error> {
        if !env.storage().instance().has(&DataKey::Admin) {
            return Err(Error::NotInitialized);
        }

        let admin: Address = env.storage().instance().get(&DataKey::Admin).unwrap();
        admin.require_auth();
        env.deployer().update_current_contract_wasm(new_wasm_hash);
        Ok(())
    }

    /// Roll a specified number of duplicate dice, each with the same specified
    /// number of faces.
    ///
    /// # Arguments
    ///
    /// * `num_dice` - The number of dice to roll. Must be no larger than 255.
    /// * `num_faces` - The number of faces on each die. Must be no larger than
    ///   255.
    ///
    /// # Panics
    ///
    /// If either argument is larger than 255.
    ///
    /// # Events
    ///
    /// Emits an event with topics `["roll", num_dice: u32, num_faces: u32],
    /// data = [roll_result: RollResult]`
    pub fn roll(env: Env, num_dice: u32, num_faces: u32) -> Result<RollResult, Error> {
        check_if_init(&env);

        // Make sure that neither the number of dice nor the number of faces is
        // too large.
        if num_dice > u8::MAX.into() {
            return Err(Error::TooManyDice);
        } else if num_faces > u8::MAX.into() {
            return Err(Error::TooManySides);
        }

        // Set up our number generator, and a vector to hold the respective
        // rolls in.
        let prng = env.prng();
        let mut rolls = Vec::new(&env);

        // Iterate through the number of dice, generating a random number within
        // the specified range, add that number to the `rolls` vector.
        for _i in 0..num_dice {
            let rolled_value: u64 = prng.gen_range(1..=num_faces.into());
            rolls.push_back(rolled_value as u32);
        }

        // Create the result struct.
        let roll_result = RollResult {
            total: rolls.clone().iter().sum(),
            rolls,
        };

        // Get some statistics from storage.
        let GlobalStats {
            total_dice_rolled,
            total_value_rolled,
            mut which_dice_rolled,
        } = env
            .storage()
            .instance()
            .get(&DataKey::GlobalStats)
            .unwrap_or(GlobalStats {
                total_dice_rolled: 0,
                total_value_rolled: 0,
                which_dice_rolled: vec![&env],
            });
        let mut stats_for_d = env
            .storage()
            .persistent()
            .get(&DiceStatistics::StatsForD(num_faces))
            .unwrap_or(DieStatistics {
                num_faces,
                total_rolls: 0,
                total_value: 0,
                rolled_freq: map![&env],
            });

        // Publish a relevant event.
        env.events().publish(
            (symbol_short!("roll"), num_dice, num_faces),
            roll_result.clone(),
        );

        // Store the stats.
        if !which_dice_rolled.contains(num_faces) {
            which_dice_rolled.push_back(num_faces);
        }
        env.storage().instance().set(
            &DataKey::GlobalStats,
            &GlobalStats {
                total_dice_rolled: total_dice_rolled + &roll_result.rolls.len(),
                total_value_rolled: total_value_rolled + &roll_result.total,
                which_dice_rolled,
            },
        );
        stats_for_d.total_rolls += &roll_result.rolls.len();
        stats_for_d.total_value += &roll_result.total;
        for k in roll_result.rolls.iter() {
            stats_for_d
                .rolled_freq
                .set(k, 1 + stats_for_d.rolled_freq.get(k).unwrap_or(0));
        }
        env.storage()
            .persistent()
            .set(&DiceStatistics::StatsForD(num_faces), &stats_for_d);

        return Ok(roll_result);
    }

    pub fn get_global_stats(env: Env) -> Result<GlobalStats, Error> {
        check_if_init(&env);

        return env.storage().instance().get(&DataKey::GlobalStats).unwrap();
    }

    pub fn get_die_stats(env: Env, num_faces: u32) -> Result<DieStatistics, Error> {
        check_if_die_stats(&env, &num_faces);

        return env
            .storage()
            .persistent()
            .get(&DiceStatistics::StatsForD(num_faces))
            .unwrap();
    }

    pub fn get_dice_stats(env: Env, dice: Vec<u32>) -> Result<Vec<DieStatistics>, Error> {
        check_if_dice_stats(&env, &dice);
        let mut return_vec = Vec::<DieStatistics>::new(&env);

        for die in dice.iter() {
            return_vec.push_back(
                env.storage()
                    .persistent()
                    .get(&DiceStatistics::StatsForD(die))
                    .unwrap(),
            );
        }

        return Ok(return_vec);
    }

    pub fn get_all_stats(env: Env) -> Result<Vec<DieStatistics>, Error> {
        let all_dice_rolled = get_all_dice_rolled(&env);
        let mut return_vec = Vec::<DieStatistics>::new(&env);
        for die in all_dice_rolled.iter() {
            return_vec.push_back(
                env.storage()
                    .persistent()
                    .get(&DiceStatistics::StatsForD(die))
                    .unwrap(),
            );
        }

        return Ok(return_vec);
    }
}

mod test;
mod types;
