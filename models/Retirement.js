const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const retirementSchema = new Schema(
  {
    currentAge: { type: Number, required: true, min: 1 },
    retirementAge: { type: Number, required: true, min: 1 },
    lifeExpectancy: { type: Number, required: true, min: 1 },
    monthlyExpenses: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Savings", savingsSchema);
