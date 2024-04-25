use soroban_sdk::{contracterror, contracttype, Map, Vec};

#[contracttype]
#[derive(Clone)]
pub enum DataKey {
    Admin,
    TotalDiceThrown,
    TotalValueRolled,
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
    GenericError = 6,
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
    pub total_rolls: u32,
    pub rolled_freq: Map<u32, u32>,
}

#[contracttype]
#[derive(Clone, Debug, Eq, PartialEq)]
pub enum DiceStatistics {
    StatsForD(u32),
}
