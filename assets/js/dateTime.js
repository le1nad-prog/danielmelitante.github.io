function updateDateTime() {

    var now = new Date();

    var dateOptions = {
      timeZone: "Asia/Manila",
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric"
    };

    var timeOptions = {
      timeZone: "Asia/Manila",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    };

    var currentDate =
      now.toLocaleDateString("en-PH", dateOptions);

    var currentTime =
      now.toLocaleTimeString("en-PH", timeOptions);

    document.getElementById("currentDate").textContent = currentDate;
    document.getElementById("currentTime").textContent = currentTime;

    document.getElementById("mobileCurrentDate").textContent = currentDate;
}

updateDateTime();
setInterval(updateDateTime, 1000);