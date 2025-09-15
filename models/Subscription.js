const { default: mongoose } = require("mongoose");

const SubscriptionPlanSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Free, Pro, Enterprise
  price: { type: Number, required: true }, // Monthly price
  duration: { type: Number, required: true }, // in days
  features: [{ type: String }], // e.g. ["10 job posts", "Resume analyzer", "AI screening"]

  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);