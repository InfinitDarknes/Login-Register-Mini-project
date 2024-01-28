window.onload = function () {
  LoadUsers();
};
const LoginForm = document.getElementById("login-form");
LoginForm.addEventListener("submit", (Event) => {
  Event.preventDefault();
  Login();
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
function Login() {
  let UsernameInput = document.getElementById("user-name-input").value;
  let PasswordInput = document.getElementById("password-input").value;
  if (!CheckForUserName(UsernameInput)) {
    alert("Username does not exist");
    return;
  }
  if (!CheckPassword(UsernameInput, PasswordInput)) {
    alert("Password is incorrect");
    return;
  } else alert("login successfully");
}
function SaveUsers() {
  localStorage.setItem("Users", JSON.stringify(Users));
}
function LoadUsers() {
  if (localStorage.getItem("Users")) Users = JSON.parse(localStorage.getItem("Users"));
}
