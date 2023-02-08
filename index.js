const characters = document.getElementById("characters")
const formToggle = document.getElementById("form-toggle")
const formContainer = document.getElementById("form-container")
const newCharForm = document.getElementById("add-char-form")
const newNameBtn = document.getElementById("add-name")
const newCurHpBtn = document.getElementById("add-current-hp")
const newMaxHpBtn = document.getElementById("add-max-hp")
let charactersArray = []

// ⬇️ USER INTERFACE ⬇️

formToggle.addEventListener("click", function() {
    formContainer.classList.toggle("flex")

    if (formToggle.textContent === "Show controls") {
        formToggle.textContent = "Hide controls"
    } else {
        formToggle.textContent = "Show controls"
    }
})

// render a new character to the roster
newCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newChar = {
        name: newNameBtn.value,
        curHp: parseInt(newCurHpBtn.value),
        maxHp: parseInt(newMaxHpBtn.value)
    }

    // hit points can't be less than 0
    if (newChar.curHp < 0) {
        newChar.curHp = 0
    }

    // hit points can't be higher than max hp
    if (newChar.curHp > newChar.maxHp) {
        newChar.curHp = newChar.maxHp
    }

    charactersArray.push(newChar)
    renderCharacters(charactersArray)
    newNameBtn.value = ""
    newCurHpBtn.value = ""
    newMaxHpBtn.value = ""
})

// listen for clicks on the + - and 'remove' buttons
document.addEventListener("click", function(e) {
    if (e.target.dataset.addhp) {
        handleAddHp(e.target.dataset.addhp)
    } else if (e.target.dataset.subhp) {
        handleSubHp(e.target.dataset.subhp)
    } else if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    }
})

// listen for hovering on the character card & buttons
document.addEventListener("mouseover", function(e) {
    if (e.target.dataset.charcontainer) {
        handleHover(e.target.dataset.charcontainer, "div")
    } else if (e.target.dataset.chardiv) {
        handleHover(e.target.dataset.chardiv, "div")
    } else if (e.target.dataset.addhp) {
        handleHover(e.target.dataset.addhp, "add")
    } else if (e.target.dataset.subhp) {
        handleHover(e.target.dataset.subhp, "sub")
    } else if (e.target.dataset.remove) {
        handleHover(e.target.dataset.remove, "rem")
    }
})

// listen for hovering to stop on the character card & buttons
document.addEventListener("mouseout", function(e) {
    if (e.target.dataset.charcontainer) {
        handleHoverExit(e.target.dataset.charcontainer, "div")
    } else if (e.target.dataset.addhp) {
        handleHoverExit(e.target.dataset.addhp, "add")
    } else if (e.target.dataset.subhp) {
        handleHoverExit(e.target.dataset.subhp, "sub")
    } else if (e.target.dataset.remove) {
        handleHoverExit(e.target.dataset.remove, "rem")
    }
})

// ⬇️ EVENT HANDLERS ⬇️

// increment a character's hit points
function handleAddHp(addhp) {
    const addToThisHp = document.querySelector(`[data-curhp="${addhp}-curHp"]`)
    const hpBar = document.querySelector(`[data-hpBar="${addhp}"]`)
    const maxHp = parseInt(document.querySelector(`[data-maxhp="${addhp}-maxHp"]`).textContent)
    let curHp = parseInt(addToThisHp.textContent) + 1
    console.log(hpBar)

    if (curHp > maxHp) {
        curHp = maxHp
    }

    addToThisHp.textContent = curHp
    hpBar.value = curHp
}

// decrement a character's hit points
function handleSubHp(subhp) {
    const subFromThisHp = document.querySelector(`[data-curhp="${subhp}-curHp"]`)
    let curHp = parseInt(subFromThisHp.textContent) - 1

    if (curHp < 0) {
        curHp = 0
    }

    subFromThisHp.textContent = curHp
}

// remove character from roster
function handleRemove(char) {
    const charToRemove = charactersArray.filter(function(ch) {
        return ch.name === char
    })[0]

    const removalIndex = charactersArray.indexOf(charToRemove)
    charactersArray.splice(removalIndex, 1)
    renderCharacters(charactersArray)
}

// highlight the character's border on mouseover
function handleHover(char, buttonType) {
    const charDiv = document.querySelector(`[data-chardiv="${char}"]`)

    if (buttonType === "div") {
        charDiv.classList.add("char-hover")
    } else if (buttonType === "add") {
        charDiv.classList.add("add-hover")
    } else if (buttonType === "sub") {
        charDiv.classList.add("sub-hover")
    } else if (buttonType === "rem") {
        charDiv.classList.add("rem-hover")
    }
}

// stop highlighting the character's border on mouseout
function handleHoverExit(char, buttonType) {
    const charDiv = document.querySelector(`[data-chardiv="${char}"]`)

    if (buttonType === "div") {
        charDiv.classList.remove("char-hover")
    } else if (buttonType === "add") {
        charDiv.classList.remove("add-hover")
        charDiv.classList.add("char-hover")
    } else if (buttonType === "sub") {
        charDiv.classList.remove("sub-hover")
        charDiv.classList.add("char-hover")
    } else if (buttonType === "rem") {
        charDiv.classList.remove("rem-hover")
        charDiv.classList.add("char-hover")
    }
}

// ⬇️ RENDER THE APP ⬇️

// render the characters!
function renderCharacters(newChars) {
    characters.innerHTML = ""

    newChars.forEach(function(char) {
        characters.innerHTML += `
            <div data-charcontainer="${char.name}" class="char-container">
                <div data-chardiv="${char.name}" class="char">
                    <h2 data-name="${char.name}" class="name">${char.name}</h2>
                    <div class="health">
                        <div>
                            <span data-curhp="${char.name}-curHp" class="current-hp">${char.curHp}</span> / 
                            <span data-maxhp="${char.name}-maxHp" class="total-hp">${char.maxHp}</span>
                        </div>
                        <meter data-hpbar="${char.name}" class="hp-bar" value="${char.curHp}" min="0" max="${char.maxHp}"></meter>
                    </div>
                    <div class="char-buttons">
                        <button data-subhp="${char.name}" class="health-button sub-button" type="button">-</button>
                        <button data-addhp="${char.name}" class="health-button add-button" type="button">+</button>
                    </div>
                    <button data-remove="${char.name}" class="remove" type="button">remove</button>
                </div>
            </div>
        `
        adjustNameLength(char.name)
    })
}

// if the name is long, reduce font so it fits better
function adjustNameLength(charName) {
    if (charName.length > 12) {
        const nameToShrink = document.querySelector(`[data-name="${charName}"]`)
        nameToShrink.classList.add("name-smaller")
    }
}