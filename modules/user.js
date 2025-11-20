import mongoose from "mongoose";

const ScoreSchema = new mongoose.Schema({
  basicVerification: Number,
  backgroundCheck: Number,
  experience: Number,
  positiveBehavior: Number,
  computedScore: Number,
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    scores: [ScoreSchema],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
