/**
 * Calculations for levels based on XP.
 */
export class XPCalculator {
    private static readonly levelFactor: number = 0.025;
  
    /**
     * Get the level based on given XP.
     * @param xp The experience points
     * @returns The level
     */
    static getLevel(xp: number): number {
        const XP = xp||0;
        return Math.trunc(Math.floor(this.levelFactor * Math.sqrt(XP)));
    }
  
    /**
     * Get the amount of XP required to reach the next level from the given level.
     * @param level The current level
     * @returns The XP required to reach the next level
     */
    static getNextLevelXP(level: number): number {
      return Math.trunc(Math.pow(Math.ceil((level + 1) / this.levelFactor), 2));
    }
  
    /**
     * Get the progress to the next level in percentage.
     * @param xp The experience points
     * @returns The progress to the next level in percentage
     */
    static getLevelProgress(xp: number): number {
      const level = XPCalculator.getLevel(xp);
      const currentLevelXP = XPCalculator.getNextLevelXP(level - 1);
      const nextLevelXP = XPCalculator.getNextLevelXP(level);
  
      const haveXP = xp - currentLevelXP;
      const neededXP = nextLevelXP - currentLevelXP;
  
      return Math.trunc(Math.round((haveXP / neededXP) * 100));
    }
  }