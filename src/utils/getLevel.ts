// LEVEL_FACTOR is a constant that determines how much XP is needed to level up. This value is from Code::Stats
const LEVEL_FACTOR: number = 0.025;

// Get level for given XP
export function getLevel(xp: number): number {
  return Math.floor(LEVEL_FACTOR * Math.sqrt(xp));
}

// Example usage:
// const xp: number = 1000; // Example XP value
// const level: number = getLevel(xp);
// console.log(`Level for ${xp} XP is ${level}`);