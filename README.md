# Hit Point Tracker

This is a project I built so that I could work with array methods and manage data attributes more in-depth. It's a roster that monitors hit points for a group of characters. The user has the ability to add new characters to the roster. Once a character is added, the character's hit points can be incremented or decremented using buttons in the character card. This adjusts the hit point number and the health bar in the card.

The three buttons below the health bar allow a character's position to be moved to the right or left, if there's more than one character in the party and if the character isn't at the first or last positions, in which case they can't move further to the right or left, respectively.

Icons on the bottom-left of the screen allow character parties to be saved to localStorage (a name must be provided). These parties can later be loaded or deleted from localStorage. The modals that house the controls for these functions close other open modals, so that only one can be active at a time. They also prevent interactions with the interface below the modal's layer, so that the party can't be adjusted while a modal is open.

Deployed at: https://vish213-hp-tracker.netlify.app/

![](https://github.com/vishalicious213/hit-point-tracker/blob/main/img/hp-tracker.jpg)

## JavaScript concepts

- variables
- arrays
    - array indices
    - .filter()
    - .forEach()
    - .indexOf()
    - .length()
    - .push()
    - .splice()
- objects
- functions
- conditionals
    - if statements
    - if..else statements
- for loops
- NOT operator (!)
- AND operator (&&)
- string/template literals
- event listeners
    - addEventListener()
        - "click"
        - "submit"
        - "mouseover"
        - "mouseout"
    - preventDefault()
- document.getElementById()
- document.querySelector()
    - selecting via data attribute
- element.classList
    .add()
    .remove()
    .toggle()
- element.innerHTML
- element.target
- element.textContent
- element.value
    - .dataset
- localStorage
    - .getItem()
    - .setItem()
    - .key()
- JSON.parse()
- JSON.stringify()
- parseInt()
- return

## CSS concepts

- background styles
    - background-image: url()
    - background-repeat: no-repeat
    - background-size: cover
    - background-position: center
    - background-color: rgba values
- CSS Flexbox
    - display: flex
    - flex-wrap: wrap
    - justify-content: center
    - justify-content: space-between
    - align-items: center
    - align-items: baseline
    - flex-direction: column
- box-sizing: border-box
- display: none
- outline: none
- position: fixed
    - top
    - left
    - bottom
    - right
- text-align
- text-decoration
- text-shadow
- transition: .1s
- transform: scale()
- ::-webkit-outer-spin-button,
- ::-webkit-inner-spin-button
    - -webkit-appearance: none;


## HTML concepts

- importing the Font Awesome CDN
    - Font Awesome i-tags
- Semantic HTML
    - header
    - main
    - section
- element IDs
- element classes
- data attributes
- meters
    - value=""
    - min=""
    - max=""
- forms
    - labels
    - inputs
        - type="text"
        - type="number"
        - required
    - buttons
        - type="button"
        - type="submit"
- modals