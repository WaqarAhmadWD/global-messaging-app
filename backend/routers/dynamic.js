const { Auth, Message, Contact } = require("../models"); // Assuming models are exported from the models directory
const router = require("express").Router();

// Configuration for models and their fields
const options = {
  auth: {
    model: Auth,
    fields: ["name", "userId", "password", "visibilityType"], // Define fields if needed for validation
  },
  message: {
    model: Message,
    fields: ["userId", "message", "receiver"],
  },
  contact: {
    model: Contact,
    fields: ["name", "email", "phone"],
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

// Dynamic CRUD routes
router
  .route("/:model")
  .all(validateModel) // Validate model for all routes
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
        message: `${req.params.model} fetched successfully`,
        data: savedEntry,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router
  .route("/:model/:id")
  .all(validateModel) // Validate model for all routes
  // GET /:model/:id - Get a specific entry by ID
  .get(async (req, res) => {
    const { model } = req.modelOptions;
    try {
      const entry = await model.findById(req.params.id);
      if (!entry) {
        return res
          .status(404)
          .json({
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
        message: `${req.params.model}, ${req.params.id} id fetched successfully`,
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
