const multer = require("multer");
const fs = require("fs");
const path = require("path");

const ensureFolderExists = (folder) => {
  console.log("Ensuring folder exists...", folder);
  if (!fs.existsSync(folder)) {
    console.log("Folder does not exist, creating it...");
    fs.mkdirSync(folder, { recursive: true });
  }
};

const configureMulter = (folder, maxFileSize) => {
  // Ensure the folder exists
  ensureFolderExists(folder);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, folder);
    },
    filename: (req, file, cb) => {
      if (!req.user || !req.user.userId) {
        return cb(new Error("User name is required to upload the file!"));
      }

      // Use req.user.name as the file name
      const uniqueFileName = `${req.user.userId}${path.extname(
        file.originalname
      )}`;
      cb(null, uniqueFileName);
    },
  });

  return multer({
    storage: storage,
    limits: { fileSize: maxFileSize },
    fileFilter: (req, file, cb) => {
      const fileTypes = /jpeg|jpg|png/;
      const extname = fileTypes.test(
        path.extname(file.originalname).toLowerCase()
      );
      const mimetype = fileTypes.test(file.mimetype);

      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error("Only JPEG, JPG, and PNG files are allowed!"));
      }
    },
  });
};

const userProfileUpload = configureMulter(
  "uploads/profiles/",
  5 * 1024 * 1024 // Max file size: 5MB
);

module.exports = { userProfileUpload };
