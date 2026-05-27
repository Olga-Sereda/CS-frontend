class PixelStreamArrayOfArrays {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = [];

    for (let y = 0; y < height; y++) {
      this.data[y] = [];
      for (let x = 0; x < width; x++) {
        this.data[y][x] = [0, 0, 0, 255];
      }
    }
  }

  getPixel(x, y) {
    return this.data[y][x];
  }

  setPixel(x, y, RGBA) {
    return (this.data[y][x] = RGBA);
  }

  forEach(mode, callback) {
    if (mode === "RowMajor") {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const pixel = this.data[y][x];
          callback(pixel, x, y);
        }
      }
    } else if (mode === "ColMajor") {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          const pixel = this.data[y][x];
          callback(pixel, x, y);
        }
      }
    }
  }
}

function logPixel(pixel, x, y) {
  console.log(`Пиксель ${pixel}`);
}

const one = new PixelStreamArrayOfArrays(2, 2);
// console.log(one.getPixel(1, 1))
// console.log(one.setPixel(1, 0, [0, 1, 1, 255]))
// console.log(one.getPixel(1, 0))
// console.log(one.forEach('RowMajor', logPixel))

class PixelStreamFlatArray {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = [];

    for (let i = 0; i < height * width; i++) {
      this.data.push(0, 0, 0, 255);
    }
  }

  getPixel(x, y) {
    let index = (y * this.width + x) * 4;
    return this.data.slice(index, index + 4);
  }

  setPixel(x, y, RGBA) {
    let index = (y * this.width + x) * 4;
    for (let i = 0; i < 4; i++) {
      this.data.splice(index, 1, RGBA[i]);
      index++;
    }
    return this.data;
  }

  forEach(mode, callback) {
    if (mode === "RowMajor") {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let index = (y * this.width + x) * 4;
          const pixel = [
            this.data[index],
            this.data[index + 1],
            this.data[index + 2],
            this.data[index + 3],
          ];
          callback(pixel, x, y);
        }
      }
    } else if (mode === "ColMajor") {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let index = (y * this.width + x) * 4;
          const pixel = [
            this.data[index],
            this.data[index + 1],
            this.data[index + 2],
            this.data[index + 3],
          ];
          callback(pixel, x, y);
        }
      }
    }
  }
}

const two = new PixelStreamFlatArray(2, 2);
// console.log(two.getPixel(1, 1))
// console.log(two.data)
// console.log(two.setPixel(1, 0, [2, 2, 2, 5]))
// console.log(two.forEach('RowMajor', logPixel))

class PixelStreamArrayOfObjects {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.data = [];

    for (let y = 0; y < height; y++) {
      this.data[y] = [];
      for (let x = 0; x < width; x++) {
        this.data[y][x] = { r: 0, g: 0, b: 0, a: 255 };
      }
    }
  }

  getPixel(x, y) {
    return this.data[y][x];
  }

  setPixel(x, y, RGBA) {
    return (this.data[y][x] = RGBA);
  }

  forEach(mode, callback) {
    if (mode === "RowMajor") {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const pixel = this.data[y][x];
          callback(pixel, x, y);
        }
      }
    } else if (mode === "ColMajor") {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          const pixel = this.data[y][x];
          callback(pixel, x, y);
        }
      }
    }
  }
}

function logPixel2(pixel, x, y) {
  const pixelString = JSON.stringify(pixel, null, 1);
  console.log(`Пиксель (${x}, ${y}):`, pixelString);
}

const three = new PixelStreamArrayOfObjects(2, 2);
// console.log(three.data)
// console.log(three.setPixel(1, 0, {r: 2, g: 2, b: 3, a: 255}))
// console.log(three.data)
// console.log(three.forEach('RowMajor', logPixel2))

class PixelStreamTypedArray {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    const buffer = new ArrayBuffer(width * height * 4);
    this.data = new Uint8Array(buffer);

    for (let i = 1; i <= this.data.length; i++) {
      if (i % 4 === 0) {
        this.data[i - 1] = 255;
      }
      if (i === 14) this.data[i - 1] = 25;
    }
  }

  getPixel(x, y) {
    let index = (y * this.width + x) * 4;
    return this.data.slice(index, index + 4);
  }

  setPixel(x, y, RGBA) {
    let index = (y * this.width + x) * 4;
    for (let i = 0; i < 4; i++) {
      this.data[index] = RGBA[i];
      index++;
    }
    return this.data;
  }

  forEach(mode, callback) {
    if (mode === "RowMajor") {
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          let index = (y * this.width + x) * 4;
          const pixel = [
            this.data[index],
            this.data[index + 1],
            this.data[index + 2],
            this.data[index + 3],
          ];
          callback(pixel, x, y);
        }
      }
    } else if (mode === "ColMajor") {
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          let index = (y * this.width + x) * 4;
          const pixel = [
            this.data[index],
            this.data[index + 1],
            this.data[index + 2],
            this.data[index + 3],
          ];
          callback(pixel, x, y);
        }
      }
    }
  }
}

const four = new PixelStreamTypedArray(2, 2);

// console.log(four.data);
// console.log(four.getPixel(1, 1))
// console.log(four.setPixel(1, 0, [2, 2, 2, 5]));
// console.log(four.forEach("RowMajor", logPixel));

//benchmark
function runBenchmark(
  Constructor,
  width,
  height,
  operationFunction,
) {
  const stream = new Constructor(width, height);

  const startTime = performance.now();
  operationFunction(stream);
  const endTime = performance.now();

  const duration = endTime - startTime;

  console.log(
    `${Constructor.name} (${width}x${height}): ${duration.toFixed(2)} мс`,
  );
}

const sizes = [128, 512, 2048];

sizes.forEach((size) => {
  console.log(`--- Тест для изображения ${size}x${size} ---`);

  runBenchmark(PixelStreamTypedArray, size, size, (s) => {
    for (let y = 0; y < s.height; y++) {
      for (let x = 0; x < s.width; x++) {
        s.setPixel(x, y, [255, 0, 0, 255]);
      }
    }
  });

  runBenchmark(PixelStreamFlatArray, size, size, (s) => {
    for (let y = 0; y < s.height; y++) {
      for (let x = 0; x < s.width; x++) {
        s.setPixel(x, y, [255, 0, 0, 255]);
      }
    }
  });

  runBenchmark(
    PixelStreamArrayOfObjects,
    size,
    size,
    (s) => {
      for (let y = 0; y < s.height; y++) {
        for (let x = 0; x < s.width; x++) {
          s.setPixel(x, y, { r: 2, g: 2, b: 3, a: 255 });
        }
      }
    },
  );
  
  runBenchmark(
    PixelStreamArrayOfArrays,
    size,
    size,
    (s) => {
      for (let y = 0; y < s.height; y++) {
        for (let x = 0; x < s.width; x++) {
          s.setPixel(x, y, [2, 0, 0, 255]);
        }
      }
    },
  );

});