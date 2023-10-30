const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const year = new Date().getFullYear();

const retirementSchema = new Schema(
  {
    birthYear: { type: Number, required: true, min: 1900, max: year },
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
