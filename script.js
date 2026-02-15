const filterContainer = document.querySelector(".filters");
const imageCanvas = document.querySelector("#image-canvas");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
const reset = document.querySelector("#reset-btn");
const download = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");

let image = null;
let file = null;

let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hueRotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 200,
    unit: "px",
  },
  grayscale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};
const presets = {
  drama: {
    brightness: 110,
    contrast: 140,
    saturation: 120,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 110,
    saturation: 70,
    hueRotation: 0,
    blur: 1,
    grayscale: 20,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  cool: {
    brightness: 105,
    contrast: 110,
    saturation: 120,
    hueRotation: 200,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 80,
    saturation: 60,
    hueRotation: 0,
    blur: 0,
    grayscale: 10,
    sepia: 20,
    opacity: 100,
    invert: 0,
  },

  softGlow: {
    brightness: 115,
    contrast: 100,
    saturation: 110,
    hueRotation: 0,
    blur: 2,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  retro: {
    brightness: 100,
    contrast: 120,
    saturation: 80,
    hueRotation: 10,
    blur: 0,
    grayscale: 30,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },

  highContrast: {
    brightness: 100,
    contrast: 180,
    saturation: 100,
    hueRotation: 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  muted: {
    brightness: 100,
    contrast: 90,
    saturation: 50,
    hueRotation: 0,
    blur: 0,
    grayscale: 20,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },
};

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = capitalizedFirstLetter(name);

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    filters[name].value = event.target.value;
    applyFilters();
  });
  return div;
}

function createFilter() {
  Object.keys(filters).forEach((key) => {
    const filterElement = createFilterElement(
      key,
      filters[key].unit,
      filters[key].value,
      filters[key].min,
      filters[key].max,
    );
    filterContainer.appendChild(filterElement);
  });
}
createFilter();
imgInput.addEventListener("change", (event) => {
  file = event.target.files[0];
  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    image = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});

function applyFilters(name, value, unit) {
  if (!image) return;

  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  const filterString = Object.keys(filters)
    .map((key) => {
      let cssName = key;
      if (key === "hueRotation") cssName = "hue-rotate";
      if (key === "saturation") cssName = "saturate";

      return `${cssName}(${filters[key].value}${filters[key].unit})`;
    })
    .join(" ");

  canvasCtx.filter = filterString;
  canvasCtx.drawImage(image, 0, 0);
}

reset.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },

    saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hueRotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 200,
      unit: "px",
    },
    grayscale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };
  filterContainer.innerHTML = "";

  createFilter();
  canvasCtx.filter = "none";
  if (image) {
    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    canvasCtx.drawImage(image, 0, 0);
  }
});

download.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL(); // data to URL
  link.click();
});

Object.keys(presets).forEach((presetName) => {
  const presetsButton = document.createElement("button");

  presetsButton.classList.add("btn");
  presetsButton.innerText = capitalizedFirstLetter(presetName);

  presetsContainer.appendChild(presetsButton);

  presetsButton.addEventListener("click", () => {
    const preset = presets[presetName];
    console.log(preset);
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    applyFilters();
    filterContainer.innerHTML = "";
    createFilter();
  });
});

// Capitalized
function capitalizedFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}
