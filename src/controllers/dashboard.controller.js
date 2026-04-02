import Record from "../models/record.model.js";

export const getSummary = async (req, res) => {
  const records = await Record.find();

  let income = 0;
  let expense = 0;

  records.forEach((r) => {
    if (r.type === "income") income += r.amount;
    else expense += r.amount;
  });

  res.json({
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
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