# Hit Point Tracker

This is a project I built so that I could work with array methods and manage data attributes more in-depth. It's a roster that monitors hit points for a group of characters. The user has the ability to add new characters to the roster. Once a character is added, the character's hit points can be incremented or decremented using buttons in the character card. This adjusts the hit point number and the health bar in the card.

The three buttons below the health bar allow a character's position to be moved to the right or left, if there's more than one character in the party and if the character isn't at the first or last positions, in which case they can't move further to the right or left, respectively.

Icons on the bottom-left of the screen allow character parties to be saved to localStorage (a name must be provided). These parties can later be loaded or deleted from localStorage. The modals that house the controls for these functions close other open modals, so that only one can be active at a time. They also prevent interactions with the interface below the modal's layer, so that the party can't be adjusted while a modal is open.