export function calculatePaybackMonths(upfrontCost: number, dailyReward: number, daysPerWeek: number): number {
  const monthlyReward = dailyReward * daysPerWeek * 4.3;
  if (monthlyReward === 0) return Infinity;
  return upfrontCost / monthlyReward;
}

export function getPaybackColor(months: number): string {
  if (months <= 6) return 'text-green-600';
  if (months <= 12) return 'text-yellow-600';
  return 'text-red-600';
}
