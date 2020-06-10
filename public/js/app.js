console.log("Serving up the javascript");
fetch("http://puzzle.mead.io/puzzle").then(response => {
  response.json().then(data => {
    console.log(data);
  });
});

fetch("http://localhost:3000/weather?address=philadelphia").then(response => {
  response.json().then(data => {
    if (data.error) {
      console.log(data);
    } else {
      console.log(data);
    }
  });
});
