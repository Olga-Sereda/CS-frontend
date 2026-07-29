function testPush(size, hasHole) {
  let arr = new Array(size);

  if (!hasHole) arr.fill(0);

  for (let i = 0; i < 1000; i++) {
    arr.push(1);
    arr.pop();
  }

  while (arr.length > size) arr.pop();
  while (arr.length < size) arr.push(0);

  const startTime = performance.now();
  arr.push(1);
  const endTime = performance.now();

  console.log(`duration PUSH for arr-${arr.length}: ${endTime - startTime}`);
}

testPush(10, false);
testPush(100, false);
testPush(1000, false);
testPush(10000, false);
testPush(1000, true);
testPush(10000, true);

function testPop(size, hasHole) {
  let arr = new Array(size);

  if (!hasHole) arr.fill(0);

  for (let i = 0; i < 1000; i++) {
    arr.push(1);
    arr.pop();
  }

  while (arr.length > size) arr.pop();
  while (arr.length < size) arr.push(0);

  const startTime = performance.now();
  arr.pop();
  const endTime = performance.now();

  console.log(`duration POP for arr-${arr.length}: ${endTime - startTime}`);
}

testPop(10, false);
testPop(100, false);
testPop(1000, false);
testPop(10000, false);
testPop(100000, false);
testPop(1000, true);
testPop(10000, true);

function testShift(size, hasHole) {
  let arr = new Array(size);

  if (!hasHole) arr.fill(0);

  for (let i = 0; i < 1000; i++) {
    arr.push(1);
    arr.pop();
  }

  while (arr.length > size) arr.pop();
  while (arr.length < size) arr.push(0);

  const startTime = performance.now();
  arr.shift();
  const endTime = performance.now();

  console.log(`duration SHIFT for arr-${arr.length}: ${endTime - startTime}`);
}

testShift(10, false);
testShift(100, false);
testShift(1000, false);
testShift(10000, false);
testShift(100000, false);
testShift(1000, true);
testShift(10000, true);