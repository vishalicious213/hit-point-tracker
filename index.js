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

// listen for hovering on the + - and 'remove' buttons
document.addEventListener("mouseover", function(e) {
    if (e.target.dataset.addhp) {
        handleHover(e.target.dataset.addhp)
    } else if (e.target.dataset.subhp) {
        handleHover(e.target.dataset.subhp)
    } else if (e.target.dataset.remove) {
        handleHover(e.target.dataset.remove)
    }
})

// ⬇️ EVENT HANDLERS ⬇️

// increment a character's hit points
function handleAddHp(addhp) {
    const addToThisHp = document.querySelector(`[data-curhp="${addhp}-curHp"]`)
    const maxHp = parseInt(document.querySelector(`[data-maxhp="${addhp}-maxHp"]`).textContent)
    let curHp = parseInt(addToThisHp.textContent) + 1

    if (curHp > maxHp) {
        curHp = maxHp
    }

    addToThisHp.textContent = curHp
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

// highlight the character's border
function handleHover(char) {
    const addHover = document.querySelector(`[data-name="${char}"]`)
    addHover.classList.add("char-hover")
}

// ⬇️ RENDER THE APP ⬇️

function renderCharacters(newChars) {
    characters.innerHTML = ""

    newChars.forEach(function(char) {
        characters.innerHTML += `
            <div data-name="${char.name}" class="char">
                <h2 class="name">${char.name}</h2>
                <div class="health">
                    <div>
                        <span data-curhp="${char.name}-curHp" class="current-hp">${char.curHp}</span> / 
                        <span data-maxhp="${char.name}-maxHp" class="total-hp">${char.maxHp}</span>
                    </div>
                </div>
                <div class="char-buttons">
                    <button data-subhp="${char.name}" class="health-button sub-button" type="button">-</button>
                    <button data-addhp="${char.name}" class="health-button add-button" type="button">+</button>
                </div>
                <button data-remove="${char.name}" class="remove" type="button">remove</button>
            </div>
        `
    })

}

