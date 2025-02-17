import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  isAdmin: { type: Boolean, default: false },
  image: { type: String },
  dob: { type: Date, required: true },
  joinedAt: { type: Date, default: new Date() },
});

export default mongoose.model("User", userSchema);
