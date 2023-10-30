const Savings = require("../../models/Savings");
const debug = require("debug")("finviewx:controllers:api:savingsCtrl");

const getEmergencyFund = async (req, res) => {
    try {
      const savings = await Savings.find({ user: req.user._id });
      res.status(200).json(savings);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const setEmergencyFund = async (req, res) => {
    try {
      const { monthlyExpenses, months } = req.body;
      const userId = req.user._id;
      const savings = { monthlyExpenses, months, user: userId };
      const newSavings = await Savings.create(savings);
      res.status(201).json({ newSavings });
    } catch (error) {
      res.status(500).json({ error: "Please try again" });
    }
  };

  const editEmergencyFund = async (req, res) => {
    try {
      const { savingsId } = req.params;
      const savings = await Savings.findById(savingsId);
  
      const { monthlyExpenses, months } = req.body;
      savings.monthlyExpenses = monthlyExpenses;
      savings.months = months;
  
      await savings.save();
      res.status(200).json({ message: "Ideal emergency fund edited successfully" });
    } catch (error) {
      res.status(500).json({ error: "Please try again" });
    }
  };

module.exports = {
    getEmergencyFund,
    setEmergencyFund,
    editEmergencyFund,
};
