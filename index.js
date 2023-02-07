const characters = document.getElementById("characters")
const formToggle = document.getElementById("form-toggle")
const formContainer = document.getElementById("form-container")
const newCharForm = document.getElementById("add-char-form")
const newNameBtn = document.getElementById("add-name")
const newCurHpBtn = document.getElementById("add-current-hp")
const newMaxHpBtn = document.getElementById("add-max-hp")

// ⬇️ USER INTERFACE ⬇️

formToggle.addEventListener("click", function() {
    // formContainer.style.display = "flex"
    formContainer.classList.toggle("flex")
})

// render a new character to the roster
newCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newChar = {
        name: newNameBtn.value,
        curHp: newCurHpBtn.value,
        maxHp: newMaxHpBtn.value
    }

    // hit points can't be less than 0
    if (newChar.curHp < 0) {
        newChar.curHp = 0
    }

    // hit points can't be higher than max hp
    if (newChar.curHp > newChar.maxHp) {
        newChar.curHp = newChar.maxHp
    }

    addNewCharacter(newChar)
    newNameBtn.value = ""
    newCurHpBtn.value = ""
    newMaxHpBtn.value = ""
})

// listen for clicks on + and - buttons, per character
document.addEventListener("click", function(e) {
    console.log(e.target.dataset)

    if (e.target.dataset.addhp) {
        handleAddHp(e.target.dataset.addhp)
    } else if (e.target.dataset.subhp) {
        handleSubHp(e.target.dataset.subhp)
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

// ⬇️ RENDER THE APP ⬇️

function addNewCharacter(newChar) {
    characters.innerHTML += `
        <div class="char">
            <h2 class="name">${newChar.name}</h2>
            <div class="health">
                <div>
                    <span data-curhp="${newChar.name}-curHp" class="current-hp">${newChar.curHp}</span> / 
                    <span data-maxhp="${newChar.name}-maxHp" class="total-hp">${newChar.maxHp}</span>
                </div>
            </div>
            <div class="char-buttons">
                <button data-addhp="${newChar.name}" class="health-button add-button" type="button">+</button>
                <button data-subhp="${newChar.name}" class="health-button sub-button" type="button">-</button>
            </div>
        </div>
    `
}

