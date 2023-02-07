const characters = document.getElementById("characters")
const newCharForm = document.getElementById("add-char-form")
const newNameBtn = document.getElementById("add-name")
const newCurHpBtn = document.getElementById("add-current-hp")
const newMaxHpBtn = document.getElementById("add-max-hp")

// ⬇️ USER INTERFACE ⬇️

// render a new character to the roster
newCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newChar = {
        name: newNameBtn.value,
        curHp: newCurHpBtn.value,
        maxHp: newMaxHpBtn.value
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

function handleAddHp(addhp) {
    // console.log("Add HP", addhp)
    const addToThisHp = document.querySelector(`[data-curhp="${addhp}-curHp"]`)
    const maxHp = parseInt(document.querySelector(`[data-maxhp="${addhp}-maxHp"]`).textContent)
    // console.log(addToThisHp.textContent)
    console.log(maxHp)
    let curHp = parseInt(addToThisHp.textContent) + 1
    if (curHp > maxHp) {
        curHp = maxHp
    }
    addToThisHp.textContent = curHp
}

function handleSubHp(subhp) {
    // console.log("Sub HP")
    const subFromThisHp = document.querySelector(`[data-curhp="${subhp}-curHp"]`)
    // console.log(subFromThisHp.textContent)
    const curHp = parseInt(subFromThisHp.textContent) - 1
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

