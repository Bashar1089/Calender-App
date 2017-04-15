if (localStorage && localStorage.getItem('events')) {
} else
{
    var events = [];
    localStorage.setItem('events', JSON.stringify(events));
}

$(document).ready(function () {
    notify_permission();

    $('#calendar').fullCalendar();
    reload_calender();

    $('#event_date').datepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        todayHighlight: true,
        Default: true
    });
});

function notify_permission()
{
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
        // If it's okay let's create a notification
    }

    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
            }
        });
    }

}

function notifyMe() {
    var current_date = moment().format("YYYY-MM-DD");

    //console.log(current_date);
    var n;


    var event = JSON.parse(localStorage.getItem('events'));

    $.each(event, function (i, item) {
        if (current_date == item.start)
        {
            alert('You have a task today named : ' + item.title);
            n = new Notification('You have a task today', {
                body: item.title,
                icon: './img/icon.png'
            });

        }
    });


}


function reload_calender()
{
    var event = JSON.parse(localStorage.getItem('events'));
    //console.log(event);
    $('#calendar').fullCalendar('removeEvents');
    $('#calendar').fullCalendar('addEventSource', event);
    $('#calendar').fullCalendar('rerenderEvents');

    notifyMe();

}


function add_schedule()
{
    if (localStorage && localStorage.getItem('events')) {
        var event = JSON.parse(localStorage.getItem('events'));

        var temp = {};
        temp.title = jQuery('input[id=event_name]').val();
        temp.start = jQuery('input[id=event_date]').val();

        event.push(temp);

        localStorage.setItem('events', JSON.stringify(event));

        alert('New schedule added.');

        reload_calender();
    }
}

function clear_schedule()
{
    if (localStorage && localStorage.getItem('events')) {
        events = [];

        localStorage.setItem('events', JSON.stringify(events));

        alert('Schedule cleared.');

        reload_calender();
    }
}
