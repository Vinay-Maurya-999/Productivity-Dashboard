const images = {
  Morning:
    "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3VuJTIwcmlzZXxlbnwwfHwwfHx8MA%3D%3D",
  Afternoon:
    "https://images.unsplash.com/photo-1631300181312-43bb1004bfb2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHN1biUyMGxpZ2h0JTIwaW4lMjBhZnRlcm5vb258ZW58MHx8MHx8fDA%3D",
  Evening:
    "https://images.unsplash.com/photo-1708925373367-3015297c4f12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHN1biUyMGxpZ2h0JTIwaW4lMjBldmVuaW5nfGVufDB8fDB8fHww",
  Night:
    "https://images.unsplash.com/photo-1561910867-f0660a8b5f93?q=80&w=778&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const weatherCodes = {
  0: { text: "Clear sky", group: "clear" },
  1: { text: "Mainly clear", group: "clear" },
  2: { text: "Partly cloudy", group: "cloudy" },
  3: { text: "Overcast", group: "cloudy" },
  45: { text: "Fog", group: "mist" },
  48: { text: "Depositing rime fog", group: "mist" },
  51: { text: "Light drizzle", group: "rain" },
  53: { text: "Moderate drizzle", group: "rain" },
  55: { text: "Dense drizzle", group: "rain" },
  56: { text: "Light freezing drizzle", group: "rain" },
  57: { text: "Dense freezing drizzle", group: "rain" },
  61: { text: "Slight rain", group: "rain" },
  63: { text: "Moderate rain", group: "rain" },
  65: { text: "Heavy rain", group: "rain" },
  66: { text: "Light freezing rain", group: "rain" },
  67: { text: "Heavy freezing rain", group: "rain" },
  71: { text: "Slight snow fall", group: "snow" },
  73: { text: "Moderate snow fall", group: "snow" },
  75: { text: "Heavy snow fall", group: "snow" },
  77: { text: "Snow grains", group: "snow" },
  80: { text: "Slight rain showers", group: "rain" },
  81: { text: "Moderate rain showers", group: "rain" },
  82: { text: "Violent rain showers", group: "rain" },
  85: { text: "Slight snow showers", group: "snow" },
  86: { text: "Heavy snow showers", group: "snow" },
  95: { text: "Thunderstorm", group: "storm" },
  96: { text: "Thunderstorm, slight hail", group: "storm" },
  99: { text: "Thunderstorm, heavy hail", group: "storm" },
};

setInterval(() => {
  function updateClock() {
    const now = new Date();

    const dateStr = now.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    document.getElementById("dateOut").textContent = dateStr;
    let hours = String(now.getHours()).padStart(2, "0");
    let minutes = String(now.getMinutes()).padStart(2, "0");
    let seconds = String(now.getSeconds()).padStart(2, "0");
    let ampm;
    if (hours >= 12) {
      ampm = "PM";
    } else {
      ampm = "AM";
    }
    function getTimePeriod() {
      const hour = String(now.getHours()).padStart(2, "0");

      if (hour >= 5 && hour < 12) return "Morning";
      if (hour >= 12 && hour < 16) return "Afternoon";
      if (hour >= 16 && hour < 20) return "Evening";
      return "Night";
    }

    function applyBackground() {
      let timePeriod = getTimePeriod();
      document.querySelector(".heading").textContent =
        `Good ${timePeriod} guys`;
      document.querySelector("#main").style.backgroundImage =
        `url(${images[timePeriod]})`;
    }
    applyBackground();
    hours = hours % 12 || 12;
    document.getElementById("timeOut").textContent =
      `${hours}:${minutes}:${seconds} ${ampm}`;
  }
  updateClock();
}, 1000);

async function getWeather(lat, lon) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
  );

  const data = await res.json();
  document.querySelector("#tempOut").textContent =
    `${data.current_weather.temperature}°C`;
  document.querySelector("#condOut").textContent =
    `${weatherCodes[data.current_weather.weathercode].text} (${weatherCodes[data.current_weather.weathercode].group})`;
  document.querySelector("#detailOut").textContent =
    `${data.current_weather.windspeed} km/h ${data.current_weather.winddirection}°`;
}
getWeather(26.3352, 84.6662);

let todoicon = document.querySelector(".todoicon");
let todo = document.querySelector(".todopannel");
let closeBtn = document.querySelector(".close-btn");
todoicon.addEventListener("click", () => {
  todo.classList.toggle("active");
});
closeBtn.addEventListener("click", () => {
  todo.classList.toggle("active");
});

let todoForm = document.querySelector("#todoForm");
let todoList = document.querySelector("#todoList");

let todoData = JSON.parse(localStorage.getItem("todoData")) || [];

function todoUi() {
  todoList.innerHTML = "";
  todoData.forEach((elem, idx) => {
    console.log(idx);
    todoList.innerHTML += `
        <li class="task-item">
    <label>
        <input type="checkbox">
        <span class="task-text">${elem.Task}</span>
    </label>
    <div class="task-actions">
        <button class="delete-btn" onClick="deleteTodo(${idx})">🗑️</button>
    </div>
</li>
     `;
  });
}
todoUi();
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = e.target[0].value;
  if (inputValue.trim() === "") {
    alert("Add task for doing...");
    return;
  }
  let obj = {
    Task: inputValue,
  };
  todoData.unshift(obj);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  e.target[0].value = "";
  todoUi();
});
function deleteTodo(index) {
  todoData.splice(index, 1);
  localStorage.setItem("todoData", JSON.stringify(todoData));
  todoUi();
}

