🌤️ Daily Dashboard

A personal productivity dashboard built with vanilla JavaScript — combining a live clock with dynamic backgrounds, real-time weather, a to-do list, an hourly planner, a daily goal tracker, a Pomodoro timer, and a motivational quote generator, all in one place.
link--> https://productivity-dashboard-omega-cyan.vercel.app/
✨ Features

🕒 Live Clock & Dynamic Background


Displays the current date and time (updates every second, 12-hour format with AM/PM).
Automatically greets the user based on the time of day ("Good Morning/Afternoon/Evening/Night guys").
Changes the background image dynamically to match the time of day:

Morning (5 AM – 12 PM)
Afternoon (12 PM – 4 PM)
Evening (4 PM – 8 PM)
Night (8 PM – 5 AM)

⛅ Live Weather

Fetches real-time weather data using the Open-Meteo API.
Displays current temperature, weather condition (e.g. Clear, Cloudy, Rain, Snow, Storm), wind speed, and wind direction.
Weather codes are mapped to human-readable descriptions and condition groups.


✅ To-Do List


Add, view, and delete daily tasks.
Data persists across sessions using localStorage.
Toggleable panel with open/close controls.


🗓️ Hourly Planner


A 24-hour daily schedule/routine planner.
Type in plans for each hour of the day; auto-saves on change.
Data persists using localStorage.


🎯 Daily Goals Tracker


Add daily goals with checkboxes to mark them as complete.
Completed goals are visually struck through.
Delete goals individually.
Data persists using localStorage.


⏱️ Pomodoro Timer


Standard 25-minute work / 5-minute break cycle.
Start, Pause, and Reset controls.
Automatically switches between "Work Session" and "Break Time" when the countdown ends.


💬 Motivational Quotes


Fetches a random quote using the DummyJSON Quotes API.
Displays a new quote on load and on button click.
Includes error handling for failed requests.


🛠️ Tech Stack


HTML5 — structure and layout
CSS3 — styling and panel/modal transitions
JavaScript (Vanilla) — all app logic, no frameworks
localStorage — client-side data persistence for To-Do, Planner, and Goals
Unsplash — background images for time-of-day themes


🌐 APIs Used

Feature API for Weather Open-Meteo & for Quote DummyJSONQuotes
