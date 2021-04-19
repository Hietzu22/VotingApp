window.addEventListener('load', getPolls);
document.getElementById('votesUl').addEventListener('click', openPoll);

let data = null;

function getPolls() {
    console.log('Getting data');
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        showPolls();
    }
    ajax.open("GET", "backend/getPolls.php?show_all=true");
    ajax.send();
}

function showPolls(type = 'current') {
    const ul = document.getElementById("votesUl");
    ul.innerHTML = "";

    const now = new Date();

    data.forEach(poll => {

        let start = false;
        let end = false;

        if (poll.start != '0000-00-00 00:00:00') {
            start = new Date(poll.start);
        }

        if (poll.end != '0000-00-00 00:00:00') {
            end = new Date(poll.end);
        }

        if (type == 'current') {
            if ((start == false || start <= now) && (end == false || end >= now)) {
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.classList.add('list-group-item-action');
                newLi.dataset.voteid = poll.id;
            
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);

                const newResultBtn = document.createElement('button');
                newResultBtn.dataset.action = 'results';
                const resultsText = document.createTextNode('Show Results');
                newResultBtn.classList.add('btn');
                newResultBtn.classList.add('btn-primary');
                newResultBtn.classList.add('poll-btn');
                newResultBtn.appendChild(resultsText);

                newLi.appendChild(newResultBtn);
    
                ul.appendChild(newLi);
            }
        }
        
        if (type == 'old') {
            if ((end < now) && (end != false)) {
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.classList.add('list-group-item-action');
                newLi.dataset.voteid = poll.id;
            
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
    
                ul.appendChild(newLi);
            }
        }
        
        if (type == 'future') {
            if ((start > now) && (start != false)) {
                const newLi = document.createElement('li');
                newLi.classList.add('list-group-item');
                newLi.classList.add('list-group-item-action');
                newLi.dataset.voteid = poll.id;
            
                const liText = document.createTextNode(poll.topic);
                newLi.appendChild(liText);
    
                ul.appendChild(newLi);
            }
        }
    });
}

function openPoll(event) {
    console.log(event.target.dataset.voteid);
    const action = event.target.dataset.action;

    if (action == 'results') {
        let pollId = event.target.parentElement.dataset.voteid;
        showResults(pollId);
        return;
    }

    window.location.href = "vote.php?id=" + event.target.dataset.voteid;
}

function showResults(id) {
    window.location.href = "results.php?id="+id;
}