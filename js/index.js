window.addEventListener('load', getPolls);

function getPolls() {
    console.log('Getting data');
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        const data = JSON.parse(this.responseText);
        showPolls(data);
    }
    ajax.open("GET", "backend/getPolls.php");
    ajax.send();
}

function showPolls(data) {

    const ul = document.getElementById("votesUl");

    data.forEach(poll => {
        const newLi = document.createElement('li');
        newLi.classList.add('list-group-item');
        
        const liText = document.createTextNode(poll.topic);
        newLi.appendChild(liText);

        ul.appendChild(newLi);
    });
}