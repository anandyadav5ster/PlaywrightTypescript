import { test } from "@playwright/test";

test.describe("Coding questions", async () => {
  test("Reverse alternate index word ", () => {
    // Hello Anand How are you
    // reverse Anand, are

    function reverseAlternateIndex() {
      const str: string = "Hello Anand How are you";
      const words = str.split(" ");
      let reverse = "";
      const result = words.map((word, index) => {
        if (index % 2 !== 0) {
          return word.split("").reverse().join("");
        }
        return word;
      });

      return result.join(" ");
    }
    console.log(reverseAlternateIndex());
  });
  test("Fabonacci Series", () => {
    function fabonacciSeries(n: number) {
      let curr = 1;
      let prev = 0;
      let result = "";
      if (n <= 0) {
        return n;
      }
      for (let i = 0; i < n; i++) {
        // console.log(prev);
        result = `${result} ${prev}`;
        [prev, curr] = [curr, curr + prev];
      }
      console.info(result);
    }

    fabonacciSeries(10);
  });
  test("fabonacci store result in variable", () => {
    let prev: number = 0;
    let curr: number = 1;
    let result: number[] = [];

    for (let i = 0; i <= 10; i++) {
      result.push(prev);
      [[prev], [curr]] = [[curr], [curr + prev]];
    }
    console.log(result.join(","));
  });
  test("reverse string", () => {
    function reverseString() {
      const str: string = "I am in bangalore";
      let rev = "";
      for (const s of str) {
        rev = s + rev;
      }
      console.log(rev);
    }

    reverseString();
  });

  test("Reverse Target String", () => {
    function reverseTargetString(str: string, target: string) {
      let tar: string = str.split("").reverse().join("");
      let rev = str.replace(target, tar);
      console.log(`Reverse string after target is ${rev}`);
    }

    reverseTargetString("I am in delhi", "delhi");
  });

  test("palindrome", () => {
    function palindrome(str: string) {
      let rev = "";
      for (const s of str.toLowerCase()) {
        rev = s + rev;
      }
      // console.log(rev);
      // if(rev == str){
      //     console.log('String is palindrome');
      // } else{
      //      console.log('String is not palindrome');
      // }
      console.log(
        rev == str ? "String is palindrome" : "String is not palindrome",
      );
    }
    //Check if a string is a palindrome
    palindrome("Bangalore");
    palindrome("madam");
  });

  test("Count the occurrence of each character in a string", () => {
    //Count the occurrence of each character in a string

    function countOccurrenceCharacter(str: string) {
      let result = "";
      const map = new Map<string, number>();
      for (const s of str) {
        map.set(s, (map.get(s) || 0) + 1);
      }
      map.forEach((key, value) => {
        result += `${key}${value}:`;
      });
      console.log(result);
    }

    countOccurrenceCharacter("bangalore");
  });

  test("Find duplicate and remove", () => {
    function findDuplicateAndRemove(str: string) {
      // str = 'Bangalore';
      let result = "";
      let duplicate = "";
      for (const s of str) {
        result.includes(s) ? (duplicate += s) : (result += s);
      }
      console.log(result);
      console.log(duplicate);
    }

    findDuplicateAndRemove("Katniaaa");
  });

  test("Check if two strings are anagrams", () => {
    //Check if two strings are anagrams

    function checkAnagram(str1: string, str2: string) {
      let newstr1;
      let newstr2;
      if (str1.length == str2.length) {
        newstr1 = str1.split("").sort().join("");
        newstr2 = str2.split("").sort().join("");
      }
      return newstr1 == newstr2 ? "yes" : "No";
    }

    const result = checkAnagram("listen", "silent");
    console.log(result);
  });

  test("Find the longest substring without repeating characters", () => {
    function longest_substring(str: string) {
      let current = "";
      let longest = "";
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

    console.log(longest_substring("abcbbc"));
  });

  test("Check if a string contains only digits", () => {
    function checkDigitInString() {
      let str: string = "Bangalore@1";
      const result = str.match(/[0-9]/g);
      console.log(result);
      return (result?.length ?? 0) >= 1 ? "Yes" : "No";
    }

    console.log(checkDigitInString());
  });

  test("Check if a string contains only special", () => {
    function checkSplCharacterInString() {
      let str: string = "Bangalore@1";
      const result = str.match(/[^a-zA-Z0-9]/g);
      console.log(result);
      // return (result?.length??0) >=1 ? 'Yes': 'No';
      return (result?.length ?? 0) >= 1 ? "Yes" : "No";
    }

    console.log(checkSplCharacterInString());
  });

  test("Move all zeros in an array to the end", () => {
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
  });

  test("Move all zeros to left", () => {
    let a: number[] = [2, 0, 1, 0, 3, 0];

    const n = a.length;
    let left = 0;

    for (let right = 0; right < n; right++) {
      if (a[right] == 0) {
        [a[left], a[right]] = [a[right], a[left]];
        left++;
      }
    }
    console.log(a);
  });

  test("Find the largest and smallest number in an array.", () => {
    //const arr = [0, 1, 0, 3, 12];
    function findLargestSmallest(arr: number[]) {
      if (arr.length < 0) return `Array is empty`;
      let smallest = 0;
      let largest = 0;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < smallest) {
          smallest = arr[i];
        }
        if (arr[i] > largest) {
          largest = arr[i];
        }
      }
      // console.log(`Smallest is ${smallest} and largest ${largest}`)
      return { smallest, largest };
    }
    const arr1 = [0, 1, 0, 3, 12];
    console.log(findLargestSmallest(arr1));
    //{ smallest: 0, largest: 12 }
  });

  test("Remove Duplicate", () => {
    function removeDuplicate(str: string) {
      const result = [...new Set(str)].join("");

      return { result };
    }

    console.log(removeDuplicate("Bangalore"));
  });

  test("Generic reversed method", () => {
    function reverse<T extends string | number>(item: T): T {
      const str = item.toString().toLowerCase();
      let reversed = str.split("").reverse().join("");

      const result = typeof item === "number" ? Number(reversed) : reversed;
      console.log(result);
      return result as T;
    }
    reverse("Bangalore");
    reverse(1234);
  });

  test("Remove duplicate generic", () => {
    function removeDuplicateGeneric<T extends string | any[]>(item: T): T {
      if (typeof item === "string") {
        return [...new Set(item)].join("") as T;
        // Array.isArray
      } else if (typeof item === "object") {
        // Handle array: filter unique elements
        return [...new Set(item)] as unknown as T;
      }
      return item;
    }

    console.log(removeDuplicateGeneric("Bangalore"));
    console.log(removeDuplicateGeneric(["a", "b", "a", 4, 5, 5, 3]));
  });

  test("Find the second largest element in an array", () => {
    function getSecondLargest(num: number[]) {
      // Decending b-a, Acending a-b
      let result = [...new Set(num)].sort((a, b) => b - a);
      console.log(result);
      return result;
    }

    getSecondLargest([10, 5, 10, 8]);
  });

  test("Merge two sorted arrays", () => {
    function mergeTwoSortedArray(arr1: number[], arr2: number[]) {
      let arr = arr1.concat(arr2);
      // Decending b-a, Acending a-b
      let result = [...new Set(arr)].sort((a, b) => a - b);

      console.log(result);
    }
    const arr1 = [10, 5, 10, 8];
    const arr2 = [1, 5, 3, 2];

    mergeTwoSortedArray(arr1, arr2);
  });

  test("Find missing number in an array from 1 to N.", () => {
    function findMissingNumberArray(arr: number[]) {
      const n = arr.length - 1;
      const N = arr.length + 1;
      const min = arr[0];
      const max = arr[n];
      const expectedSum = (N * (min + max)) / 2;
      const actualSum = arr.reduce((acc, num) => acc + num, 0);
      const missingNumber = expectedSum - actualSum;
      console.log(missingNumber);
    }
    findMissingNumberArray([1, 2, 3, 4, 6]);
    findMissingNumberArray([10, 12, 13, 14]);
  });

  test("Rotate an array by k positions.", () => {
    /*
        1. Divide the arrya in two  parts 
            0  to k-1 and k =n-1
            reverse both and reverse whole array
        */
    function rorateArray(arr: number[], k: number): number[] {
      const n = arr.length;
      k = k % n;
      if (k == 0) {
        console.log(arr);
      }
      const reverse = (arr: number[], start: number, end: number) => {
        while (start < end) {
          [arr[start], arr[end]] = [arr[end], arr[start]];
          start++;
          end--;
        }
      };

      reverse(arr, 0, k - 1);
      reverse(arr, k, n - 1);
      reverse(arr, 0, n - 1);
      return arr;
    }
    console.log(rorateArray([1, 2, 3, 4, 6], 3));
  });

  test("Find intersection of two arrays", () => {
    function intersection(arr1: number[], arr2: number[]) {
      const set1 = new Set(arr1);

      const intersecSet = [...new Set(arr2.filter((item) => set1.has(item)))];
      // console.log(intersecSet);
      return intersecSet;
    }
    console.log(intersection([1, 2, 2, 1], [2, 2, 3]));
  });

  test("Check if an array is sorted", () => {
    /*
        If you ever find a pair where the current element is greater than the next, 
        you know the array is not sorted
        */
    type SortOrder = "asc" | "desc";

    function checkArraySorted(
      arr: number[],
      order: SortOrder = "asc",
    ): boolean {
      if (arr.length <= 1) return true;

      for (let i = 0; i < arr.length - 1; i++) {
        if (order === "asc") {
          if (arr[i] > arr[i + 1]) return false;
        } else {
          if (arr[i] < arr[i + 1]) return false;
        }
      }

      return true;
    }
    console.log(checkArraySorted([1, 2, 3, 4]));
  });

  test("Find factorial of a number", () => {
    function findFactorial(n: number): number {
      if (n <= 0) return 0;
      let result = 1;
      for (let i = 1; i <= n; i++) {
        result = result * i;
      }
      return result;
    }

    console.log(findFactorial(5));
  });

  test("Print prime number up to N", () => {
    function findPrime(n: number) {
      if (n <= 1) return false;
      // for n values
      for (let i = 2; i <= n; i++) {
        let status = true;
        for (let j = 2; j <= Math.sqrt(i); j++) {
          if (i % j == 0) {
            status = false;
            break;
          }
        }
        if (status) {
          console.log(i);
        }
      }
    }
    findPrime(10);
  });
  test("Find the sum combnation equals to target", () => {
    const a = [2, 3, 5, 7, 6, 8, 1];
    const n = a.length;
    const target = 9;

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (a[i] + a[j] == target) {
          console.log(
            `Numbers are (${a[i]},${a[j]}) and index are (${i},${j})`,
          );
        }
      }
    }
  });

  test("print the string occurence count ", () => {
    let str = "Anand";
    str = str.toLowerCase().replace(/\s/g, "");
    let map = new Map<string, number>();
    let res = "";
    for (const char of str.toLowerCase()) {
      map.set(char, (map.get(char) || 0) + 1);
    }
    // console.log(map);
    // map.forEach((key,value) =>{
    //    res+=(`${value}${key}`);
    // });
    // console.log(res);
    // Show the counts
    for (const [ch, count] of map) {
      res += `${ch}${map.get(ch)}`;
    }
    console.log(res);
  });

  test("Find the duplicate and unique in the string", () => {
    let str = "My count is india";
    str = str.replace(/\s/g, "");
    const words = str.toLowerCase().split("");
    let map = new Map<string, number>();
    let duplicate = [];
    let unique = [];
    for (const word of words) {
      map.set(word, (map.get(word) || 0) + 1);
    }
    for (const [key, value] of map) {
      if (value > 1) {
        // console.log(`${key},${value}`);
        duplicate.push(key);
      } else {
        // console.log(`${key},${value}`);
        unique.push(key);
      }
    }
    console.log("Duplicates", duplicate.join(","));
    console.log("Unique", unique.join(","));
  });

  test("Arrow function", () => {
    // a more concise way to write function expressions in JavaScript
    // The most obvious difference is the removal of the function keyword and the
    // addition of the "fat arrow" =>

    // example
    const add = (a: number, b: number) => a + b;
    console.log(add(2, 3));
  });

  test("Check middle name is present", () => {
    let name: string = "Anand Kumar Yadav";
    if (name.includes("Kumar")) {
      console.log("Middle name is present");
    } else {
      console.log("Middle name is not present");
    }
  });

  test("Sort array and add 1 to it", () => {
    const arr: number[] = [14, 13, 21, 9, 32];
    const result = arr
      .sort((a, b) => a - b)
      // console.log(result);
      .map((num) => num + 1);
    console.log(result);
  });
});
