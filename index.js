const characters = document.getElementById("characters")
const addCharForm = document.getElementById("add-char-form")

addCharForm.addEventListener("submit", function(e) {
    e.preventDefault()
    addNewCharacter()
    console.log("submitted")
})

function addNewCharacter(newChar) {
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