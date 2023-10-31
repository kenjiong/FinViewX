const Retirement = require("../../models/Retirement");
const debug = require("debug")("finviewx:controllers:api:retirementCtrl");

const getRetirementGoal = async (req, res) => {
    try {
      const retirement = await Retirement.find({ user: req.user._id });
      res.status(200).json(retirement);
    } catch (error) {
      res.status(500).json({ error });
    }
  };

  const setRetirementGoal = async (req, res) => {
    try {
      const { birthDate, retirementAge, lifeExpectancy, monthlyExpenses } = req.body;
      const userId = req.user._id;
      const retirement = { birthDate, retirementAge, lifeExpectancy, monthlyExpenses, user: userId };
      const newRetirement = await Retirement.create(retirement);
      res.status(201).json({ newRetirement });
    } catch (error) {
      res.status(500).json({ error: "Please try again" });
    }
  };

  const editRetirementGoal = async (req, res) => {
    try {
      const { retirementId } = req.params;
      const retirement = await Retirement.findById(retirementId);
  
      const { retirementAge, lifeExpectancy, monthlyExpenses } = req.body;
      retirement.retirementAge = retirementAge;
      retirement.lifeExpectancy = lifeExpectancy;
      retirement.monthlyExpenses = monthlyExpenses;
  
      await retirement.save();
      res.status(200).json({ message: "Retirement goal edited successfully" });
    } catch (error) {
      res.status(500).json({ error: "Please try again" });
    }
  };

module.exports = {
    getRetirementGoal,
    setRetirementGoal,
    editRetirementGoal,
};
