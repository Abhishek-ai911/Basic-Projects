let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },

    saturation: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    hueRotation: {
        value: 0,
        min: 0,
        max: 360,
        unit: "deg"
    },
    blur: {
        value: 0,
        min: 0,
        max: 20,
        unit: "px"
    },
    grayscale: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    sepia: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
    opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    },
    invert: {
        value: 0,
        min: 0,
        max: 100,
        unit: "%"
    },
}

const imageCanvas = document.getElementById("image-canvas")
const imageInput = document.getElementById("image-input")
const canvasCtx = imageCanvas.getContext("2d")
const resetButton = document.querySelector("#reset-btn")
const downloadButton = document.querySelector("#download-btn")
const presetsContainer = document.querySelector(".presets")
let file = null
let img = null

const filtersContainer = document.querySelector(".filters")

function createfilterElement(name, unit = "%", value, min, max) {

    const div = document.createElement("div")
    div.classList.add("filter")


    const input = document.createElement("input")
    input.type = "range"
    input.min = min
    input.max = max
    input.value = value
    input.id = name

    const p = document.createElement("p")
    p.innerText = name

    div.appendChild(p)
    div.appendChild(input)

    input.addEventListener("input", (event) => {
        filters[name].value = input.value
        applyFilters()
    })

    return div
}

function createFilters() {

    Object.keys(filters).forEach(key => {
        const filterElement = createfilterElement(key, filters[key].unit, filters[key].value, filters[key].min, filters[key].max)

        filtersContainer.appendChild(filterElement)
    })

}

createFilters()

imageInput.addEventListener("change", (e) => {
    const file = e.target.files[0]
    const imagePlaceholder = document.querySelector(".placeholder")
    imageCanvas.style.display = "block"
    imagePlaceholder.style.display = "none"

    img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {


        imageCanvas.width = img.width
        imageCanvas.height = img.height
        canvasCtx.drawImage(img, 0, 0)
    }
})

function applyFilters() {

    canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height)
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    saturate(${filters.saturation.value}${filters.saturation.unit})
    hue-rotate(${filters.hueRotation.value}${filters.hueRotation.unit})
    blur(${filters.blur.value}${filters.blur.unit})
    grayscale(${filters.grayscale.value}${filters.grayscale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
`.trim()
    canvasCtx.drawImage(img, 0, 0)
}

resetButton.addEventListener("click", () => {
    filters = {
        brightness: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        contrast: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },

        saturation: {
            value: 100,
            min: 0,
            max: 200,
            unit: "%"
        },
        hueRotation: {
            value: 0,
            min: 0,
            max: 360,
            unit: "deg"
        },
        blur: {
            value: 0,
            min: 0,
            max: 20,
            unit: "px"
        },
        grayscale: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        sepia: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
        opacity: {
            value: 100,
            min: 0,
            max: 100,
            unit: "%"
        },
        invert: {
            value: 0,
            min: 0,
            max: 100,
            unit: "%"
        },
    }
    filtersContainer.innerHTML = ""
    createFilters()
    applyFilters()



})

downloadButton.addEventListener("click", () => {
    const link = document.createElement("a")
    link.download = "edited-image.png"
    link.href = imageCanvas.toDataURL()
    link.click()
})

const presets = {
    drama: {
        brightness: 90,
        contrast: 150,
        saturation: 120,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    vintage: {
        brightness: 110,
        contrast: 85,
        saturation: 75,
        hueRotation: 15,
        blur: 0,
        grayscale: 0,
        sepia: 40,
        opacity: 100,
        invert: 0
    },
    oldSchool: {
        brightness: 100,
        contrast: 100,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    faded: {
        brightness: 120,
        contrast: 70,
        saturation: 60,
        hueRotation: 0,
        blur: 0,
        grayscale: 10,
        sepia: 20,
        opacity: 90,
        invert: 0
    },
    cold: {
        brightness: 100,
        contrast: 110,
        saturation: 90,
        hueRotation: 190,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    warm: {
        brightness: 110,
        contrast: 105,
        saturation: 130,
        hueRotation: 340,
        blur: 0,
        grayscale: 0,
        sepia: 20,
        opacity: 100,
        invert: 0
    },
    nightmare: {
        brightness: 80,
        contrast: 150,
        saturation: 50,
        hueRotation: 180,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 80
    },
    clarendon: {
        brightness: 110,
        contrast: 130,
        saturation: 140,
        hueRotation: 0,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    gingham: {
        brightness: 115,
        contrast: 85,
        saturation: 80,
        hueRotation: 350,
        blur: 0,
        grayscale: 5,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    lark: {
        brightness: 120,
        contrast: 90,
        saturation: 110,
        hueRotation: 5,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    reyes: {
        brightness: 130,
        contrast: 75,
        saturation: 60,
        hueRotation: 10,
        blur: 0,
        grayscale: 0,
        sepia: 30,
        opacity: 100,
        invert: 0
    },
    juno: {
        brightness: 105,
        contrast: 115,
        saturation: 150,
        hueRotation: 355,
        blur: 0,
        grayscale: 0,
        sepia: 10,
        opacity: 100,
        invert: 0
    },
    moon: {
        brightness: 110,
        contrast: 120,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 10,
        opacity: 100,
        invert: 0
    },

    // Snapchat inspired
    snapBW: {
        brightness: 105,
        contrast: 130,
        saturation: 0,
        hueRotation: 0,
        blur: 0,
        grayscale: 100,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    snapWarm: {
        brightness: 115,
        contrast: 110,
        saturation: 140,
        hueRotation: 345,
        blur: 0,
        grayscale: 0,
        sepia: 25,
        opacity: 100,
        invert: 0
    },
    snapCool: {
        brightness: 105,
        contrast: 115,
        saturation: 110,
        hueRotation: 200,
        blur: 0,
        grayscale: 0,
        sepia: 0,
        opacity: 100,
        invert: 0
    },
    snapFade: {
        brightness: 125,
        contrast: 70,
        saturation: 70,
        hueRotation: 0,
        blur: 0,
        grayscale: 15,
        sepia: 15,
        opacity: 90,
        invert: 0
    }
}

Object.keys(presets).forEach(presetName => {
    const presetButton = document.createElement("button")
    presetButton.classList.add("btn")
    presetButton.innerHTML = presetName
    presetsContainer.appendChild(presetButton)

    presetButton.addEventListener('click', () => {
        const preset = presets[presetName]

        Object.keys(preset).forEach(filterName => {
            filters[filterName].value = preset[filterName]
        })

        applyFilters()
        filtersContainer.innerHTML = ""
        createFilters()
    })
})