import multer from "multer";

// Storage type: memory, so we don't save files locally
const storage = multer.memoryStorage();

// Initialize multer with memory storage
const upload = multer({ storage });

// Single file upload middleware
export const uploadSingle = upload.single("profileImg");

// Multiple file upload middleware (optional)
export const uploadMultiple = upload.array("images", 5); // max 5 images
