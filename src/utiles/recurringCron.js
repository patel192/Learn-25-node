const cron = require("node-cron");
const RecurringModel = require("../models/RecurringModel");
const ExpenseModel = require("../models/ExpenseModel");

cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();
    const recurringList = await RecurringModel.find({
      isActive:true,
      nextDate: { $lte: today },
    });

    for (const item of recurringList) {
      await ExpenseModel.create({
        title: item.title,
        amount: item.amount,
        category: item.category,
        userId: item.userId,
      });

      const next = new Date(item.nextDate);

      if (item.frequency === "daily") next.setDate(next.getDate() + 1);
      if (item.frequency === "weekly") next.setDate(next.getDate() + 7);
      if (item.frequency === "monthly") next.setMonth(next.getMonth() + 1);
      if (item.frequency === "yearly") next.setFullYear(next.getFullYear() + 1);

      item.nextDate = next;

      await item.save();
    }
  } catch (error) {
    console.error("Recurring cron error:", error);
  }
});
