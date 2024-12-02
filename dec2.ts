const file = Bun.file("dec2-data.txt");
const text = await file.text();

const lines = text.split("\n").map((line) => line.split(/\s+/).map(Number));

const numSafe = countNumSafe(lines);

function countNumSafe(someArray: number[][]): number {
  return someArray.reduce((acc, line) => {
    return isSafe(line) ? acc + 1 : acc;
  }, 0);
}

function isSafe(numArray: number[]): boolean {
  const allIncreasing =
    countIncreasingNumbers(numArray) === numArray.length - 1;
  const allDecreasings =
    countDecreasingNumbers(numArray) === numArray.length - 1;
  const acceptableThreshold = [1, 2, 3];

  const isAcceptableThreshold = numArray.every((num, i, arr) => {
    if (i === 0) return true;
    return acceptableThreshold.includes(Math.abs(num - arr[i - 1]));
  });

  return (allIncreasing || allDecreasings) && isAcceptableThreshold;
}

function countIncreasingNumbers(someArray: number[]): number {
  return someArray.reduce((acc, num, i, arr) => {
    if (i === 0) return acc;
    return num > arr[i - 1] ? acc + 1 : acc;
  }, 0);
}

function countDecreasingNumbers(someArray: number[]): number {
  return someArray.reduce((acc, num, i, arr) => {
    if (i === 0) return acc;
    return num < arr[i - 1] ? acc + 1 : acc;
  }, 0);
}

function removeFirstUnsafeValue(numArray: number[]): number[] | null {
  if (isSafe(numArray)) return numArray;
  for (let i = 0; i < numArray.length; i++) {
    const tryRemoval = numArray.slice();
    tryRemoval.splice(i, 1);
    console.log(tryRemoval);
    if (isSafe(tryRemoval)) return tryRemoval;
  }
  return null;
}

function countAfterRemovingOneUnsafe(someArray: number[][]): number {
  const sanitizedArray = someArray
    .map((line) => removeFirstUnsafeValue(line))
    .filter((i) => i !== null) as number[][];
  return countNumSafe(sanitizedArray);
}

console.log(new Date());
console.log(numSafe);
console.log(
  `After removing one unsafe value: ${countAfterRemovingOneUnsafe(lines)}`,
);
