class BCD {
  digits;

  constructor(num) {
    let array = [];

    if (num === 0) {
      array = [0];
    } else {
      while (num > 0) {
        array.unshift(num % 10);
        num = Math.floor(num / 10);
      }
    }

    this.digits = new Uint8Array(array);
  }

  toNumber() {
    const result = this.digits.reduce((sum, digit) => sum * 10 + digit, 0);
    return result;
  }

  toBigint() {
    const result = this.digits.reduce(
      (sum, digit) => sum * 10n + BigInt(digit),
      0n,
    );
    return result;
  }

  toString() {
    const result = this.digits.map((num) => num + "").join("");
    return result;
  }

  at(n) {
    const len = this.digits.length;
    if (n < 0) {
      return this.digits[len + n];
    } else {
      return this.digits[n];
    }
  }
}

const one = new BCD(65536);

console.log(one.digits)
console.log(one.toNumber());
console.log(one.toBigint());
console.log(one.toString());
console.log(one.at(2));
console.log(one.at(-1));
