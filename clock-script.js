const timezones = [
    'UTC',
    'America/New_York',
    'America/Chicago',
    'America/Denver',
    'America/Los_Angeles',
    'America/Anchorage',
    'Pacific/Honolulu',
    'Europe/London',
    'Europe/Paris',
    'Europe/Berlin',
    'Europe/Moscow',
    'Asia/Dubai',
    'Asia/Kolkata',
    'Asia/Bangkok',
    'Asia/Shanghai',
    'Asia/Tokyo',
    'Asia/Seoul',
    'Asia/Hong_Kong',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Pacific/Auckland',
    'Africa/Cairo',
    'Africa/Johannesburg',
    'America/Toronto',
    'America/Mexico_City',
    'America/Sao_Paulo',
    'America/Buenos_Aires'
];

const timezoneDisplayNames = {
    'UTC': 'UTC (Coordinated Universal Time)',
    'America/New_York': 'New York',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Los_Angeles': 'Los Angeles',
    'America/Anchorage': 'Anchorage',
    'Pacific/Honolulu': 'Honolulu',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Europe/Berlin': 'Berlin',
    'Europe/Moscow': 'Moscow',
    'Asia/Dubai': 'Dubai',
    'Asia/Kolkata': 'India',
    'Asia/Bangkok': 'Bangkok',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Tokyo': 'Tokyo',
    'Asia/Seoul': 'Seoul',
    'Asia/Hong_Kong': 'Hong Kong',
    'Australia/Sydney': 'Sydney',
    'Australia/Melbourne': 'Melbourne',
    'Pacific/Auckland': 'Auckland',
    'Africa/Cairo': 'Cairo',
    'Africa/Johannesburg': 'Johannesburg',
    'America/Toronto': 'Toronto',
    'America/Mexico_City': 'Mexico City',
    'America/Sao_Paulo': 'São Paulo',
    'America/Buenos_Aires': 'Buenos Aires'
};

let selectedTimezone = 'UTC';

function getTimeInTimezone(timezone) {
    try {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const parts = formatter.formatToParts(new Date());
        const timeStr = `${getPart(parts, 'hour')}:${getPart(parts, 'minute')}:${getPart(parts, 'second')}`;
        const dateStr = `${getPart(parts, 'weekday')}, ${getPart(parts, 'month')} ${getPart(parts, 'day')}, ${getPart(parts, 'year')}`;

        return { time: timeStr, date: dateStr };
    } catch (error) {
        console.error(`Error getting time for ${timezone}:`, error);
        return { time: '--:--:--', date: 'Invalid timezone' };
    }
}

function getPart(parts, partName) {
    return parts.find(p => p.type === partName)?.value || '';
}

function updateMainClock() {
    const { time, date } = getTimeInTimezone(selectedTimezone);
    document.getElementById('main-time').textContent = time;
    document.getElementById('main-date').textContent = date;
    document.getElementById('main-timezone').textContent = timezoneDisplayNames[selectedTimezone] || selectedTimezone;
}

function updateAllTimezones() {
    const grid = document.getElementById('timezone-grid');
    grid.innerHTML = '';

    timezones.forEach(tz => {
        const { time, date } = getTimeInTimezone(tz);
        const card = document.createElement('div');
        card.className = 'timezone-card';
        card.innerHTML = `
            <div class="card-timezone">${timezoneDisplayNames[tz]}</div>
            <div class="card-time">${time}</div>
            <div class="card-date">${date}</div>
        `;
        grid.appendChild(card);
    });
}

function updateAllClocks() {
    updateMainClock();
    updateAllTimezones();
}

// Set up the timezone selector
const timezoneSelect = document.getElementById('timezone-select');
timezoneSelect.addEventListener('change', (e) => {
    selectedTimezone = e.target.value;
    updateMainClock();
});

// Initial update
updateAllClocks();

// Update every second
setInterval(updateAllClocks, 1000);