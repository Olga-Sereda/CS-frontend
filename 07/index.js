function seril(arr) {
  let totalStringsLength = 0;
  let encodedStrings = [];

  for (let i = 0; i < arr.length; i++) {
    const bytes = new TextEncoder().encode(arr[i]);
    encodedStrings.push(bytes);
    totalStringsLength += bytes.byteLength;
  }

  const totalSize = 4 + 4 * arr.length + totalStringsLength;

  const buffer = new ArrayBuffer(totalSize); //коробка, просто выделение памяти компьютера под данные, с ними больше ничего не сделать
  const view = new DataView(buffer);

  const uint8Array = new Uint8Array(buffer);
  let offset = 0;

  view.setUint32(offset, arr.length, true); // записываем в коробку число, которое занимает 4 байт, - длина массива (3)
  offset += 4;

  for (let i = 0; i < encodedStrings.length; i++) {
    const bytes = encodedStrings[i];
    // console.log(bytes);

    view.setUint32(offset, bytes.byteLength, true); // записываем в коробку число, которое занимает 4 байт, - длина одного эл-та массива, т.е. длина строки
    offset += 4;

    uint8Array.set(bytes, offset); //записываем в коробку буквы каждой строки
    offset += bytes.byteLength;
  }

  console.log(uint8Array);

  // return uint8Array;
  return {
    at(index) {
      let readOffset = 0;

      const totalStrings = view.getUint32(readOffset, true);
      readOffset += 4;

      if (index < 0) {
        index = totalStrings + index;
      }

      for (let i = 0; i <= index; i++) {
        i;
        const strLenght = view.getUint32(readOffset, true);
        readOffset += 4;

        if (index === i) {
          const strBytes = uint8Array.subarray(
            readOffset,
            readOffset + strLenght,
          );
          const res = new TextDecoder().decode(strBytes);
          return res;
        } else {
          readOffset += strLenght;
        }
      }
    },
  };
}

const strings = ["hello", "мир", ""];
const buf = seril(strings);
console.log(buf.at(1));
