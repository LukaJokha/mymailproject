export function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  
    let dayName = days[date.getDay()];
    let monthName = months[date.getMonth()];
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
  
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return `${dayName}, ${monthName} ${day}, ${hours}:${minutes}`;
  }