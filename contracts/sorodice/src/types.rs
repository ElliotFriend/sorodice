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
    NotInitialized = 1,
    AlreadyInitialized = 2,
    TooManyDice = 3,
    TooManySides = 4,
    InvalidSpeedDial = 5,
    DieNotRolledYet = 6,
    NoDiceRolledYet = 7,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct RollResult {
    pub total: u32,
    pub rolls: Vec<u32>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub struct DieStatistics {
    pub num_faces: u32,
    pub total_rolls: u32,
    pub total_value: u32,
    pub rolled_freq: Map<u32, u32>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DiceStatistics {
    StatsForD(u32),
}
