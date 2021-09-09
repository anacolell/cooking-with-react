const express = require("express");

const router = express.Router();

const Recipe = require("../models/Recipe");

router.get("/", (req, res) => {
  Recipe.find({})
    .then((data) => {
      console.log("Data: ", data);
      res.json(data);
    })
    .catch((error) => {
      console.log("error: ", daerrorta);
    });
});

// router.get("/", async (req, res) => {
//   try {
//     const skip =
//       req.query.skip && /^\d+$/.test(req.query.skip)
//         ? Number(req.query.skip)
//         : 0;

//     const recipes = await Recipe.find({}, undefined, { skip, limit: 50 });

//     res.json(recipes);
//   } catch (e) {
//     res.status(500).send();
//   }
// });

router.post("/save", (req, res) => {
  const data = req.body;

  const newRecipe = new Recipe(data);
  newRecipe.save((error) => {
    if (error) {
      res.status(500).json({ msg: "Sorry, internal server error" });
    } else {
      res.json({
        msg: "Your data has been saved!",
      });
    }
  });
});

//delete route
router.delete("/delete/:id", (req, res) => {
  console.log(req.params.id);
  Recipe.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.json("Recipe deleted"))
    .catch((err) => res.status(400).json("Error " + err));
});

//update route

router.put("/put/:id", (req, res) => {
  const updatedItem = {
    image: req.body.image,
    name: req.body.name,
    cookTime: req.body.cookTime,
    servings: req.body.servings,
    instructions: req.body.instructions,
    ingredients: req.body.ingredients,
    author: req.body.author,
  };

  Recipe.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: updatedItem },
    (req, res, err) => {
      if (!err) {
        console.log("Item updated");
      } else {
        console.log(err);
      }
    }
  );
});

module.exports = router;
