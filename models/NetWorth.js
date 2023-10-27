const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const assetSchema = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const liabilitySchema = new Schema(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const netWorthSchema = new Schema(
  {
    assets: [assetSchema],
    liabilities: [liabilitySchema],
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("NetWorth", netWorthSchema);
