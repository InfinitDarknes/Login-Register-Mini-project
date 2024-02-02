window.onload = function () {
  LoadUsers();
  document.getElementById("toggle-visibility").checked = false;
};
const RegisterButton = document.getElementById("register-button");
const NextStepButton = document.getElementById("next-step-button");
const RegisterForm = document.getElementById("register-form");
const ToggleVisbilityCheckbox = document.getElementById("toggle-visibility");
const EmailInput = document.getElementById("email-input");
const PhoneNumberInput = document.getElementById("phone-number-input");
const PasswordInput = document.getElementById("password-input");
const ConfirmPasswordInput = document.getElementById("confirm-password-input");
const EmailErrorBox = document.getElementById("email-error-box");
const PhoneNumberErrorBox = document.getElementById("phone-number-error-box");
const PasswordErrorBox = document.getElementById("password-error-box");
const ConfirmPasswordErrorBox = document.getElementById("confirm-password-error-box");
const RegisterErrorBox = document.getElementById("register-error-box");
NextStepButton.addEventListener("click", () => {
  ValidateFirstStage();
});
RegisterForm.addEventListener("submit", (Event) => {
  Event.preventDefault();
  Register();
});
EmailInput.addEventListener("input", () => {
  CheckEmailInput();
});
PasswordInput.addEventListener("input", CheckPasswordInput);
ConfirmPasswordInput.addEventListener("input", CheckPasswordInput);
PhoneNumberInput.addEventListener("input", () => {
  CheckPhoneNumberInput();
});
ToggleVisbilityCheckbox.addEventListener("change", ToggleVisbility);
let Users = [
  { Email: "Arash29@gmail.com", PhoneNumber: "09051265041", Password: "Valentine1998" },
  { Email: "Flashi@gmail.com", PhoneNumber: "09081265051", Password: "Jakash19" },
  { Email: "Nemesis@gmail.com", PhoneNumber: "09311265041", Password: "LeonKenedi2" },
];
function NewUserConstructor(Email, Password, PhoneNumber) {
  this.Email = Email;
  this.Password = Password;
  this.PhoneNumber = PhoneNumber;
}
function CheckEmailInput() {
  EmailErrorBox.innerText = "";
  RegisterErrorBox.innerText = "";
  let Email = document.getElementById("email-input").value.trim();
  let EmailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!Email) {
    EmailErrorBox.innerText = "Please insert a Email";
    return false;
  }
  if (!EmailPattern.test(Email)) {
    EmailErrorBox.innerText = "Email is not valids";
    return false;
  }
  if (CheckEmail()) {
    EmailErrorBox.innerText = "Email already exist";
    return false;
  } else {
    EmailErrorBox.innerText = "";
    return true;
  }
}
function CheckPasswordInput() {
  PasswordErrorBox.innerText = "";
  ConfirmPasswordErrorBox.innerText = "";
  RegisterErrorBox.innerText = "";
  let PasswordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d\W]*$/;
  let Password = document.getElementById("password-input").value.trim();
  let ConfirmPassword = document.getElementById("confirm-password-input").value.trim();
  if (!Password) {
    PasswordErrorBox.innerText = "Please insert a Password";
    return false;
  }
  if (Password.length < 8 || Password.length > 24) {
    PasswordErrorBox.innerText = "Password must contain 8 to 24 characters";
    return false;
  }
  if (!PasswordPattern.test(Password)) {
    PasswordErrorBox.innerText = "Include at least one number and uppercase character in the password";
    return false;
  }
  if (ConfirmPassword !== Password) {
    RegisterErrorBox.innerText = "Passwords do not match";
    return false;
  } else {
    PasswordErrorBox.innerText = "";
    RegisterErrorBox.innerText = "";
    return true;
  }
}
function CheckPhoneNumberInput() {
  let PhoneNumberPattern = /^09\d{9}$/;
  let PhoneNumber = document.getElementById("phone-number-input").value.trim();
  if (!PhoneNumber) {
    PhoneNumberErrorBox.innerText = "";
    return true; // Because phone number is optional
  }
  if (!PhoneNumberPattern.test(PhoneNumber)) {
    PhoneNumberErrorBox.innerText = "Invalid phone number";
    return false;
  }
  if (CheckPhoneNumber()) {
    PhoneNumberErrorBox.innerText = "Phone number already exist";
    return false;
  } else {
    PhoneNumberErrorBox.innerText = "";
    return true;
  }
}
function CheckEmail() {
  let Email = document.getElementById("email-input").value.trim();
  return Users.find((i) => {
    if (i.Email === Email) return true;
    else return false;
  });
}
function CheckPhoneNumber() {
  let PhoneNumber = document.getElementById("phone-number-input").value.trim();
  return Users.find((i) => {
    if (i.PhoneNumber === PhoneNumber) return true;
    else return false;
  });
}
function CheckPassword(Email, Password) {
  let User = Users.find((i) => {
    if (i.Email === Email) return i;
    else return null;
  });
  if (User.Password !== Password) return false;
  else return true;
}
function Register() {
  if (!CheckEmailInput()) return;
  if (!CheckPasswordInput()) return;
  if (!CheckPhoneNumberInput()) return;
  if (CheckPhoneNumber()) return;
  let Email = document.getElementById("email-input").value.trim();
  let Password = document.getElementById("password-input").value.trim();
  let PhoneNumber = document.getElementById("phone-number-input").value.trim();
  let NewUser = new NewUserConstructor(Email, Password, PhoneNumber);
  Users.push(NewUser);
  SaveUsers();
  ShowSuccessfullRegister();
}
function ValidateFirstStage() {
  if (!CheckEmailInput()) return;
  else if (!CheckPasswordInput()) return;
  ShowFinalStep();
}
function ShowFinalStep() {
  const FirstStep = document.getElementById("first-step");
  const SecondStep = document.getElementById("second-step");
  FirstStep.style.display = "none";
  SecondStep.style.display = "flex";
}
function ShowSuccessfullRegister() {
  const Container = document.getElementById("container");
  const SuccesfullRegister = document.getElementById("succesfull-register");
  const Message = document.getElementById("message");
  Container.style.display = "none";
  SuccesfullRegister.style.display = "flex";
  Message.innerText = `Dear user you have registered succesfully on ${EmailInput.value} Email please click on the link below in order to login into your account.`;
}
function SaveUsers() {
  localStorage.setItem("Users", JSON.stringify(Users));
}
function LoadUsers() {
  if (localStorage.getItem("Users")) Users = JSON.parse(localStorage.getItem("Users"));
}
function ToggleVisbility() {
  if (ToggleVisbilityCheckbox.checked) {
    PasswordInput.type = "text";
    ConfirmPasswordInput.type = "text";
  } else {
    PasswordInput.type = "password";
    ConfirmPasswordInput.type = "password";
  }
}
