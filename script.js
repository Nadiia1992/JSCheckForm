function btnClick() {
    document.getElementById("firstnameError").innerHTML = "";
    document.getElementById("lastnameError").innerHTML = "";
    document.getElementById("birthdayYearError").innerHTML = "";
    document.getElementById("genderError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("skypeError").innerHTML = "";

    if (
        form1.firstname.value == "" || form1.lastname.value == ""
        || form1.birthdayYear.value == ""
    ) {
        alert("Будь ласка, заповніть усі поля!");
        return;
    }

    let firstname = form1.firstname.value.trim();
    let lastname = form1.lastname.value.trim();
    let birthdayYear = form1.birthdayYear.value.trim();
    let gender = form1.gender.value;
    let phone = form1.phone.value.trim();
    let skype = form1.skype.value.trim();

    let nameReg = /^[A-ZА-ЯІЇЄҐ][a-zа-яіїєґ]{1,19}$/;
    let yearReg = /^\d{4}$/;
    let phoneReg = /^[0-9 ()-]+$/;
    let skypeReg = /^[A-Za-zА-Яа-яІіЇїЄєҐґ0-9.-]+$/;

    let hasError = false;

    if (!nameReg.test(firstname)) {
        document.getElementById("firstnameError").innerHTML =
            "Ім'я повинно починатися з великої літери та містити лише літери (2-20 символів).";
        hasError = true;
    }
    if (!nameReg.test(lastname)) {
        document.getElementById("lastnameError").innerHTML =
            "Прізвище повинно починатися з великої літери та містити лише літери (2-20 символів).";
        hasError = true;
    }

    let year = Number(birthdayYear);
    let currentYear = new Date().getFullYear();

    if (!yearReg.test(birthdayYear) || year < 1900 || year > currentYear) {
        document.getElementById("birthdayYearError").innerHTML =
            "Введіть рік від 1900 до " + currentYear + "!";
        hasError = true;
    }

    if (phone !== "" && !phoneReg.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Телефон може містити лише цифри, пробіли, дужки та дефіси.";
        hasError = true;
    }

    if (skype !== "" && !skypeReg.test(skype)) {
        document.getElementById("skypeError").innerHTML =
            "Skype може містити лише літери, цифри, крапки та дефіси.";
        hasError = true;
    }
    if (hasError) {
        return;
    }

    localStorage.setItem("firstname", form1.firstname.value);
    localStorage.setItem("lastname", form1.lastname.value);
    localStorage.setItem("birthdayYear", form1.birthdayYear.value);
    localStorage.setItem("gender", form1.gender.value);
    localStorage.setItem("phone", form1.phone.value);
    localStorage.setItem("skype", form1.skype.value);
    alert("Дані збережено!");
}

function docLoad() {
    if (localStorage.getItem("email") !== null) {
        window.location.href = "form1.html";
    }
}

function loadForm() {
    if (localStorage.getItem("email") === null) {
        window.location.href = "form2.html";
        return;
    }

    document.getElementById("firstname").value = localStorage.getItem("firstname") || "";
    document.getElementById("lastname").value = localStorage.getItem("lastname") || "";
    document.getElementById("birthdayYear").value = localStorage.getItem("birthdayYear") || "";
    document.getElementById("gender").value = localStorage.getItem("gender") || "male";
    document.getElementById("phone").value = localStorage.getItem("phone") || "";
    document.getElementById("skype").value = localStorage.getItem("skype") || "";
}

function delData() {
    localStorage.removeItem("firstname");
    localStorage.removeItem("lastname");
    localStorage.removeItem("birthdayYear");
    localStorage.removeItem("gender");
    localStorage.removeItem("phone");
    localStorage.removeItem("skype");

    localStorage.removeItem("email");
    localStorage.removeItem("password");

    window.location.href = "form2.html";

    alert("Дані успішно видалено!");
}

function showInfo() {
    if (localStorage.getItem("email") === null) {
        window.location.href = "form2.html";
        return;
    }

    let firstname = localStorage.getItem("firstname") || "";
    let lastname = localStorage.getItem("lastname") || "";
    let birthdayYear = localStorage.getItem("birthdayYear") || "";
    let gender = localStorage.getItem("gender") || "";
    let phone = localStorage.getItem("phone") || "";
    let skype = localStorage.getItem("skype") || "";

    document.getElementById("info").innerHTML =
        "Ім'я: " + firstname + "<br>" +
        "Прізвище: " + lastname + "<br>" +
        "Рік народження: " + birthdayYear + "<br>" +
        "Стать: " + (gender == "male" ? "Чоловіча" : "Жіноча") + "<br>" +
        "Телефон: " + phone + "<br>" +
        "Skype: " + skype;
}

function register(event) {
    event.preventDefault();

    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("repeatPasswordError").textContent = "";

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let repeatPassword = document.getElementById("repeatPassword").value;

    let hasError = false;

    let emailReg = /^[A-Za-z._-]{3,}@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
    let passwordReg = /^(?=.*[a-zа-яіїєґ])(?=.*[A-ZА-ЯІЇЄҐ])(?=.*\d).{6,}$/;

    if (email === "") {
        document.getElementById("emailError").textContent =
            "Введіть Email!";
        hasError = true;
    } else if (!emailReg.test(email)) {
        document.getElementById("emailError").textContent =
            "Некоректний Email!";
        hasError = true;
    }

    if (password === "") {
        document.getElementById("passwordError").textContent =
            "Введіть пароль!";
        hasError = true;
    } else if (!passwordReg.test(password)) {
        document.getElementById("passwordError").textContent =
            "Пароль має містити мінімум 6 символів, велику та малу літери й цифру!";
        hasError = true;
    }

    if (repeatPassword === "") {
        document.getElementById("repeatPasswordError").textContent =
            "Повторіть пароль!";
        hasError = true;
    } else if (password !== repeatPassword) {
        document.getElementById("repeatPasswordError").textContent =
            "Паролі не збігаються!";
        hasError = true;
    }

    if (hasError) {
        return;
    }

    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    window.location.href = "form1.html";
}