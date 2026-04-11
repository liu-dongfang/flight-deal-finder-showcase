const WEEKDAYS = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export function shiftDate(date: string, days: number): string {
  const value = new Date(`${date}T00:00:00Z`);
  value.setUTCDate(value.getUTCDate() + days);
  return value.toISOString().slice(0, 10);
}

export function combineDateAndTime(date: string, time: string, dayOffset = 0): string {
  return `${shiftDate(date, dayOffset)}T${time}:00`;
}

export function getWeekdayLabel(date: string): string {
  const value = new Date(`${date}T00:00:00Z`);
  return WEEKDAYS[value.getUTCDay()];
}

export function formatDisplayDate(date: string): string {
  const weekday = getWeekdayLabel(date);
  return `${date.replaceAll("-", ".")} ${weekday}`;
}

export function formatMonthDay(date: string): string {
  const [, month, day] = date.split("-");
  return `${month}/${day}`;
}

export function timeToMinutes(value: string): number {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainMinutes = minutes % 60;
  return `${hours} 小时 ${remainMinutes} 分`;
}

export function formatPrice(value: number): string {
  return `¥${value.toLocaleString("zh-CN")}`;
}

export function formatFlightWindow(
  departTimeLocal: string,
  arriveTimeLocal: string,
  arrivalDayOffset: number
): string {
  if (arrivalDayOffset === 0) {
    return `${departTimeLocal} - ${arriveTimeLocal}`;
  }

  return `${departTimeLocal} - 次日 ${arriveTimeLocal}`;
}
