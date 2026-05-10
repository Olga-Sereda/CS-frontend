class BCD {

  packBCD(digit1, digit2) {
    return (digit1 << 4) | digit2;
  }

  unpackBCD(byte) {
    return [byte >> 4, byte & 0x0f];
  }

  constructor(num) {
    let array = [];
    let result = [];

    if (num === 0) {
      array = [0];
    } else {
      while (num > 0) {
        array.unshift(num % 10);
        num = Math.floor(num / 10);
      }
    }

    for (let i = 0; i < array.length; i += 2) {
      if (i + 1 < array.length) {
        result.push(this.packBCD(array[i], array[i + 1]));
      } else {
        result.push(this.packBCD(array[i], 0));
      }
    }

    this.digits = new Uint8Array(result);
    this.digLen = array.length;
  }

  toNumber() {
    let result = 0;
    let count = 0;

    for (let i = 0; i < this.digits.length; i++) {
      const [first, last] = this.unpackBCD(this.digits[i]);

      if (count < this.digLen) {
        result = result * 10 + first;
        count++;
      }

      if (count < this.digLen) {
        result = result * 10 + last;
        count++;
      }
    }

    return result;
  }


  toBigint() {
    let result = 0n;
    let count = 0;

    for (let i = 0; i < this.digits.length; i++) {
      const [first, last] = this.unpackBCD(this.digits[i]);

      if (count < this.digLen) {
        result = result * 10n + BigInt(first);
        count++;
      }

      if (count < this.digLen) {
        result = result * 10n + BigInt(last);
        count++;
      }
    }

    return result;
  }

  toString() {
    let result = '';
    let count = 0;

    for (let i = 0; i < this.digits.length; i++) {
      const [first, last] = this.unpackBCD(this.digits[i]);

      if (count < this.digLen) {
        result += first;
        count++;
      }

      if (count < this.digLen) {
        result += last;
        count++;
      }
    }

    return result;
  }

  at(n) {
    let index = n;
    if (index < 0) {
      index = this.digLen + n;
    }

    if (index % 2 === 0) {
      return this.unpackBCD(this.digits[index / 2])[0];
    } else {
      return this.unpackBCD(this.digits[(index - 1) / 2])[1];
    }
  }
}

const one = new BCD(65536);

console.log(one.toNumber());
console.log(one.toBigint());
console.log(one.toString());
console.log(one.at(3));
console.log(one.at(-1));
