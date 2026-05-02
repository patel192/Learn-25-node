const cron = require("node-cron");
const RecurringModel = require("../models/RecurringModel");
const ExpenseModel = require("../models/ExpenseModel");

/**
 * --- RECURRING EXPENSE CRON JOB ---
 * This runs automatically in the background to check for any bills 
 * that are due and creates actual expense records for them.
 */

// Run every day at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    const today = new Date();

    // Find all active recurring items where the next payment is due today or earlier
    const recurringList = await RecurringModel.find({
      isActive: true,
      nextDate: { $lte: today },
    });

    for (const item of recurringList) {
      // 1. Create the actual expense entry
      await ExpenseModel.create({
        title: item.title,
        amount: item.amount,
        category: item.category,
        userId: item.userId,
      });

      // 2. Calculate the next due date based on the frequency
      const next = new Date(item.nextDate);

      if (item.frequency === "daily") next.setDate(next.getDate() + 1);
      if (item.frequency === "weekly") next.setDate(next.getDate() + 7);
      if (item.frequency === "monthly") next.setMonth(next.getMonth() + 1);
      if (item.frequency === "yearly") next.setFullYear(next.getFullYear() + 1);

      // 3. Update the recurring record with the new date
      item.nextDate = next;
      await item.save();
    }
  } catch (error) {
    console.error("Recurring cron error:", error);
  }
});

