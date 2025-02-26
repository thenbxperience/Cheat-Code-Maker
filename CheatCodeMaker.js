/*:
 * @plugindesc Triggers a user-defined control switch when a user-defined button sequence is entered.
 * @author thenbexperience
 *
 * @param SwitchID
 * @text Switch ID
 * @type switch
 * @desc The ID of the switch to activate when the button sequence is entered.
 * @default 3
 *
 * @param ButtonSequence
 * @text Button Sequence
 * @type text
 * @desc A comma-separated list of key codes that must be entered in order (e.g., "38,38,40,40,37,39,37,39,88,90").
 * @default 38,38,40,40,37,39,37,39,88,90
 *
 * @help
 * This plugin allows the player to activate a specific switch when entering 
 * a user-defined button sequence using key codes instead of key names.
 * Players can use between 1 and 10 keys in a sequence.
 *
 * Key Code Reference:
 * ArrowUp = 38, ArrowDown = 40, ArrowLeft = 37, ArrowRight = 39
 * Z = 90, X = 88, Enter = 13, Space = 32, Shift = 16, Ctrl = 17
 */

(function () {
    const parameters = PluginManager.parameters('CheatCodeMaker');
    const switchId = Number(parameters['SwitchID']) || 3; // Default to Switch 3
    const buttonSequence = parameters['ButtonSequence'].split(',').map(num => Number(num.trim()));

    if (buttonSequence.length < 1 || buttonSequence.length > 10) {
        console.error('Button sequence must be between 1 and 10 keys.');
        return;
    }

    let inputSequence = [];

    const checkButtonSequence = () => {
        console.log('Current input sequence:', inputSequence.join(','));
        console.log('Expected sequence:', buttonSequence.join(','));
        if (inputSequence.length === buttonSequence.length) {
            if (inputSequence.every((key, index) => key === buttonSequence[index])) {
                $gameSwitches.setValue(switchId, true);
                console.log('Button sequence entered! Switch ' + switchId + ' is now ON.');
                inputSequence = []; // Reset the input sequence
            }
        }
    };

    const inputHandler = (event) => {
        const keyCode = event.keyCode;
        console.log('Key pressed:', keyCode);
        inputSequence.push(keyCode);
        if (inputSequence.length > buttonSequence.length) {
            inputSequence.shift(); // Keep only the last N inputs
        }
        checkButtonSequence();
    };

    // Add the event listener for keydown
    document.addEventListener('keydown', inputHandler);
})();
