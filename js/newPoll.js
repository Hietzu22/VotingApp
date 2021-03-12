let optionCount = 2;

document.getElementById('addOption').addEventListener('click', addNewOption);
document.getElementById('deleteLastOption').addEventListener('click', deleteLastOption);
document.forms['newPoll'].addEventListener('submit', createNewPoll);

function createNewPoll(event) {
    event.preventDefault();

    const topic = document.forms['newPoll']['topic'].value;
    const start = document.forms['newPoll']['start'].value;
    const end = document.forms['newPoll']['end'].value;

    const options =[];

    const inputs = document.querySelectorAll('input');

    inputs.forEach(function (input) {
        if (input.name.indexOf('option') == 0) {
            options.push(input.value);
        }
    })

    if (topic.length <= 0 || options[0].length <= 0 || options[1] <= 0) {
        showMessage('error', 'Topic and at least 2 options required!');
        return;
    }

    let postData = ("topic="+topic+"&start="+start+"&end="+end);
    let i = 0;
    options.forEach(function(option) {
        postData += `&option${i++}=${option}`
    })

    console.log(postData);

    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty('success')) {
            window.location.href = "index.php?type=success&msg=Poll saved successfully!"
        } else {
            showMessage('error', data.error);
        }
    }
    ajax.open("POST", "backend/createNewPoll.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send(postData);

}

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

    const inputName = document.createAttribute('name');
    inputName.value = "option" + optionCount;
    input.setAttributeNode(inputName);

    const inputType = document.createAttribute('type');
    inputType.value = "text";
    input.setAttributeNode(inputType);

    input.classList.add('form-control');

    const inputPlaceholder = document.createAttribute('placeholder');
    inputPlaceholder.value = "Option " + optionCount;
    input.setAttributeNode(inputPlaceholder);

    div.appendChild(label)
    div.appendChild(input)

    document.querySelector('fieldset').appendChild(div)
    console.log(div);
}