#![no_std]

use soroban_sdk::{contract, contractimpl, contractmeta, map, symbol_short, Address, BytesN, Env, Vec};
use types::*;

contractmeta!(key = "SoroDice", val = "A dnd dice dapp");

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

    /// Roll a specified number of dice, each with a specified number of faces.
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
        // Make sure that neither the number of dice nor the number of faces is
        // too large.
        if num_dice > u8::MAX.into() {
            return Err(Error::TooManyDice);
        } else if num_faces > u8::MAX.into() {
            return Err(Error::TooManySides);
        }

        // Get some statistics from storage for later use.
        let total_rolls = env.storage()
            .instance().get(&DataKey::TotalDiceThrown).unwrap_or(0);
        let total_value = env.storage()
            .instance().get(&DataKey::TotalValueRolled).unwrap_or(0);
        let mut stats_for_d = env.storage()
            .persistent().get(&DiceStatistics::StatsForD(num_faces))
            .unwrap_or(DieStatistics{
                total_rolls: 0,
                rolled_freq: map![&env],
            });

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

        // Publish a relevant event.
        env.events().publish(
            (symbol_short!("roll"), num_dice, num_faces),
            roll_result.clone(),
        );

        // Store the stats.
        env.storage().instance()
            .set(&DataKey::TotalDiceThrown, &(total_rolls + &roll_result.rolls.len()));
        env.storage().instance()
            .set(&DataKey::TotalValueRolled, &(total_value + &roll_result.total));
        stats_for_d.total_rolls += &roll_result.rolls.len();
        for k in roll_result.rolls.iter() {
            stats_for_d.rolled_freq.set(k, 1 + stats_for_d.rolled_freq.get(k).unwrap_or(0));
        }
        env.storage().persistent()
            .set(&DiceStatistics::StatsForD(num_faces), &stats_for_d);

        return Ok(roll_result);
    }
}

mod test;
mod types;
