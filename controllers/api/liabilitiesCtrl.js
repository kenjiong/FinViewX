const Liability = require("../../models/Liability");
const debug = require("debug")("finviewx:controllers:api:liabilitiesCtrl");

const getAllLiabilities = async (req, res) => {
  try {
    const liabilities = await Liability.find({ user: req.user._id });
    res.status(200).json(liabilities);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createLiability = async (req, res) => {
  try {
    const { type, name, value } = req.body;
    const userId = req.user._id;
    const liability = { type, name, value, user: userId };
    const newLiability = await Liability.createLiability(liability);
    res.status(201).json({ newLiability });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

const editLiability = async (req, res) => {
  try {
    const { liabilityId } = req.params;
    const liability = await Liability.findById(liabilityId);

    const { name, value } = req.body;
    liability.name = name;
    liability.value = value;

    await liability.save();
    res.status(200).json({ message: "Liability edited successfully" });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

const deleteLiability = async (req, res) => {
  const { liabilityId } = req.params;
  const liability = await Liability.findByIdAndDelete(liabilityId);
  res.status(204).json({ liability });
};

module.exports = {
  getAllLiabilities,
  createLiability,
  editLiability,
  deleteLiability,
};
