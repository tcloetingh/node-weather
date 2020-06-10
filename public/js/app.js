console.log("Serving up the javascript");

const weatherForm = document.getElementById("formInput");
const searchElement = document.getElementById("searchInput");
const messageOne = document.getElementById("message-1");
const messageTwo = document.getElementById("message-2");

weatherForm.addEventListener("submit", e => {
  const location = searchElement.value;
  e.preventDefault();

  fetch(`/weather?address=${location}`).then(response => {
    response.json().then(data => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
