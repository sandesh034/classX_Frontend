import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

function Calendar() {
    const handleEventClick = (info) => {
        alert(`Event: ${info.event.title}\nStart: ${info.event.start}\nEnd: ${info.event.end}`);
        // You can add any custom logic here, such as opening a modal or redirecting to another page.
    };


    return (
        <>
            <div className=' mx-auto border rounded-lg p-5 pb-5  bg-white mb-5'>
                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 mb-3">
                    <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">
                        Routine
                    </h3>

                    <button class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg class="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                        Add Class
                    </button>

                </div>
            </div>

            <div className=' mx-auto border rounded-lg p-5  bg-white mb-5'>
                <Fullcalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView={"dayGridMonth"}
                    headerToolbar={{
                        start: "prev,next", // will normally be on the left. if RTL, will be on the right
                        center: "title",
                        end: "dayGridMonth,timeGridWeek,timeGridDay", // will normally be on the right. if RTL, will be on the left
                    }}
                    height={"60vh"}

                    events={[
                        { title: 'event 1', start: '2024-07-13T10:00:00', end: '2024-07-13T12:00:00' },
                        { title: 'event 2', start: '2024-07-13T13:00:00', end: '2024-07-13T14:00:00' }
                    ]}
                    eventClick={handleEventClick}
                />
            </div>
        </>
    );
}

export default Calendar;
