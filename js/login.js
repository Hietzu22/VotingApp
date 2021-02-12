const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const msg = urlParams.get('msg');
const type = urlParams.get('type');

if (urlParams.has('msg') && urlParams.has('type')) {
    const msg = urlParams.get('msg');
    const type = urlParams.get('type');

    showMessage(type, msg);
}

document.forms['login'].addEventListener('submit', loginUser);

function loginUser(event) {
    event.preventDefault();
    const Username = document.forms['login']['Username'].value;
    const Password = document.forms['login']['Password'].value;

    if (Username.length <= 0) {
        showMessage('error','Username Required!');
        return;
    }

    if (Password.length < 3) {
        showMessage('error','Password must be at least 3 characters long!');
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty('success')) {
            window.location.href = "index.php?type=success&msg=Welcome";
            return;
        } else {
            showMessage('error', 'Login failed!');
        }
    }
    ajax.open("POST", "backend/loginUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("Username="+Username+"&Password="+Password);
}