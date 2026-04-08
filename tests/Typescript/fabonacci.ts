function fabonacciSeries(n: number) {
    let curr = 1;
    let prev = 0;
    if (n <= 0) {
        return n;
    }
    for (let i = 0; i < n; i++) {
        console.log(prev);
        [prev, curr] = [curr, curr + prev];
    }
};

function reverseString() {
    const str: string = "I am in bangalore";
    let rev = '';
    for (const s of str) {
        rev = s + rev;
    }
    console.log(rev)
}

reverseString();

function reverseTargetString(str: string, target: string) {
    let tar: string = str.split('').reverse().join('');
    let rev = str.replace(target, tar);
    console.log(`Reverse string after target is ${rev}`)

}

reverseTargetString('I am in delhi', 'delhi');
//Check if a string is a palindrome

function palindrome(str: string) {
    let rev = '';
    for (const s of str.toLowerCase()) {
        rev = s + rev;
    }
    console.log(rev);
    // if(rev == str){
    //     console.log('String is palindrome');
    // } else{
    //      console.log('String is not palindrome');
    // }
    console.log(rev == str ? 'String is palindrome' : 'String is not palindrome');
}

palindrome('Bangalore');
palindrome('madam');

//Find duplicate characters in a string
function findDuplicate(str: string) {
    let newStr = '';
    for (const s of str) {
        newStr.includes(s) ? '' : newStr += s;
    }
    console.log(newStr);
}

findDuplicate('bangalore');

//Count the occurrence of each character in a string

function countOccurrenceCharacter(str: string) {
    let result = '';
    const map = new Map<string, number>();
    for (const s of str) {
        map.set(s, (map.get(s) || 0) + 1)
    }
    map.forEach((key, value) => {
        result += `${key}${value}:`;
    });
    console.log(result);
}

countOccurrenceCharacter('bangalore')

function findDuplicateAndRemove(str: string) {
    // str = 'Bangalore';
    let result = '';
    let duplicate = '';
    for (const s of str) {
        result.includes(s) ? duplicate += s : result += s;
    }
    console.log(result);
    console.log(duplicate);
}

findDuplicateAndRemove('Katniaaa');

//Check if two strings are anagrams

function checkAnagram(str1: string, str2: string) {
    let newstr1;
    let newstr2;
    if (str1.length == str2.length) {
        newstr1 = str1.split('').sort().join('');
        newstr2 = str2.split('').sort().join('');
    }
    return newstr1 == newstr2 ? 'yes' : 'No'
}

const result = checkAnagram("listen", "silent");
console.log(result);

//Find the longest substring without repeating characters
function longest_substring(str: string) {
    let current = '';
    let longest = '';
    for (const s of str) {
        if (current.includes(s)) {
            current = current.slice(current.indexOf(s) + 1);

        }
        current += s;
        if (current.length > longest.length) {
            longest = current;
        }
    }
    return longest;
}

console.log(longest_substring('abcbbc'))

//Check if a string contains only digits

function checkDigitInString() {
    let str: string = 'Bangalore@1';
    const result = str.match(/[0-9]/g);
    console.log(result);
    return (result?.length ?? 0) >= 1 ? 'Yes' : 'No';
    // return (result?.length ?? 0) > 1 ? 'Yes' : 'No';
}

console.log(checkDigitInString())

//Check if a string contains only special

function checkSplCharacterInString() {
    let str: string = 'Bangalore@1';
    const result = str.match(/[^a-zA-Z0-9]/g);
    console.log(result);
    // return (result?.length??0) >=1 ? 'Yes': 'No'; 
    return (result?.length ?? 0) >= 1 ? 'Yes' : 'No';

}

console.log(checkSplCharacterInString())

//Move all zeros in an array to the end
/*
Key Logic Summary
Non-zero elements are "pushed" forward into the left pointer's position.
Zeros naturally get swapped toward the back because the left pointer only moves when a non-zero is placed.
Ordering is preserved because non-zero elements are handled sequentially as they appear
*/
function moveZeroes(nums: number[]): void {
    let left = 0; // Pointer for the next non-zero position

    for (let right = 0; right < nums.length; right++) {
        if (nums[right] !== 0) {
            // Swap current non-zero element with the element at 'left'
            [nums[left], nums[right]] = [nums[right], nums[left]];
            left++;
        }
    }
}

const arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log(arr);

// Find the largest and smallest number in an array.
//const arr = [0, 1, 0, 3, 12];
function findLargestSmallest(arr: number[]) {
    if (arr.length < 0) return `Array is empty`
    let smallest = 0;
    let largest = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < smallest) {
            smallest = arr[i];
        }
        if (arr[i] > largest) {
            largest = arr[i]
        }
    }
    // console.log(`Smallest is ${smallest} and largest ${largest}`)
    return { smallest, largest }
}
const arr1 = [0, 1, 0, 3, 12];
console.log(findLargestSmallest(arr1))
//{ smallest: 0, largest: 12 }

function removeDuplicate(str: string) {
    const result = [... new Set(str)].join('')

    return { result }
}

console.log(removeDuplicate('Bangalore'))

// Genric way
function removeDuplicateGeneric<T extends string | any[]>(item: T): T {
    if (typeof item === 'string') {
        return [... new Set(item)].join('') as T;
        // Array.isArray
    } else if (typeof item === 'object') {
        // Handle array: filter unique elements
        return [...new Set(item)] as unknown as T;
    }
    return item;
}

console.log(removeDuplicateGeneric('Bangalore'));
console.log(removeDuplicateGeneric(['a', 'b', 'a', 4, 5, 5, 3]))

//Find the second largest element in an array
function getSecondLargest(num: number[]) {

    // Decending b-a, Acending a-b
    let result = [... new Set(num)].sort((a, b) => b - a);
    console.log(result)
    return result;
}

getSecondLargest([10, 5, 10, 8])

//Merge two sorted arrays
function mergeTwoSortedArray(arr1: number[], arr2: number[]) {

    let arr = arr1.concat(arr2);
    // Decending b-a, Acending a-b
    let result = [... new Set(arr)].sort((a, b) => a - b);

    console.log(result);
}
// const arr1 = [10, 5, 10, 8];
const arr2 = [1, 5, 3, 2]

mergeTwoSortedArray(arr1, arr2)