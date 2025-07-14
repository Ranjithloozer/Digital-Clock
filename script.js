window.onload = function () {
  console.log("JS Loaded!");

  // Theme toggle
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    themeBtn.textContent = document.body.classList.contains("light-mode")
      ? "🌞 Light Mode"
      : "🌙 Dark Mode";
  });

  // Tab switching
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${btn.dataset.tab}-section`).classList.add('active');
    });
  });

  // CLOCK
  function updateClock() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    document.getElementById("time").textContent = `${h}:${m}:${s} ${ampm}`;
    document.getElementById("date").textContent = now.toDateString();

    if (alarmTime && `${h}:${m}:${s} ${ampm}` === alarmTime) {
      document.getElementById("alarm-sound").play();
      document.getElementById("alarm-msg").textContent = "🔔 Alarm Ringing!";
      alarmTime = null;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Populate selects
  for (let i = 1; i <= 12; i++) {
    document.getElementById("alarm-hour").innerHTML += `<option>${String(i).padStart(2, '0')}</option>`;
  }
  for (let i = 0; i < 60; i++) {
    let padded = String(i).padStart(2, '0');
    document.getElementById("alarm-minute").innerHTML += `<option>${padded}</option>`;
    document.getElementById("timer-minute").innerHTML += `<option>${padded}</option>`;
    document.getElementById("timer-second").innerHTML += `<option>${padded}</option>`;
  }

  // ALARM
  let alarmTime = null;
  document.getElementById("setAlarm").addEventListener("click", () => {
    const h = document.getElementById("alarm-hour").value;
    const m = document.getElementById("alarm-minute").value;
    const ampm = document.getElementById("alarm-ampm").value;
    alarmTime = `${h}:${m}:00 ${ampm}`;
    document.getElementById("alarm-msg").textContent = `Alarm set for ${alarmTime}`;
  });
// STOPWATCH FUNCTIONALITY
let stopwatchInterval = null;
let stopwatchSeconds = 0;

function updateStopwatch() {
  let hrs = Math.floor(stopwatchSeconds / 3600);
  let mins = Math.floor((stopwatchSeconds % 3600) / 60);
  let secs = stopwatchSeconds % 60;

  document.getElementById("stopwatch-time").textContent =
    `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

document.getElementById("startStopwatch").addEventListener("click", () => {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchSeconds++;
      updateStopwatch();
    }, 1000);
  }
});

document.getElementById("stopStopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
});

document.getElementById("resetStopwatch").addEventListener("click", () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchSeconds = 0;
  updateStopwatch();
});


  // TIMER
  let timerInterval = null, timerRemaining = 0;
  function updateTimerDisplay() {
    let mins = Math.floor(timerRemaining / 60);
    let secs = timerRemaining % 60;
    document.getElementById("countdown-display").textContent =
      `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  document.getElementById("startTimer").addEventListener("click", () => {
    const mins = +document.getElementById("timer-minute").value;
    const secs = +document.getElementById("timer-second").value;
    timerRemaining = mins * 60 + secs;
    if (timerRemaining <= 0) return;
    updateTimerDisplay();
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      timerRemaining--;
      updateTimerDisplay();
      if (timerRemaining <= 0) {
        clearInterval(timerInterval);
        document.getElementById("alarm-sound").play();
        document.getElementById("timer-msg").textContent = "⏳ Timer Done!";
      }
    }, 1000);
  });
  document.getElementById("stopTimer").addEventListener("click", () => {
    clearInterval(timerInterval);
    document.getElementById("timer-msg").textContent = "⏹️ Timer Stopped";
  });
};

