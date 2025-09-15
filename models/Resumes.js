const { default: mongoose } = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fileUrl: { type: String, required: true }, // S3 URL
  parsedData: { type: Object }, // JSON with extracted skills, exp, education
  scoreHistory: [
    {
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
      score: Number,
      feedback: String,
      analyzedAt: { type: Date, default: Date.now }
    }
  ],

  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Resume", ResumeSchema);