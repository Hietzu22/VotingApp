document.forms['Register'].addEventListener('submit', registerNewUser);

function registerNewUser(event) {

    event.preventDefault();

    const Username = document.forms['register']['Username'].value;
    const Password = document.forms['register']['Password'].value;
    const CPassword = document.forms['register']['CPassword'].value;

    if (Username.length <= 0) {
        showMessage('error','Username Required!');
        return;
    }

    if (Password.length < 3) {
        showMessage('error','Password must be at least 3 characters long!');
        return;
    }

    if (Password.localeCompare(CPassword) != 0) {
        showMessage('error','Password not matching!');
        return;
    }

    let ajax = new XMLHttpRequest();
    ajax.onload = function() {
        const data = JSON.parse(this.responseText);
        if (data.hasOwnProperty('success')) {
            alert('Succesfully registered!');
            window.open("login.php?type=success&msg=Succesfully registered! You can now login with your new account details!");
        } else {
            showMessage('error', data.error);
        }
    }
    ajax.open("POST", "backend/registerNewUser.php", true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.send("Username="+Username+"&Password="+Password);

}