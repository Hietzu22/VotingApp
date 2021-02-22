let optionCount = 2;

document.getElementById('addOption').addEventListener('click', addNewOption);
document.getElementById('deleteLastOption').addEventListener('click', deleteLastOption);

function deleteLastOption(event) {
    event.preventDefault();

    if (optionCount <= 2) {
        return;
    }

    const optionToDelete = document.querySelector('fieldset').lastElementChild;
    const parentElement = document.querySelector('fieldset');

    parentElement.removeChild(optionToDelete);

    optionCount--;
}

function addNewOption(event) {
    event.preventDefault();

    optionCount++;

    const div = document.createElement('div');
    div.classList.add('form-group');

    const label = document.createElement('label');
    const forAttribute = document.createAttribute('for');
    const labelText = document.createTextNode("Option " + optionCount);
    forAttribute.value = "option" + optionCount;
    label.setAttributeNode(forAttribute);
    label.appendChild(labelText);

    const input = document.createElement('input');

    input.classList.add('form-control');

    const inputType = document.createAttribute('type');
    inputType.value = "option3";
    input.setAttributeNode(inputType);

    const inputName = document.createAttribute('for');
    inputName.value = "option" + optionCount;
    input.setAttributeNode(inputName);

    const inputPlaceholder = document.createAttribute('placeholder');
    inputPlaceholder.value = "Option " + optionCount;
    input.setAttributeNode(inputPlaceholder);

    div.appendChild(label)
    div.appendChild(input)

    document.querySelector('fieldset').appendChild(div)
    console.log(div);
}