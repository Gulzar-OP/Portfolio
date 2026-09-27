import msg from "../models/message.js";

export const sendMsg = async (req, res) => {
  try {
    const { email, name, subject, message ,phone} = req.body;

    if (!email || !name || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    const send = await msg.create({
      email,
      name,
      subject,
      message,
      phone
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: send,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Message send failed: ${e.message}`,
    });
  }
};

export const deleteMsg = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedMsg = await msg.findByIdAndDelete(id);

    if (!deletedMsg) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Failed to delete message: ${e.message}`,
    });
  }
};

export const getAllMSG = async (req, res) => {
  try {
    const all = await msg.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: all.length,
      messages: all,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: `Failed to fetch messages: ${e.message}`,
    });
  }
};