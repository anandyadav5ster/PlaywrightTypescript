// type is the custom or new name of existing type
// cannnot be a same name

type result = string|number|boolean;

const myResult : result = 'Pass';

console.log(`My result is ${myResult}`);

const myPercentage: result = 64;
console.log(`My percentage was ${myPercentage}`);

// duplicate type is not allowed
// type result = undefined;