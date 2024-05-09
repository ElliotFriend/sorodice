use soroban_sdk::{contracterror, contracttype, Map, Vec};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    GlobalStats,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct GlobalStats {
    pub total_dice_rolled: u32, // the total number of dice which have ever been rolled
    pub total_value_rolled: u32, // to total sum of all dice which have ever been rolled
    pub which_dice_rolled: Vec<u32>, // to track which dice have ever been rolled
}

#[contracterror]
#[derive(Copy, Clone, Debug, Eq, PartialEq, PartialOrd, Ord)]
#[repr(u32)]
pub enum Error {
    NotInitialized = 1,     // Contract has not been initialized yet.
    AlreadyInitialized = 2, // Contract has already been initialized.
    TooManyDice = 3,        // Please specify 255 or fewer dice.
    TooManySides = 4,       // Please specify 255 or fewer faces for the die.
    InvalidSpeedDial = 5,   // Please specify a valid speed dial string.
    DieNotRolledYet = 6,    // The specified die has never been rolled yet.
    NoDiceRolledYet = 7,    // There have been no dice rolls yet.
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DieStatistics {
    pub num_faces: u32,
    pub rolled_freq: Map<u32, u32>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DiceStatistics {
    StatsForD(u32),
}
