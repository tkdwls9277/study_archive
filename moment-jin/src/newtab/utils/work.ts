// 근무시간 계산 (분 단위)
export function calculateWorkMinutes(checkIn: string, checkOut: string): number {
  const [inHour, inMin] = checkIn.split(":").map(Number);
  const [outHour, outMin] = checkOut.split(":").map(Number);

  const inMinutes = inHour * 60 + inMin;
  const outMinutes = outHour * 60 + outMin;

  const totalMinutes = outMinutes - inMinutes;
  // 점심시간 1시간(60분) 제외
  return Math.max(0, totalMinutes - 60);
}

// 시간 포맷 (분 -> "X시간 Y분")
export function formatWorkTime(minutes: number, hourText: string = "시간", minuteText: string = "분"): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}${hourText} ${mins}${minuteText}`;
}
