export function isNewDateMoreThan24HoursLater(storedDate: Date, newDate: Date): boolean {
    // Calculate the difference in milliseconds between the two dates
    const diffInMs = newDate.getTime() - storedDate.getTime();
    
    // Calculate the number of milliseconds in 24 hours
    const msIn24Hours = 24 * 60 * 60 * 1000;
    
    // Compare the difference with 24 hours
    return diffInMs > msIn24Hours;
}

// // Example usage:
// const referenceDate = new Date('2024-06-22T12:00:00Z');
// const newDate = new Date('2024-06-23T12:00:00Z');

// console.log(isNewDateMoreThan24HoursLater(referenceDate, newDate)); // Output: true