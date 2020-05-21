
const calculateModule = require('./calculator');

var sumResult = calculateModule.sum(10,2);
var substractResult = calculateModule.substract(10,2);
var multiplyResult = calculateModule.multiply(10,2);
var divideResult = calculateModule.divide(10,2);

console.log("sum result : ", sumResult);
console.log("substract result : ", substractResult);
console.log("multiply result : ",multiplyResult);
console.log("divide result : ", divideResult);