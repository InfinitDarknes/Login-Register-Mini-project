window.onload = function () {
  LoadUsers();
};
const RegisterForm = document.getElementById("register-form");
RegisterForm.addEventListener("submit", (Event) => {
  Event.preventDefault();
  Register();
});
let Users = [
  { UserName: "Arash29", Password: "Valentine1998" },
  { UserName: "Flashi", Password: "Jakash19" },
  { UserName: "Nemesis", Password: "LeonKenedi2" },
];
function NewUserConstructor(UserName, Password) {
  this.UserName = UserName;
  this.Password = Password;
}
function CheckForUnvalidInput(Username, Password, ConfirmPassword) {
  let Pattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z0-9]+$/;
  if (!Username || Username === "") {
    return { IsValid: false, Error: "Please insert a username" };
  }
  if (!Password || Password === "") {
    return { IsValid: false, Error: "Please insert a Password" };
  }
  if (Username.length < 3 || Username.length > 24) {
    return { IsValid: false, Error: "Username must contain 3 to 24 characters" };
  }
  if (Password.length < 8 || Password.length > 24) {
    return { IsValid: false, Error: "Password must contain 8 to 24 characters" };
  }
  if (ConfirmPassword && ConfirmPassword !== Password) {
    return { IsValid: false, Error: "Passwords do not match" };
  }
  if (!Pattern.test(Username)) {
    return {
      IsValid: false,
      Error: "Username must include at least one uppercase letter and at least one number, you cannot use symbols in your username",
    };
  }
  if (!Pattern.test(Password)) {
    return {
      IsValid: false,
      Error: "Password must include at least one uppercase letter and at least one number, you cannot use symbols in your Password",
    };
  } else {
    return { IsValid: true, Error: null };
  }
}
function CheckForUserName(UserName) {
  let User = Users.find((i) => {
    if (i.UserName === UserName) return true;
    else return false;
  });
  return User;
}
function CheckPassword(UserName, Password) {
  let User = Users.find((i) => {
    if (i.UserName === UserName) return i;
    else return null;
  });
  if (User.Password !== Password) return false;
  else return true;
}
function Register() {
  let Username = document.getElementById("user-name-input").value;
  let Password = document.getElementById("password-input").value;
  let ConfirmPassword = document.getElementById("confirm-password-input").value;
  if (!CheckForUnvalidInput(Username, Password, ConfirmPassword).IsValid) {
    alert(CheckForUnvalidInput(Username, Password, ConfirmPassword).Error);
  } else if (CheckForUserName(Username)) {
    alert("User already exist");
  } else {
    let NewUser = new NewUserConstructor(Username, Password);
    Users.push(NewUser);
    SaveUsers();
    alert("Your account was created successfully please proceed to login page");
  }
}
function SaveUsers() {
  localStorage.setItem("Users", JSON.stringify(Users));
}
function LoadUsers() {
  if (localStorage.getItem("Users")) Users = JSON.parse(localStorage.getItem("Users"));
}
