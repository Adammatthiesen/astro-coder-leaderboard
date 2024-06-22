// LEVEL_FACTOR is a constant that determines how much XP is needed to level up. This value is from Code::Stats
const LEVEL_FACTOR: number = 0.025;

// Get level for given XP
export function getLevel(totalXP: number): number {
  return Math.floor(LEVEL_FACTOR * Math.sqrt(totalXP));
}