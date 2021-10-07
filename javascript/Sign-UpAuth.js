function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function registerNewUser() {
    // e.preventDefault();
    let fullName = document.querySelector("#Full_Name")
    let nameError = document.querySelector(".nameError")
    let email_Address = document.querySelector("#Email_Address")
    let emailError = document.querySelector(".EmailError")
    let password = document.querySelector("#psw")
    let passwordError = document.querySelector(".passwordError")
    let passwordConfirm = document.querySelector("#psw_confirm")
    let confirmPasswordError = document.querySelector(".confirmPasswordError")

    // Resetting all error messages
    nameError.innerText = '';
    emailError.innerText = '';
    passwordError.innerText = '';
    confirmPasswordError.innerText = '';

    let userDataBase = JSON.parse(localStorage.getItem("database"));
    var emailCheck;
    if (userDataBase !== null) {
        userDataBase.forEach(obj => {
            if (email_Address.value == obj.email) {
                emailCheck = "true";
            }
        })
    };

    if (fullName.value == '') {
        nameError.innerText = "Please enter your name";
    } else if (email_Address.value == "" || !validateEmail(email_Address.value)) {
        emailError.innerText = "Please enter a valid Email address";
    } else if (emailCheck == "true") {
        emailError.innerText = "Email already exists";

    } else if (password.value == '' || (password.value).length < 8 || (password.value).length > 12) {
        passwordError.innerText = "Please enter a password between 8 and 12 characters";
    } else if (passwordConfirm.value !== password.value) {
        confirmPasswordError.innerText = "Password does not match!!";
    } else {
        let userDataBase = JSON.parse(localStorage.getItem("database"));

        if (userDataBase === null) {
            userDataBase = [];
        }
        let user = {
            fullName: fullName.value,
            email: email_Address.value,
            password: password.value,
            confirmPassword: passwordConfirm.value
        };

        userDataBase.push(user);
        localStorage.setItem("database", JSON.stringify(userDataBase));
        window.location.assign("login.html"); // Async Function



    };

}