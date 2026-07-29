const numberRegex = /-?\b(\.)?\d+(\.\d+)?/g;
const text =
  "The price is 100.5 dollars, -5 degrees, -0.5 and version2 is out.";

const numbers = text.match(numberRegex);
console.log(numbers);

const dateRegex =
  /\b((0[1-9]|(1|2)[0-9]|3[0-1])\.(0[1-9]|1[0-2])\.(19|20\d{2}))\b|\b((19|20\d{2})-(0[1-9]|1[0-2])-(0[1-9]|(1|2)[0-9]|3[0-1]))\b/g;
const text2 =
  "Today is 15.01.2025 and tomorrow is 2025-01-16. Invalid: 32.13.2025";

const dates = text2.match(dateRegex);
console.log(dates);
