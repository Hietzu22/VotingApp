document.forms['Register'].addEventListener('submit', registerNewUser);

function registerNewUser(event) {

    event.preventDefault();

    const Username = document.forms['Register']['Username'].value;
    const Password = document.forms['Register']['Password'].value;
    const CPassword = document.forms['Register']['CPassword'].value;

    if (Username.length <= 0) {
        alert('Username Required!');
        return;
    }

    if (Password.length < 3) {
        alert('Password must be at least 3 characters long!');
        return;
    }

    if (Password.localeCompare(CPassword) != 0) {
        alert('Password not matching!');
        return;
    }

}