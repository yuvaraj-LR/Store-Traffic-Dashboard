const hourlyData = new Map();

function roundToHour(timestamp) {
  const date = new Date(timestamp);
  date.setMinutes(0, 0, 0);
  return date.toISOString();
}

export function addToHistory(msg) {
  const hourKey = roundToHour(msg.time_stamp);

  if (!hourlyData.has(hourKey)) {
    hourlyData.set(hourKey, { in: 0, out: 0 });
  }

  const data = hourlyData.get(hourKey);
  data.in += msg.customers_in;
  data.out += msg.customers_out;

  cleanupOldData();
}

function cleanupOldData() {
  const now = new Date();
  for (const [key, _] of hourlyData.entries()) {
    const hourTime = new Date(key);
    const diff = now - hourTime;
    if (diff > 24 * 60 * 60 * 1000) {
      hourlyData.delete(key);
    }
  }
}

export function getHistoryData() {
  const sorted = [...hourlyData.entries()].sort();
  return sorted.map(([hour, counts]) => ({
    hour,
    customers_in: counts.in,
    customers_out: counts.out,
  }));
}
