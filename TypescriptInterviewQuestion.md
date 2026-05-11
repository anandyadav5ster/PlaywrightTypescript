compile and run command
npx tsc demo_interface.ts&& node demo_interface.js

closure: Inner function remember the execution of outer function with the help of lexical scope.

lexical scope : Is the scope where it remember the execution of inner function.
example 
function outerFunc(){
    let outerVar = 10;
    function innerFunc(){
        console.log("OuterVar: ",+outerVar)
    }
    return innerFunc;
}
examp = outerFunc();
examp();

Callback function : is the function passing argument to another function and executed later.
 example :

 function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
}

function sayBye() {
    console.log("Goodbye!");
}

greet("Ajay", sayBye);

push-->To add element in the array at last
unshift--> To add element in the begning
pop -->remove element at last
shift --> remove first element
splice--> remove element and add element
splice(start,count,item)
arr.indexOf(element)--> search item in array and it return first index
arr.lastIndexOf(element)--> search and return last index
arr.includes(element)--> return the true or false if the element find.

Inbuild method to handle array data
map()--> create a new array by transfor using function to each element
arr.map(callback)
reduce() --> arr.reduce((agg,var)=> agg+var,0)
filter()-- arr.filter(callback)
some()--> atleast one test should pass
every()--> only return true if all the condition pass, hence false
find()-->return the first element which satisfy condition
findIndex()-->
sort()-->alphabatically order 
arr.sort()

shallowCopy -->
slice and spread operator used to create copy of an array
let arr2 = arr1.slice()
let arr2 = [... arr1]

deepCopy--> using arr.structuredClone()



