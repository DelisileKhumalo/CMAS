const ml = require('ml-regression');

function predictDaysLeft(usageLogs, currentStock) {
  if (usageLogs.length < 2) return Infinity; // not enough data to predict

  // Prepare data
  const dates = usageLogs.map(log => new Date(log.date).getTime());
  const quantities = usageLogs.map(log => log.quantityUsed);

  // Convert dates to days (relative to first date)
  const minDate = Math.min(...dates);
  const x = dates.map(date => (date - minDate) / (1000 * 60 * 60 * 24)); // days
  const y = quantities;

  // Train regression model
  const regression = new ml.SLR(x, y); // Simple Linear Regression

  const dailyUsage = regression.slope;

  if (dailyUsage <= 0) return Infinity; // no usage or invalid

  const daysLeft = currentStock / dailyUsage;
  return daysLeft;
}

module.exports = predictDaysLeft;
