const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const savingsSchema = new Schema(
  {
    monthlyExpenses: { type: Number, required: true, min: 0 },
    months: { type: Number, required: true, min: 1 },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Savings", savingsSchema);
