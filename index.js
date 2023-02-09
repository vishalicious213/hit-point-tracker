const characters = document.getElementById("characters")
const formToggle = document.getElementById("form-toggle")
const formContainer = document.getElementById("form-container")
const newCharForm = document.getElementById("add-char-form")
const newNameBtn = document.getElementById("add-name")
const newCurHpBtn = document.getElementById("add-current-hp")
const newMaxHpBtn = document.getElementById("add-max-hp")
const saveBtn = document.getElementById("save-btn")
const loadBtn = document.getElementById("load-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveInterface = document.getElementById("save-interface-modal")
const loadInterface = document.getElementById("load-interface-modal")
const deleteInterface = document.getElementById("delete-interface-modal")
const saveInput = document.getElementById("save-input")
const saveSubmitBtn = document.getElementById("save-submit-btn")
const roster = document.getElementById("roster")
const deleteRoster = document.getElementById("delete-roster")
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

// toggle #save-interface-modal
saveBtn.addEventListener("click", function() {
    saveCharacters()
})

// toggle #load-interface-modal
loadBtn.addEventListener("click", function() {
    loadCharacters()
})

// toggle #delete-interface-modal
deleteBtn.addEventListener("click", function() {
    deleteCharacters()
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

    if (curHp > maxHp) {
        curHp = maxHp
    }

    addToThisHp.textContent = curHp
    hpBar.value = curHp
}

// decrement a character's hit points
function handleSubHp(subhp) {
    const subFromThisHp = document.querySelector(`[data-curhp="${subhp}-curHp"]`)
    const hpBar = document.querySelector(`[data-hpBar="${subhp}"]`)
    let curHp = parseInt(subFromThisHp.textContent) - 1

    if (curHp < 0) {
        curHp = 0
    }

    subFromThisHp.textContent = curHp
    hpBar.value = curHp
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

// save character roster to localStorage
function saveCharacters() {
    saveInterface.classList.toggle("flex")

    saveSubmitBtn.addEventListener("click", function() {
        if (charactersArray.length > 0) {
            localStorage.setItem(`${saveInput.value}`, JSON.stringify(charactersArray))
            saveInterface.classList.toggle("flex")
        }
    })
}

// load character roster from localStorage
function loadCharacters() {
    loadInterface.classList.toggle("flex")
    roster.innerHTML = ""

    for (let i = 0; i < localStorage.length; i++) {
        let saved = localStorage.key(i)
        roster.innerHTML += `<div data-saved="${i}" class="roster-item">• ${saved}</div>`
    }

    // listen for clicks on roster items & render clicked roster
    loadInterface.addEventListener("click", function(e) {
        if (e.target.dataset.saved) {
            let rosterIndex = (e.target.dataset.saved)
            let loadedRoster = JSON.parse(localStorage.getItem(localStorage.key(rosterIndex)))
            charactersArray = loadedRoster
            renderCharacters(charactersArray)
        }
    })
}

// delete character roster from localStorage
function deleteCharacters() {
    deleteInterface.classList.toggle("flex")
    
    function renderRoster() {
        deleteRoster.innerHTML = ""
        for (let i = 0; i < localStorage.length; i++) {
            let saved = localStorage.key(i)
            deleteRoster.innerHTML += `<div data-delete="${saved}" class="roster-item">• ${saved}</div>`
        }
    }

    // listen for clicks on deleteRoster items & remove from localStorage
    deleteInterface.addEventListener("click", function(e) {
        if (e.target.dataset.delete) {
            let rosterName = (e.target.dataset.delete)
            localStorage.removeItem(`${rosterName}`)
            renderRoster()
        }
    })

    renderRoster()
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