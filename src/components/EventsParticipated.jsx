import React, { useEffect, useState } from 'react';
import EventService from "../service/EventService";  // Assuming EventService provides event fetching
import EventOcService from '../service/EventOcService';  // Assuming EventOcService provides event OC fetching
import { getUserIdFromToken } from '../utils/utils';  // Assuming this function gets the user ID from the token

const EventParticipated = () => {
  const [eventsData, setEventsData] = useState([]); // To store the events
  const [eventOcsData, setEventOcsData] = useState([]); // To store the event OC records
  const [loading, setLoading] = useState(true); // For loading state
  const [error, setError] = useState(null); // For error handling

  const userId = getUserIdFromToken(); // Assuming this gets the userId from the token

  useEffect(() => {
    fetchEvents();
    fetchEventOcs();
  }, []);

  // Fetch all events
  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await EventService.getAllEvents(token);  // Replace with actual service call
      const eventsArray = response.data || response.content || [];
      setEventsData(eventsArray); // Store events data
    } catch (error) {
      setError("Error fetching events");
      console.error("Error fetching events:", error);
    }
  };

  // Fetch all event OC (participation) records
  const fetchEventOcs = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await EventOcService.getAllEventOcs(token);  // Replace with actual service call
      const eventOcsArray = response.content || [];
      setEventOcsData(eventOcsArray); // Store event OC data
    } catch (error) {
      setError("Error fetching event OC records");
      console.error("Error fetching event OC records:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtered Event OC records for the current user
  const filteredEventOcs = eventOcsData.filter(eventOc => eventOc.user_id === userId);

  // Get the event IDs from the filtered event OC records
  const filteredEventIds = filteredEventOcs.map(eventOc => eventOc.event_id);

  // Log the filtered event IDs for debugging
  console.log("Filtered Event OC Records:", filteredEventOcs);
  console.log("Filtered Event IDs:", filteredEventIds);

  // Filter the eventsData to display only events that match the event_ids from the filtered event OC records
  const filteredEventsForUser = eventsData.filter(event => filteredEventIds.includes(event.event_id));

  return (
    <div className="bg-neutral-900 text-white p-6">
 <style>
              {`
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px); /* Adjust the distance of the bounce */
            }
          }

          .animated-card {
            animation: bounce 2s infinite; /* Adjust duration as needed */
          }
        `}
            </style>
      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p>Loading events...</p>
      ) : (
        <div>
          {/* Display filtered events (based on event_oc participation) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animated-card">
            {filteredEventsForUser.length > 0 ? (
              filteredEventsForUser.map((event, index) => (
                <div key={index} className=" rounded-lg  shadow-md">
                  <img
                    src={event.event_image}
                    alt={event.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-lg font-medium">{event.name}</h3>
                 
                </div>
              ))
            ) : (
              <p>You have not participated in any events.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventParticipated;
