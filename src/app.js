const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const pubDirectoryPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../views/partials");

// Set up static directory to serve
app.use(express.static(pubDirectoryPath));

// Set up handlebars engine
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather app",
    name: "Tyler C"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Tyler C"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    questions: "here to answer questions",
    help: "Sorry no help here, if you find some let me know",
    title: "Here to help",
    name: "Tyler C"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      Error: "Address must be provided"
    });
  }
  const address = req.query.address;
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: address
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must most provide a search term"
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    questions: "here to answer questions",
    FAQs: "Frequently Asked Questions",
    title: "404",
    name: "Tyler C",
    errorMessage: "Help article not found"
  });
});

// 404 page
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Tyler C",
    errorMessage: "Page Not Found"
  });
});

// Server
app.listen(port, () => {
  console.log("server running on port" + port);
});
