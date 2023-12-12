const handleLogin = (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());

  if (value.username === "aaa" && value.password === "aaa") {
    sessionStorage.setItem("isLoggedIn", true);
    window.location.href = "board.html";
  } else {
    alert("Username or password is incorrect");
  }
};

const handleLogout = () => {
  sessionStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
};
