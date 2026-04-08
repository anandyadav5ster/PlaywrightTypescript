let obj = {age: 24}; let {age:userage}= obj; console.log(userage);//24 console.log(age); //error output
In this snippet, you are using ES6 Destructuring with aliasing.
When you write let {age: userage} = obj;, you are telling JavaScript:
Look for the property age inside the object.
Create a new variable named userage and assign the value to it. 
Because you renamed it to userage, the variable age is never actually created in your scope. That is why console.log(age) throws a ReferenceError. 
To fix it:
If you want to use the name age, simply don't use the colon:
javascript
let { age } = obj; 
console.log(age); // 24
Use code with caution.

Would you like to see how to set a default value while renaming a variable?

const arr = [1,2];
for( var i =0;i<arr.length;i++){
    setTimeout(() =>{
        console.log(i)
    },1000)
}
This code will output 2 twice (after a one-second delay).
Here is why:
var is function-scoped: Unlike let, var does not create a new variable for each loop iteration. There is only one i shared across the entire loop.
The Event Loop: The setTimeout callbacks don't run immediately. By the time they finally execute (1 second later), the loop has already finished.
Final Value: When the loop ends, the value of i has been incremented to 2. Both timeouts look at that same shared i and print 2.

How to fix it:
To get 0 and then 1, change var to let. Since let is block-scoped, JavaScript creates a "fresh" i for every single iteration of the loop:
javascript
for (let i = 0; i < arr.length; i++) {
    setTimeout(() => {
        console.log(i); // Prints 0, then 1
    }, 1000);
}

To understand why this code prints 2 twice, you have to look at how the Call Stack, Web APIs, and Callback Queue interact during execution. 
Stack Overflow
Stack Overflow
 +2
Phase 1: Synchronous Loop Execution
The JavaScript engine runs the for loop immediately on the main thread.
Iteration 1 (i = 0):
setTimeout is called.
The timer is handed off to the browser's Web API to wait for 1000ms.
The loop does not wait; it moves to the next step.
Iteration 2 (i = 1):
setTimeout is called again.
A second timer is started in the Web API.

Loop Exit (i = 2):
The condition i < arr.length (2 < 2) is now false.
The loop finishes, leaving the global variable i at the value of 2. 
Stack Overflow
Stack Overflow
 +3
Phase 2: The Delay
While the 1000ms is passing, the main Call Stack is empty. The two callback functions are sitting in the Callback Queue, waiting for their turn. 
Medium
Medium
Phase 3: Asynchronous Callback Execution 
After 1000ms, the Event Loop pushes the callbacks back onto the Call Stack one by one: 
Medium
Medium
First Callback runs:
It executes console.log(i)

It looks for i in its scope. It doesn't find it locally, so it looks at the shared var i in the outer scope, which is now 2.
Second Callback runs:
It also executes console.log(i).
It looks at the exact same shared var i, which is still 2. 
Stack Overflow
Stack Overflow
 +4
The output of console.log([] == ![]); is true. 
This is one of the classic "weird" behaviors in JavaScript caused by type coercion. Here is the step-by-step breakdown of how JavaScript evaluates this expression:
Evaluate ![] (Logical NOT):
An array [] is an object, which is "truthy" in JavaScript.
The ! operator converts it to a boolean and flips it. Since [] is truthy, ![] becomes false.
The expression is now: [] == false.
Compare an Object to a Boolean:
According to the Abstract Equality Comparison Algorithm, when comparing a non-primitive (the array) to a primitive (the boolean), JavaScript tries to convert them both to numbers.
The boolean false converts to 0.
The boolean false converts to 0.
The expression is now: [] == 0.
Convert the Array to a Primitive:
To compare [] to the number 0, JavaScript calls [].toString().
An empty array converted to a string is an empty string "".
The expression is now: "" == 0.
Final Number Comparison:
An empty string "" converted to a number is 0.
The final comparison is 0 == 0, which is true. 
To avoid these confusing results, it is generally recommended to use the strict equality operator (===), which does not perform type coercion. For example, [] === ![] would correctly return fals

Pop--> Remove last element of the array
push --> to add element in the last of the array
unshift--> To add element in the first
shift--> To remove first element from the array.

find the index of the element
fruit.indexOf("Apple");

splice--> remove the element using index
splice(index)