// In TypeScript, a Type Guard is a piece of logic that allows you to "narrow down" the type of a variable 
// within a specific block of code.

// Think of it as a checkpoint. If a variable could be a string or a number (a Union type), a 
// Type Guard confirms which one it is so you can safely use string methods (like .toUpperCase()) or 
// math operations without the compiler complaining.

// 1. The Basic Type Guard (typeof)
// This is the most common guard used for primitive types.
import {test} from '@playwright/test';

function printLength(value: string | number) {
  // Before the guard, value.length would throw an error
  
  if (typeof value === "string") {
    // Inside this block, TypeScript KNOWS 'value' is a string
    console.log(`String length: ${value.length}`);
  } else {
    // Inside this block, TypeScript KNOWS 'value' must be a number
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}

test('Type guard', async({page}) =>{
    const priceText: string | null = await page.textContent('.price');

if (priceText !== null) {
  const price = parseFloat(priceText);
  console.log(`The price is ${price}`);
} else {
  throw new Error("Price element not found on page!");
}
});
