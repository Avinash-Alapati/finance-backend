import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
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
};

export const monthlyTrends = async (req, res) => {
  const result = await Record.aggregate([
    {
      $group: {
        _id: { $month: "$date" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id": 1 } }
  ]);

  res.json(result);
};