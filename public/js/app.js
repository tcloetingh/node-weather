console.log("Serving up the javascript");
fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});

const weatherForm = document.getElementById("formInput");
const searchElement = document.getElementById("searchInput");
weatherForm.addEventListener("submit", e => {
  const location = searchElement.value;
  e.preventDefault();

  fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        console.log(data);
      } else {
        console.log(data);
      }
    });
  });
});
