const characters = document.getElementById("characters")
const addCharForm = document.getElementById("add-char-form")
const addNameBtn = document.getElementById("add-name")
const addHpBtn = document.getElementById("add-max-hp")

addCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    const newChar = {
        name: addNameBtn.value,
        maxHp: addHpBtn.value
    }
    addNewCharacter(newChar)
    console.log("submitted")
})

function addNewCharacter(newChar) {
    console.log(newChar)
    characters.innerHTML += `
    <div class="char">
        <h2 class="name">Character name</h2>
        <div class="health">
            <div><span class="current-hp">100</span> / <span class="total-hp">100</span></div>
        </div>
        <div class="char-buttons">
            <button class="health-button add-button" type="button">+</button>
            <button class="health-button sub-button" type="button">-</button>
        </div>
    </div>
    `
}