let plannericon = document.querySelector(".plannericon");
let plannerPannel = document.querySelector(".plannerPannel");
let closeBtnPlanner = document.querySelector(".close-btn-planner");
plannericon.addEventListener("click", () => {
  plannerPannel.classList.toggle("active");
});
closeBtnPlanner.addEventListener("click", () => {
  plannerPannel.classList.toggle("active");
});

let planner = JSON.parse(localStorage.getItem("planner")) || {};

function renderPlanner() {
  const list = document.querySelector("#plannerList");

  list.innerHTML = "";

  function formatHour(hour) {
    const period = hour >= 12 ? "PM" : "AM";
    let displayHour = hour % 12;
    if (displayHour === 0) displayHour = 12;
    return `${displayHour}:00 ${period}`;
  }

  for (let hour = 0; hour < 24; hour++) {
    list.innerHTML += `
      <div class="routine">
        <span>${formatHour(hour)}</span>
        <input type="text" data-hour="${hour}" value="${planner[hour] || ""}">
      </div>
    `;
  }
}
renderPlanner();
document.querySelector("#plannerList").addEventListener("change", (e) => {
  const hour = e.target.dataset.hour;
  planner[hour] = e.target.value;
  localStorage.setItem("planner", JSON.stringify(planner));
});

let goalIcon = document.querySelector(".goalIcon");
let goalPannel = document.querySelector(".goalPannel");
let closeGoal = document.querySelector(".closeGoal");
goalIcon.addEventListener("click", () => {
  goalPannel.classList.toggle("active");
});
closeGoal.addEventListener("click", () => {
  goalPannel.classList.toggle("active");
});

let tasklist = document.querySelector("#goalList");

let GoalData = JSON.parse(localStorage.getItem("Goals")) || [];
function GoalUi() {
  tasklist.innerHTML = "";
  GoalData.forEach((elem, idx) => {
    tasklist.innerHTML += `
        <li class="task-item">
    <label>
        <input type="checkbox" ${elem.done ? "checked" : ""} onChange="toggleGoal(${idx})">
        <span class="task-text" style="${elem.done ? "text-decoration:line-through; opacity:.5;" : ""}">${elem.Goal}</span>
    </label>
    <div class="task-actions">
        <button class="delete-btn" onClick="deleteGoal(${idx})">🗑️</button>
    </div>
</li>
     `;
  });
}
GoalUi();

let Goal = document.querySelector("#Goal");
Goal.addEventListener("submit", (elem) => {
  elem.preventDefault();
  let goalInput = elem.target[0].value;
  if (goalInput.trim() === "") {
    alert("Set your daily goals...");
    return;
  }
  let obj = {
    Goal: goalInput,
    done: false,
  };
  GoalData.unshift(obj);
  localStorage.setItem("Goals", JSON.stringify(GoalData));
  Goal.reset();
  GoalUi();
});
function deleteGoal(idx) {
  GoalData.splice(idx, 1);
  localStorage.setItem("Goals", JSON.stringify(GoalData));
  GoalUi();
}
function toggleGoal(idx) {
  GoalData[idx].done = !GoalData[idx].done;
  localStorage.setItem("Goals", JSON.stringify(GoalData));
  GoalUi();
}

let PomoIcon = document.querySelector(".PomoIcon");
let pomoPannel = document.querySelector(".pomoPannel");
let pomoCancel = document.querySelector(".pomoCancel");

PomoIcon.addEventListener("click", () => {
  pomoPannel.classList.toggle("active");
});
pomoCancel.addEventListener("click", () => {
  pomoPannel.classList.toggle("active");
});

const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

let timeLeft = WORK_TIME;
let isWorking = true;
let timerId = null;
let isRunning = false;

const clockEl = document.querySelector("#pomoClock");
const sessionEl = document.querySelector("#pomoSession");
const startBtn = document.querySelector("#pomoStart");
const pauseBtn = document.querySelector("#pomoPause");
const resetBtn = document.querySelector("#pomoReset");
const overlay = document.querySelector("#overlay-pomodoro");

function updateDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  clockEl.textContent = `${minutes}:${seconds}`;
  sessionEl.textContent = isWorking ? "Work Session" : "Break Time";
}

function tick() {
  if (timeLeft > 0) {
    timeLeft--;
    updateDisplay();
  } else {
    isWorking = !isWorking;
    timeLeft = isWorking ? WORK_TIME : BREAK_TIME;
    updateDisplay();
  }
}

startBtn.addEventListener("click", () => {
  if (isRunning) return;
  isRunning = true;
  timerId = setInterval(tick, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isRunning = false;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isRunning = false;
  isWorking = true;
  timeLeft = WORK_TIME;
  updateDisplay();
});
updateDisplay();

let QUOTE = document.querySelector(".QUOTE");
let QUOTEBtn = document.querySelector(".QUOTEBtn");
let QUOTEicon = document.querySelector(".QUOTEicon");
let quoteBtn = document.querySelector("#quoteBtn");

QUOTEicon.addEventListener("click", () => {
  QUOTE.classList.toggle("active");
});
QUOTEBtn.addEventListener("click", () => {
  QUOTE.classList.toggle("active");
});

async function quote() {
  try {
    const res = await fetch("https://dummyjson.com/quotes/random");
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }
    const data = await res.json();
    document.querySelector("#quoteText").textContent = data.quote;
    document.querySelector(".quote-author").textContent = data.author;
  } catch (err) {
    console.error(err.message);
  }
}
quoteBtn.addEventListener("click", quote);

quote();
