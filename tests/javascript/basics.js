/* let x = 1;
x = ++x;
console.log(x);
*/
/*
let obj = {age: 24};
let {age:userage}= obj;
console.log(userage);//24
console.log(age); //error output
main.ts:8:13 - error TS2304: Cannot find name 'age'.
8 console.log(age);
*/

/*
const x = "8";
const a = 1;
console.log(x+a+1); //811
console.log(+x+a+1); // 10
*/

/*
const a = [1,2,3,4];
console.log(1 in a); //t
console.log(2 in a); //t
console.log(3 in a); //t
console.log(4 in a); //f because array act as a objec and work on key[index]
So index 0,1,2,3 are available 4 is not available. so outout is false
*/

/*
let x = '10';
console.log(x++);//10
// because first it will return and then increment
*/

/*
const arr = [1,2];

for( var i =0;i<arr.length;i++){
    setTimeout(() =>{
        console.log(i)
    },1000)
}
The Execution Flow
Loop Starts: i is 0. The first setTimeout is scheduled for 1000ms.

Next Iteration: i becomes 1. The second setTimeout is scheduled for 1000ms.

Loop Ends: i increments to 2. The condition i < arr.length (2 < 2) is now false, 
so the loop stops.

The Delay Passess: After 1000ms, the two scheduled setTimeout functions finally run.

The Result: When they look for the value of i, they both look at the same shared variable,
which is now 2.    
*/

//console.log(1 || 2 && 3) // 1
/* Operator Precedence
In JavaScript, the Logical AND (&&) operator has higher precedence than the Logical OR (||) 
operator. This means the engine evaluates the && part of the expression first, almost 
as if there were invisible parentheses around it.

The expression is evaluated like this:

2 && 3 is evaluated first.

Then, the result is used in 1 || (result). 

2. Step-by-Step Execution
Step A: Evaluate 2 && 3
The && operator returns the first falsy value it encounters. If all values are truthy (which 2 and 3 are), it returns the last value.

2 is truthy, so it moves to the next operand.

3 is truthy, so it returns 3.

Intermediate Result: 1 || 3

Step B: Evaluate 1 || 3 (Short-Circuiting)
The || operator returns the first truthy value it encounters. If it finds a truthy value, it short-circuits, meaning it stops immediately and doesn't even look at the rest of the expression.

1 is truthy.

The engine sees 1 and says, "I'm done!"

Final Result: 1
*/


// console.log(!!{}) // T
// console.log(!![]) // T
/*
{} (Empty Object): In JavaScript, all objects are truthy, even if they are empty. There is no such thing as a "falsy" object.

[] (Empty Array): Arrays are technically a specialized type of object. Therefore, an empty array is also truthy.
Execution 
1. !!T--> !F--> T
*/

//console.log(1+'2'+3); // '123'
/*
Due to type coersion javascript will convert the num to string
*/

// const [x, y=5] = [10];
// console.log(x+y); 15

/*
Here x will assign to 10 and y assign to undefined, but default value is 5.So y is 5
*/
// console.log(1+2+'3');//33

// console.log(1);
// setTimeout(() =>{
//     console.log(2);
// },0)
// console.log(3);
//out: 1,3,2
/*
There are 3 types of task
Sync : console.log()
Async :
    micro : Promises
    macro : setTimeout()
*/

setTimeout(() =>{
    console.log('timeout 1');
},0)
Promise.resolve().then(() =>{
    console.log('promise 1')
})
//out: 
// promise 1
// timeout 1
/*
There are 3 types of task
Sync : console.log()
Async :
    micro : Promises
    macro : setTimeout()
*/

/*
console.log(+true);//1
console.log(+false); //0
console.log(+'123');//123
console.log(+null); //0
*/

/* let x = 123; //number
let y = new Number(123); // this is object type
console.log(x === y) //false
// this will compare value and type */

/* console.log(typeof null); // object
console.log(typeof undefined); // undefined
console.log(typeof NaN); // number
console.log(typeof function(){});//function */

// console.log(5 && 1); // 1
// console.log(5 || 1); // 5

/*
Note : whenever we use && with two tuthy value then always return last value
whenever we use || with two tuthy value then always return first value
*/

// console.log(5 && 1 && 6); // 6
// console.log(5 || 1 || 4); // 5

/*
Note : whenever we use && with two tuthy value then always return last value
whenever we use || with two tuthy value then always return first value
*/

// let x = '5';
// let y = true; //1
// console.log(x-y)// 4

// const x = 'he'.split(',');
// ['h','e']-->allocate in seprate memory
// const y = ['h','e'];
//-->allocate in seprate memory
// console.log(x === y); // false

// console.log(1 + 2+ '3'); //'33'
// console.log('1'+2+3); // '123'
/*Note : Always move from left to right
str + num -> str */

// console.log([] + 0);  // 0
// console.log([0] == [0]); // false
/*Note : convert [] to string '' and empty string is 0
[0] == [0] --> due to memory location assigned
 */

// console.log([]== ![]);  // true

/*Note :
Array is always truthy value
!True -> false
[] --> ''--> false
 */

// console.log(Boolean({}));  // true
// console.log(Boolean([])); // true
// console.log(Boolean("")); //false
// console.log(Boolean(new Boolean(false))) //true
/*Note :
[] -->{}->always truthy->true
''--> false
 */

// const s1= 'hello';
// const s2 = new String('hello');
// console.log(s1 == s2);//true
// console.log(s1 === s2); //false
//No type coersion will apply

/*Note :
== type coersion will apply and  string object-> contains string  
=== No type coersion will apply
 */

// const str= 'hello';
// str.data = 'val';
// console.log(str.data); // undefined


/*Note :
primitive data types are string, number, bool, 
line 2 try to store data and aftre that destry. so str.data->undefined
 */

// console.log(true+1); // 2
// console.log(true+'1'); //true1
/*
let x = {
    a: undefined,
    b: null
}

console.log(JSON.stringify(x)); // {"b": null}
//note -> because during conversion it will remove undefined value
*/

// const obj = {a: 1};
// obj.a = 2;
// console.log(obj); // {a: 2}

// console.log(0 || 1); //1
// console.log(1 || 2); //1
// console.log(0 && 1); //0
// console.log(1 && 2); //2

// Note : 0 is not the truthy value