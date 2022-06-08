import { login } from "../lib/apiLoader.js";

const button = document.getElementById("button");
const input = document.getElementById("input");

const inputChanged = async () => {
  await new Promise((r) => setTimeout(r, 200));
  checkPassword(input.component.value);
};

button.addEventListener("click", inputChanged);
input.addEventListener("change", inputChanged);

const checkPassword = async (pwd) => {
  if (await login.checkPwd(pwd)) {
    cookie.pwd = pwd;
    window.location.pathname = "/";
  }
};

checkPassword(cookie.pwd);
