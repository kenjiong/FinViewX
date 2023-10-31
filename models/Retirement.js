const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const retirementSchema = new Schema(
  {
    birthDate: { type: Date, required: true },
    retirementAge: { type: Number, required: true, min: 1 },
    lifeExpectancy: { type: Number, required: true, min: 1 },
    monthlyExpenses: { type: Number, required: true, min: 0 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Retirement", retirementSchema);
