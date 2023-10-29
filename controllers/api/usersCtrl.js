const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const debug = require("debug")("finviewx:controllers:api:usersCtrl");

async function create(req, res) {
  const data = req.body;
  try {
    const newUser = await User.create(data);
    const token = createJWT(newUser);
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    const token = createJWT(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: "Bad Credentials" });
  }
}

function checkToken(req, res) {
  console.log("req.user", req.user);
  res.json(req.exp);
}

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "1h" }
  );
}

module.exports = {
  showDashboard,
  create,
  login,
  checkToken,
};
