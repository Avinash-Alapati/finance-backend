import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  result.forEach(r => {
    if (r._id === "income") income = r.total;
    else expense = r.total;
  });

  res.json({
    success: true,
    data: {
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    }
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
  
};

export const monthlyTrends = async (req, res) => {
  try {
    const result = await Record.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

  res.json({
    success: true,
    data: result,
  });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
  
};

export const categorySummary = async (req, res) => {
  try {
    const result = await Record.aggregate([
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  res.json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
  
};