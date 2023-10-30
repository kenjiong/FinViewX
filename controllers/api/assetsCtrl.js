const Asset = require("../../models/Asset");
const debug = require("debug")("finviewx:controllers:api:assetsCtrl");

const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find({ user: req.user._id });
    res.status(200).json(assets);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createAsset = async (req, res) => {
  try {
    const { type, name, value } = req.body;
    const userId = req.user._id;
    const asset = { type, name, value, user: userId };
    const newAsset = await Asset.create(asset);
    res.status(201).json({ newAsset });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

const editAsset = async (req, res) => {
  try {
    const { assetId } = req.params;
    const asset = await Asset.findById(assetId);

    const { name, value } = req.body;
    asset.name = name;
    asset.value = value;

    await asset.save();
    res.status(200).json({ message: "Asset edited successfully" });
  } catch (error) {
    res.status(500).json({ error: "Please try again" });
  }
};

const deleteAsset = async (req, res) => {
  const { assetId } = req.params;
  const asset = await Asset.findByIdAndDelete(assetId);
  res.status(204).json({ asset });
};

module.exports = {
  getAllAssets,
  createAsset,
  editAsset,
  deleteAsset,
};
