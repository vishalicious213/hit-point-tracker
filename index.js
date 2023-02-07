const characters = document.getElementById("characters")
const addCharForm = document.getElementById("add-char-form")
const addNameBtn = document.getElementById("add-name")
const addCurHpBtn = document.getElementById("add-current-hp")
const addMaxHpBtn = document.getElementById("add-max-hp")

// ⬇️ USER INTERFACE ⬇️

addCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newChar = {
        name: addNameBtn.value,
        curHp: addCurHpBtn.value,
        maxHp: addMaxHpBtn.value
    }

    addNewCharacter(newChar)
    addNameBtn.value = ""
    addCurHpBtn.value = ""
    addMaxHpBtn.value = ""
})

document.addEventListener("click", function(e) {
    console.log(e.target.dataset)

    if (e.target.dataset.addhp) {
        handleAddHp()
    } else if (e.target.dataset.subhp) {
        handleSubHp()
    }
})

// ⬇️ EVENT HANDLERS ⬇️
function handleAddHp() {
    console.log("Add HP")
}

function handleSubHp() {
    console.log("Sub HP")
}

// ⬇️ RENDER THE APP ⬇️

function addNewCharacter(newChar) {
    characters.innerHTML += `
        <div class="char">
            <h2 class="name">${newChar.name}</h2>
            <div class="health">
                <div>
                    <span id="${newChar.name}-curHp" class="current-hp">${newChar.curHp}</span> / 
                    <span id="${newChar.name}-maxHp" class="total-hp">${newChar.maxHp}</span>
                </div>
            </div>
            <div class="char-buttons">
                <button data-addhp="${newChar.name}" class="health-button add-button" type="button">+</button>
                <button data-subhp="${newChar.name}" class="health-button sub-button" type="button">-</button>
            </div>
        </div>
    `
}

