const { default: mongoose } = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String },
  salaryRange: { min: Number, max: Number },
  type: { type: String, enum: ["full-time", "part-time", "internship", "contract"] },

  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // HR user

  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],

  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

module.exports = mongoose.model("Job", JobSchema);