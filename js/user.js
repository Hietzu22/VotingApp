window.addEventListener('load', getOwnPolls);
document.getElementById('votesUl').addEventListener('click', openPoll);

let data = null;

function getOwnPolls() {
    console.log('Getting data');
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        showPolls();
    }
    ajax.open("GET", "backend/getPolls.php");
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
                createPollLi(ul, poll.id, poll.topic)
            }
        }
        
        if (type == 'old') {
            if ((end < now) && (end != false)) {
                createPollLi(ul, poll.id, poll.topic)
            }
        }
        
        if (type == 'future') {
            if ((start > now) && (start != false)) {
                createPollLi(ul, poll.id, poll.topic)
            }
        }
    });
}

function createPollLi(targetUl, pollId, pollTopic) {
    const newLi = document.createElement('li');
    newLi.classList.add('list-group-item');
    newLi.dataset.voteid = pollId;

    const newDeleteBtn = document.createElement('button');
    newDeleteBtn.dataset.action = 'delete';
    const deleteText = document.createTextNode('Delete poll');
    newDeleteBtn.appendChild(deleteText);

    const newEditBtn = document.createElement('button');
    newEditBtn.dataset.action = 'edit';
    const editText = document.createTextNode('Edit');
    newEditBtn.appendChild(editText);

    const liText = document.createTextNode(pollTopic);
    newLi.appendChild(liText);

    newLi.appendChild(newDeleteBtn);

    newLi.appendChild(newEditBtn);

    targetUl.appendChild(newLi);
}

function openPoll(event) {
    console.log(event.target.dataset.voteid);
    const action = event.target.dataset.action;

    if (action == 'delete') {
        let pollId = event.target.parentElement.dataset.voteid;
        deletePoll(pollId);
        return;
    }

    if (action == 'edit') {
        let pollId = event.target.parentElement.dataset.voteid;
        editPoll(pollId);
        return;
    }

    window.location.href = "vote.php?id=" + event.target.dataset.voteid;
}

function deletePoll(id) {
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
        let liToDelete = document.querySelector(`[data-voteid="${id}"]`);
        let parent = liToDelete.parentElement;
        parent.removeChild(liToDelete);
    }
    ajax.open("GET", "backend/deletePoll.php?id=" + id);
    ajax.send();
}

function editPoll(id) {
    alert('Edit ' + id)
}