import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
  try {
    const record = await Record.create({
      ...req.body,
      createdBy: req.user._id,
    });

    res.status(201).json({
      success: true,
      data: record,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};
    if (type) filter.type = type;
    if (category) filter.category = category;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const records = await Record.find(filter)
      .skip((page - 1) * limit)
      .limit(limit);

   res.status(201).json({
     success: true,
     data: records,
   });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if (!record){
      return res.status(404).json({ message: "Not found" });
    } 

    if (record.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }

    Object.assign(record, req.body);
    await record.save();

    res.json({
     success: true,
     data: record,
   });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);

    if(!record){
      return res.status(404).json({ message: "Not found" });
    } 

    if (record.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await record.deleteOne();

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};