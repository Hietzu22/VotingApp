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
        console.log(data);
        if (data.hasOwnProperty('success')) {
            window.location.href = "index.php?type=success&msg=Welcome";
            return;
        } else {
            showMessage('error', data.error);
        }
    }
    ajax.open("POST", "backend/loginUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("Username="+Username+"&Password="+Password);
}