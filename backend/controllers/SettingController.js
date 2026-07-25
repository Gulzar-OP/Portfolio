import Setting from "../models/Setting.js";

// Create Settings
export const createSetting = async (req, res) => {
  try {
    const exists = await Setting.findOne();

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Settings already exist.",
      });
    }

    const setting = await Setting.create(req.body);

    res.status(201).json({
      success: true,
      message: "Settings created successfully.",
      setting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Settings
export const getSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    res.status(200).json({
      success: true,
      setting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Settings
export const updateSetting = async (req, res) => {
  try {
    const setting = await Setting.findOneAndUpdate({}, req.body, {
      new: true,
      runValidators: true,
    });

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Settings updated successfully.",
      setting,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Settings
export const deleteSetting = async (req, res) => {
  try {
    const setting = await Setting.findOne();

    if (!setting) {
      return res.status(404).json({
        success: false,
        message: "Settings not found.",
      });
    }

    await setting.deleteOne();

    res.status(200).json({
      success: true,
      message: "Settings deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};