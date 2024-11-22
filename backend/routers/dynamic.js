const { Auth, Message, Contact } = require("../models"); // Assuming models are exported from the models directory
const { tokenValidator, bodyValidator } = require("../middlewares/middlewares");
const router = require("express").Router();

// Configuration for models and their fields
const options = {
  auth: {
    model: Auth,
    fields: ["name", "userId", "password", "visibilityType"], // Define fields if needed for validation
    middlewares: [tokenValidator, bodyValidator], // Apply tokenValidator middleware for Auth
    // middlewares_disable: { tokenValidator: ["GET"] },
  },
  message: {
    model: Message,
    fields: ["userId", "message", "receiver"],
    middlewares: [tokenValidator, bodyValidator], // Apply tokenValidator middleware for Message
  },
  contact: {
    model: Contact,
    fields: ["name", "email", "phone"],
    middlewares: [tokenValidator, bodyValidator], // No middleware specified for Contact
  },
};

// Middleware to validate model existence
const validateModel = (req, res, next) => {
  const modelName = req.params.model;
  const modelOptions = options[modelName];

  if (!modelOptions) {
    return res.status(404).json({ message: `${modelName} model not found` });
  }

  req.modelOptions = modelOptions; // Attach model options to request
  next();
};

// Helper to dynamically apply model-specific middlewares
const applyMiddlewares = (middlewares) => {
  return (req, res, next) => {
    if (middlewares && middlewares.length) {
      middlewares
        .reduce((acc, middleware) => {
          return acc.then(
            () =>
              new Promise((resolve, reject) => {
                // if (
                //   !options.middlewares_disable.map((ele)=>
                //     ele.some(
                //     (e) => e.toUpperCase() === req.method
                //   )
                // ))
                middleware(req, res, (err) => (err ? reject(err) : resolve()));
              })
          );
        }, Promise.resolve())
        .then(() => next())
        .catch(next); // Propagate errors
    } else {
      next(); // No middleware to apply
    }
  };
};

// Dynamic CRUD routes
router
  .route("/:model")
  .all(validateModel) // Validate model for all routes
  .all((req, res, next) =>
    applyMiddlewares(req.modelOptions.middlewares)(req, res, next)
  ) // Apply model-specific middlewares
  // GET /:model - Get all entries for the model
  .get(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const data = await model.find();
      res
        .status(200)
        .json({ message: `${req.params.model} fetched successfully`, data });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  // POST /:model - Create a new entry for the model
  .post(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const newEntry = new model(req.body); // Create a new instance
      const savedEntry = await newEntry.save(); // Save to database
      res.status(201).json({
        message: `${req.params.model} created successfully`,
        data: savedEntry,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router
  .route("/:model/:id")
  .all(validateModel) // Validate model for all routes
  .all((req, res, next) =>
    applyMiddlewares(req.modelOptions.middlewares)(req, res, next)
  ) // Apply model-specific middlewares
  // GET /:model/:id - Get a specific entry by ID
  .get(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const entry = await model.findById(req.params.id);
      if (!entry) {
        return res.status(404).json({
          message: `${req.params.model}, ${req.params.id} id not found`,
        });
      }
      res.status(200).json({
        message: `${req.params.model}, ${req.params.id} id fetched successfully`,
        data: entry,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  // PUT /:model/:id - Update a specific entry by ID
  .put(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const updatedEntry = await model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedEntry) {
        return res
          .status(404)
          .json({ message: `${req.params.id} id not found` });
      }
      res.status(200).json({
        message: `${req.params.model}, ${req.params.id} id updated successfully`,
        data: updatedEntry,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  // DELETE /:model/:id - Delete a specific entry by ID
  .delete(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const deletedEntry = await model.findByIdAndDelete(req.params.id);
      if (!deletedEntry) {
        return res
          .status(404)
          .json({ message: `${req.params.id} id not found` });
      }
      res
        .status(200)
        .json({ message: `${req.params.id} id deleted successfully` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
