// script.js

document.addEventListener("DOMContentLoaded", function() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Display the current month and year
    document.getElementById("current-month").textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    document.querySelector(".month h2").textContent = `${getMonthName(currentMonth)} ${currentYear}`;

    // Example: Events associated with specific dates
    const events = {
        "2024-03-05": ["Event 1", "Event 2"],
        "2024-03-15": ["Event 3"],
        "2024-03-25": ["Event 4", "Event 5"]
    };
    // Generate calendar days
    generateCalendar(currentMonth, currentYear, events);
});

function generateCalendar(month, year, events) {
    const daysContainer = document.getElementById("calendar-days");
    daysContainer.innerHTML = "";

    const totalDays = getDaysInMonth(month, year);
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // Create blank cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
        const blankCell = document.createElement("div");
        blankCell.classList.add("blank-cell");
        daysContainer.appendChild(blankCell);
    }

    // Create day cells for the month
    for (let day = 1; day <= totalDays; day++) {
        const dayCell = document.createElement("div");
        dayCell.textContent = day;
        dayCell.classList.add("day-cell");

         // Check if the current date has associated events
         const currentDate = new Date(year, month, day).toISOString().split("T")[0];
         console.log(currentDate);
         console.log(events[currentDate]);
         if (events[currentDate]) {
             dayCell.classList.add("event");
             const eventCountSpan = events[currentDate].length;
            //  // Add a tooltip or other indication that there are events
            dayCell.title = "Fully Booked"; // Display events in a tooltip
            dayCell.textContent = day+"*";
         }

        daysContainer.appendChild(dayCell);
         
        // Add event listener to each day cell for handling click events
        dayCell.addEventListener("click", function() {
            const selectedDate = new Date(year, month, day);
            handleDayClick(selectedDate);
        });
    }
}

function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}

function getMonthName(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
                       "July", "August", "September", "October", "November", "December"];
    return monthNames[month];
}

function handleDayClick(date) {
    alert(`Clicked on: ${date.toDateString()}`);
    // Implement event handling logic here, such as displaying events for the selected date
}
