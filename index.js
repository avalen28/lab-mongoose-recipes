const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");

// Import of the data from './data.json'
const data = require("./data");
//const allRecipes = require("./data.json");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

const newRecipe = {
  title: "risotto",
  level: "Amateur Chef",
  ingredients: ["muchos"],
  cuisine: "Italian",
  dishType: "main_course",
  duration: 1.3,
};
// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    //return Recipe.create(newRecipe); iteration 2
    return Recipe.insertMany(data);
  })
  //.then(( recipeInserted ) => console.log(recipeInserted.title)) iteration 2
  .then((allRecipesFromDB) =>
    allRecipesFromDB.forEach((recipeFromDB) => {
      console.log(recipeFromDB.title);
    })
  )
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
