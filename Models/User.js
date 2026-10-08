import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Profile Fields
  bio: {
    type: String,
    default: "Fitness enthusiast on a journey to peak performance."
  },
  goal: {
    type: String,
    default: "Build Muscle"
  },
  weight: {
    type: Number,
    default: 70
  },
  height: {
    type: Number,
    default: 170
  },
  age: {
    type: Number,
    default: 25
  },
  gender: {
    type: String,
    default: "Not Specified"
  },
  points: {
    type: Number,
    default: 0
  },
  streak: {
    type: Number,
    default: 0
  },
  completedWorkouts: {
    type: Number,
    default: 0
  },
  profilePicture: {
    type: String,
    default: null
  },
  recentActivity: [
    {
      type: { type: String },
      name: String,
      date: { type: Date, default: Date.now }
    }
  ],
  resetToken: {
    type: String
  },
  resetTokenExpire: {
    type: Date
  }
}, {
  timestamps: true
});

export default mongoose.model("User", userSchema);