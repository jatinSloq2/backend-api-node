const { default: mongoose } = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  candidateId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  resumeId: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
  status: { 
    type: String, 
    enum: ["applied", "shortlisted", "interview", "rejected", "hired"], 
    default: "applied" 
  },

  score: { type: Number }, // resume analyzer score
  feedback: { type: String }, // e.g. "Missing Python skill"

  appliedAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model("Application", ApplicationSchema);