const { default: mongoose } = require("mongoose");

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  logo: { type: String }, // S3 URL

  hrUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // multiple HRs per company

  subscription: {
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "SubscriptionPlan" },
    status: { type: String, enum: ["active", "expired", "trial"], default: "trial" },
    startDate: { type: Date },
    endDate: { type: Date }
  },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Company", CompanySchema);