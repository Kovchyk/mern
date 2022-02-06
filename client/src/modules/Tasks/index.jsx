import React from 'react';

const Tasks = () => {
  // const { log } = console;
  // const sum = (a) => {
  //   let sum = a;
  //   const f = (b) => {
  //     if (b !== undefined) {
  //       sum += b;
  //       return f;
  //     } else return sum;
  //   };

  //   return f;
  // };

  // function add(a, b) {
  //   if (b !== undefined) {
  //     return a + b;
  //   } else {
  //     return (c) => a + c;
  //   }
  // };

  // log(add(2, 3));
  // log(add(2)(3));

  // const array = ['cherry', 'apple', 'strawberry', 'orange', 'banana'];

  // const quickSort = array => {
  //   if (array.length < 2) {
  //     return array;
  //   } else {
  //     let left = [];
  //     let right = [];
  //     let pivot = array[0];

  //     for (let i = 1; i < array.length; i++) {
  //       if (pivot > array[i]) {
  //         left.push(array[i]);
  //       } else {
  //         right.push(array[i]);
  //       }
  //     }

  //     return [...quickSort(left), pivot, ...quickSort(right)];
  //   }
  // };

  // console.log(quickSort(array));

  // const input1 = [1, 2, 2, 1];
  // const input2 = [2, 2];
  // const input3 = [4, 9, 5];
  // const input4 = [9, 4, 9, 8, 4];

  // const intersect = (nums1, nums2) => {
  //   let result = [];

  //   let map = nums1.reduce((acc, item) => {
  //     acc[item] = acc[item] ? acc[item] + 1 : 1;
  //     return acc;
  //   }, {});

  //   for (let i = 0; i < nums2.length; i++) {
  //     const current = nums2[i];
  //     const count = map[current];

  //     if (count && count > 0) {
  //       result.push(current);
  //       map[current] -= 1;
  //     }
  //   }

  //   return result;
  // };

  // console.log(intersect(input1, input2));
  // console.log(intersect(input3, input4));

  // const palindrome = str => {
  //   str = str.toLowerCase().replace(/\s/g, '');
  //   console.log(str.split('').join(''));

  //   return str === str.split('').reverse().join('');
  // };

  // console.log(palindrome('А роза упала на лапу Азора'));

  // const fizzBuzz = number => {
  //   for (let i = 0; i < number; i++) {
  //     let item = i;

  //     if (i % 3 === 0) {
  //       item = 'fizz';
  //     }

  //     if (i % 5 === 0) {
  //       item = 'buzz';
  //     }

  //     if (i % 3 === 0 && i % 5 === 0) {
  //       item = 'fizzbuzz';
  //     }

  //     console.log(item);
  //   }
  // };

  // fizzBuzz(20);

  // function digital_root(n) {
  //   const str = n.toString();
  //   const strArray = str.split('');

  //   const sum = strArray.reduce((acc, elem) => {
  //     return acc + +elem;
  //   }, 0);

  //   if (sum < 10) {
  //     return sum;
  //   } else {
  //     return digital_root(sum);
  //   }
  // }

  // console.log(digital_root(456));

  return <div>See the console</div>;
};

export default Tasks;
