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

    document.getElementById("currentDate").textContent =
      now.toLocaleDateString("en-PH", dateOptions);

    document.getElementById("currentTime").textContent =
      now.toLocaleTimeString("en-PH", timeOptions);
  }

  updateDateTime();
  setInterval(updateDateTime, 1000);