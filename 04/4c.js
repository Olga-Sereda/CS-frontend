const charToCode = new Map([
  ["0", 0b000000],
  ["1", 0b000001],
  ["2", 0b000010],
  ["3", 0b000011],
  ["4", 0b000100],
  ["5", 0b000101],
  ["6", 0b000110],
  ["7", 0b000111],
  ["8", 0b001000],
  ["9", 0b001001],
  ["а", 0b001010],
  ["б", 0b001011],
  ["в", 0b001100],
  ["г", 0b001101],
  ["д", 0b001110],
  ["е", 0b001111],
  ["ё", 0b010000],
  ["ж", 0b010001],
  ["з", 0b010010],
  ["и", 0b010011],
  ["й", 0b010100],
  ["к", 0b010101],
  ["л", 0b010110],
  ["м", 0b010111],
  ["н", 0b011000],
  ["о", 0b011001],
  ["п", 0b011010],
  ["р", 0b011011],
  ["с", 0b011100],
  ["т", 0b011101],
  ["у", 0b011110],
  ["ф", 0b011111],
  ["х", 0b100000],
  ["ц", 0b100001],
  ["ч", 0b100010],
  ["ш", 0b100011],
  ["щ", 0b100100],
  ["ъ", 0b100101],
  ["ы", 0b100110],
  ["ь", 0b100111],
  ["э", 0b101000],
  ["ю", 0b101001],
  ["я", 0b101010],
  [".", 0b101011],
  [",", 0b101100],
  ["-", 0b101101],
  ["!", 0b101111],
  ["?", 0b101110],
  ['"', 0b110000],
  [":", 0b110001],
  [";", 0b110010],
  ["…", 0b110011],
  ["=", 0b110100],
  ["*", 0b110101],
  ["/", 0b110110],
  ["(", 0b110111],
  [")", 0b111000],
  ["%", 0b111001],
  ["+", 0b111010],
  [" ", 0b111011],
  ["\n", 0b111100],
  ["\t", 0b111101],
  ["<u>", 0b111110],
  ["<U>", 0b111111],
]);

function code(text) {
  let array = [];
  let upper = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "А" && text[i] <= "Я") {
      if (upper < 1) {
        const lower = text[i].toLowerCase();
        const lowerCode = charToCode.get(lower);
        array.push(charToCode.get("<u>"));
        array.push(charToCode.get(lower));
        upper++;
      } else {
        upper++;
        array.push(charToCode.get(text[i].toLowerCase()));
      }
    } else {
      array.push(charToCode.get(text[i]));
      upper = 0;
    }
  }

  if (upper > 1) {
    array.splice(array.length - upper - 1, 1, charToCode.get("<U>"));
  }

  let bytes = new Uint8Array(array);
  return bytes;
}

const codeToChar = new Map();
for (let [char, code] of charToCode) {
  codeToChar.set(code, char);
}

function decode(arr) {
  let str = "";
  let upper = 0;

  for (let i = 0; i < arr.length; i++) {
    const char = codeToChar.get(arr[i]);

    if (upper > 0) {
      str += char.toUpperCase();
    } else if (char === "<u>") {
      i++;
      const nextChar = codeToChar.get(arr[i]);
      str += nextChar.toUpperCase();
    } else if (char === "<U>") {
      upper++;
    } else {
      str += char;
    }
  }

  return str;
}

console.log(code("Привет МИР"));
console.log(decode([62, 26, 27, 19, 12, 15, 29, 59, 63, 23, 19, 27]));
