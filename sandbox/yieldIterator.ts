// let iterableObject = {
//   generator: function* () {
//       yield 1;
//       yield 2;
//       yield 3;
//   },
//   [Symbol.iterator]: function () {
//       return this.generator();
//   }
// };

// for (let value of iterableObject) {
//   console.log(value);
// }