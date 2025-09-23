export function formatDate(date) {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);

  const year = dateObject.getFullYear();
  const month = padZero(dateObject.getMonth() + 1);
  const day = padZero(dateObject.getDate());
  const hours = padZero(dateObject.getHours());
  const minutes = padZero(dateObject.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
  //   return `${year}-${month}-${day}`;
}

function padZero(str) {
  return String(str).padStart(2, "0");
}

formatDate("2025-09-17T15:00:00.000+00:00");
