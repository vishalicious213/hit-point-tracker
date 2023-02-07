const characters = document.getElementById("characters")
const addCharForm = document.getElementById("add-char-form")
const addNameBtn = document.getElementById("add-name")
const addCurHpBtn = document.getElementById("add-current-hp")
const addMaxHpBtn = document.getElementById("add-max-hp")

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
    console.log("submitted")
})

function addNewCharacter(newChar) {
    console.log(newChar)
    characters.innerHTML += `
        <div class="char">
            <h2 class="name">${newChar.name}</h2>
            <div class="health">
                <div><span class="current-hp">${newChar.curHp}</span> / <span class="total-hp">${newChar.maxHp}</span></div>
            </div>
            <div class="char-buttons">
                <button class="health-button add-button" type="button">+</button>
                <button class="health-button sub-button" type="button">-</button>
            </div>
        </div>
    `
}