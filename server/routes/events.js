const express = require("express");

const { getAll, get, add, replace, remove } = require("../data/event");
const { checkAuth } = require("../util/auth");
const {
  isValidText,
  isValidDate,
  isValidPrenume,
} = require("../util/validation");
const { generarePrima } = require("../util/events");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const offers = await getAll();
    res.json({ offers: offers, counter: offers.length });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const offer = await get(req.params.id);
    res.json({ offer: offer });
  } catch (error) {
    next(error);
  }
});

router.use(checkAuth);

router.post("/", async (req, res, next) => {
  console.log(req.token);
  const data = req.body;

  let errors = {};

  if (!isValidText(data.nume)) {
    errors.nume = "Numele trebuie sa fie de minim 3 litere";
  }

  if (data.prenume) {
    if (!isValidPrenume(data.prenume)) {
      errors.prenume = "Prenumele trebuie sa fie de maxim 10 litere.";
    }
  }

  if (!isValidDate(data.data)) {
    errors.data = "Invalid data, must be between 1900-current";
  }

  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Adding the offer failed due to validation errors.",
      errors,
    });
  }

  const prima = generarePrima();
  data.prima = prima;
  try {
    await add(data);
    res.status(201).json({ message: "Offer saved.", offer: data });
  } catch (error) {
    next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  const data = req.body;

  let errors = {};

  if (!isValidText(data.nume)) {
    errors.nume = "Invalid nume.";
  }

  if (!isValidText(data.prenume)) {
    errors.prenume = "Invalid prenume.";
  }

  if (!isValidDate(data.data)) {
    errors.date = "Invalid data.";
  }
  if (Object.keys(errors).length > 0) {
    return res.status(422).json({
      message: "Updating the offer failed due to validation errors.",
      errors,
    });
  }

  try {
    await replace(req.params.id, data);
    res.json({ message: "Offer updated.", offer: data });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.json({ message: "Offer deleted." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
