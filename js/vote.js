const pollQueryString = window.location.search;
console.log(pollQueryString);

const pollParams = new URLSearchParams(pollQueryString);

if(pollParams.has('id')) {
    getPollData(pollParams.get('id'));
}

document.getElementById('optionsUl').addEventListener('click', giveVote);

function getPollData(id) {
    console.log(id);
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
        showPoll(data);
    }
    ajax.open("GET", "backend/getPoll.php?id=" + id);
    ajax.send();
}

function showPoll(data) {
    document.querySelector('h1').innerHTML = data.topic;
    const ul = document.getElementById('optionsUl');

    data['options'].forEach(option => {
        const newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        newLi.classList.add('list-group-item-action');
        newLi.dataset.optionid = option.id;

        const liText = document.createTextNode(option.name);
        newLi.appendChild(liText);

ul.appendChild(newLi);
    });
}

function giveVote(event) {
    console.log(event.target.dataset.optionid);

    let id = event.target.dataset.optionid;

    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
    }
    ajax.open("GET", "backend/giveVote.php?id=" + id);
    ajax.send();
}