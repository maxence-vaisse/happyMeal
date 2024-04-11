document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        editable: true, // Activer le glisser-déposer
        events: [
            {
                title: 'Événement 1',
                start: '2024-04-01'
            },
            {
                title: 'Événement 2',
                start: '2024-04-05',
                end: '2024-04-07'
            }
        ]
    });
    calendar.render();
});