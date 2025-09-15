const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // hashed
  role: { 
    type: String, 
    enum: ["candidate", "hr", "admin"], 
    required: true 
  },

  profilePic: { type: String }, // S3 URL
  phone: { type: String },

  subscription: {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
    status: { type: String, enum: ["active", "expired", "trial"], default: "trial" },
    startDate: { type: Date },
    endDate: { type: Date }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);