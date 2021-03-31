const pollQueryString = window.location.search;
console.log(pollQueryString);

const pollParams = new URLSearchParams(pollQueryString);

if(pollParams.has('id')) {
    getPollData(pollParams.get('id'));
}

const colors = [
    'rgba(255, 0, 0, 0.5)',
    'rgba(0, 255, 0, 0.5)',
    'rgba(0, 0, 255, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(0, 255, 255, 0.5)',
    'rgba(255, 0, 255, 0.5)',
    'rgba(255, 125, 0, 0.5)',
    'rgba(125, 255, 0, 0.5)',
    'rgba(125, 0, 255, 0.5)',
    'rgba(255, 125, 125, 0.5)',
    'rgba(125, 255, 125, 0.5)',
    'rgba(125, 125, 255, 0.5)',
    'rgba(255, 255, 125, 0.5)',
    'rgba(125, 255, 255, 0.5)',
    'rgba(255, 125, 255, 0.5)',
];

const borderColors = [
    'rgba(0, 0, 0, 1)'
]

function getPollData(id) {
    console.log(id);
    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        data = JSON.parse(this.responseText);
        console.log(data);
        showResults(data);
    }
    ajax.open("GET", "backend/getPoll.php?id=" + id);
    ajax.send();
}

function showResults() {
    document.querySelector('h1').innerHTML = data.topic;

    const ul = document.getElementById('optionsUl');

    let pollData = {
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColors: [],
            borderWidth: 1
        }],
        labels: []
    };

    let index = 0;
    data.options.forEach(function(option) {

        pollData.labels.push(option.name);
        pollData.datasets[0].data.push(option.votes);
        pollData.datasets[0].backgroundColor.push(colors[index++]);
        pollData.datasets[0].borderColors.push(borderColors[index]);

        const newLi = document.createElement('li');
        newLi.className = 'list-group-item';

        const newSpan = document.createElement('span');
        newSpan.className = 'badge badge-primary badge-pill float-right';
        const spanText = document.createTextNode(option.votes);

        const liText = document.createTextNode(option.name);

        newSpan.appendChild(spanText);
        newLi.appendChild(liText);
        newLi.appendChild(newSpan)
        ul.appendChild(newLi);
    });

    var ctx = document.getElementById('pollChart').getContext('2d');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: pollData
    });
}