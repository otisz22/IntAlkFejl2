let data = [];

const fetchData = () => {
  return fetch("http://localhost:3000/users")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      return data.reverse();
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });
};

const handleAdd = async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const value = Object.fromEntries(formData.entries());
  const valueWithId = { ...value, id: data.length + 1 };

  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(valueWithId),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  renderData();
};

const handleSave = async (e) => {
  e.preventDefault();

  const row = e.target.parentElement.parentElement;

  const form = e.target;
  const data = new FormData(form);
  const value = Object.fromEntries(data.entries());

  const response = await fetch(`http://localhost:3000/users/${value.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(value),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
};

const renderData = async () => {
  data = await fetchData();
  const dataBody = document.querySelector("#content");

  dataBody.innerHTML = "";

  data.forEach((user) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <form onSubmit="handleSave(event)" class="content-row">
        
          <input value=${user.id} name="id" type="hidden" />
          <label for="name">Név:</label>
          <input value=${user.name} name="name" />        
          <label for="age">Életkor:</label>
          <input value=${user.age} name="age" />
        
          <button type="submit">Mentés</button>        
        
      </form>    
      `;
    dataBody.appendChild(div);
  });
};

if (!sessionStorage.getItem("isLoggedIn")) {
  window.location.href = "login.html";
} else {
  renderData();
}
