function showMessage(type, msg) {
    let msgBox = document.getElementById("msg");

    if (type == 'success') {
        msgBox.classList.remove('alert-warning');
        msgBox.classList.remove('alert-danger');
        msgBox.classList.add('alert-success');
    } else if (type == 'error') {
        msgBox.classList.remove('alert-success');
        msgBox.classList.add('alert-danger');
    }

    msgBox.querySelector('p').innerHTML = msg;
    msgBox.classList.remove('d-none');
}