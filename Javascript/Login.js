window.onload = function () {
  LoadUsers();
  document.getElementById("toggle-visibility").checked = false;
};
const LoginForm = document.getElementById("login-form");
const ToggleVisbilityCheckbox = document.getElementById("toggle-visibility");
const EmailOrPhoneNumberInput = document.getElementById("email-or-phone-number-input");
const PasswordInput = document.getElementById("password-input");
const EmailOrPhoneNumberErrorBox = document.getElementById("email-or-phone-number-error-box");
const PasswordErrorBox = document.getElementById("password-error-box");
const LoginErrorBox = document.getElementById("login-error-box");
let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let PhoneNumberPattern = /^09\d{9}$/;
LoginForm.addEventListener("submit", (Event) => {
  Event.preventDefault();
  Login();
});
PasswordInput.addEventListener("input", CheckPasswordInput);
ToggleVisbilityCheckbox.addEventListener("change", ToggleVisbility);
let Users = [
  { Email: "Arash29@gmail.com", Phone: "09051265041", Password: "Valentine1998" },
  { Email: "Flashi@gmail.com", Phone: "09081265051", Password: "Jakash19" },
  { Email: "Nemesis@gmail.com", Phone: "09311265041", Password: "LeonKenedi2" },
];
function NewUserConstructor(Email, Password) {
  this.Email = Email;
  this.Password = Password;
}
function CheckEmailOrPhoneNumberInput() {
  EmailOrPhoneNumberErrorBox.innerText = "";
  LoginErrorBox.innerText = "";
  let Input = document.getElementById("email-or-phone-number-input").value.trim();
  if (!Input) {
    EmailOrPhoneNumberErrorBox.innerText = "Please enter an email or phone number";
    return false;
  }
  if (!EmailPattern.test(Input) && !PhoneNumberPattern.test(Input)) {
    EmailOrPhoneNumberErrorBox.innerText = "Please enter a valid email or phone number";
    return false;
  } else {
    EmailOrPhoneNumberErrorBox.innerText = "";
    return true;
  }
}
function CheckEmail() {
  let Input = document.getElementById("email-or-phone-number-input").value.trim();
  if (EmailPattern.test(Input)) {
    return Users.find((User) => {
      if (User.Email === Input) return true;
      else return false;
    });
  }
  if (PhoneNumberPattern.test(Input)) {
    return Users.find((User) => {
      if (User.PhoneNumber === Input) return true;
      else return false;
    });
  }
}
function CheckPasswordInput() {
  PasswordErrorBox.innerText = "";
  LoginErrorBox.innerText = "";
  let Password = document.getElementById("password-input").value.trim();
  if (!Password) {
    PasswordErrorBox.innerText = "Please insert a Password";
    return false;
  } else {
    PasswordErrorBox.innerText = "";
    return true;
  }
}
function CheckPassword() {
  let Input = document.getElementById("email-or-phone-number-input").value.trim();
  let Password = document.getElementById("password-input").value.trim();
  let User;
  if (EmailPattern.test(Input)) {
    console.log("Email detected");
    User = Users.find((i) => {
      return i.Email === Input;
    });
  }
  if (PhoneNumberPattern.test(Input)) {
    console.log("Phone number detected");
    User = Users.find((i) => {
      return i.PhoneNumber === Input;
    });
  }
  if (User.Password !== Password) return false;
  else return true;
}
function Login() {
  if (!CheckEmailOrPhoneNumberInput()) {
    return;
  }
  if (!CheckPasswordInput()) {
    return;
  }
  if (!CheckEmail()) {
    LoginErrorBox.innerText = "Provided info is incorrect";
    return;
  }
  if (!CheckPassword()) {
    LoginErrorBox.innerText = "Provided info is incorrect";
    return;
  } else alert("login successfully");
}
function SaveUsers() {
  localStorage.setItem("Users", JSON.stringify(Users));
}
function LoadUsers() {
  if (localStorage.getItem("Users")) Users = JSON.parse(localStorage.getItem("Users"));
}
function ToggleVisbility() {
  if (ToggleVisbilityCheckbox.checked) PasswordInput.type = "text";
  else PasswordInput.type = "password";
}
