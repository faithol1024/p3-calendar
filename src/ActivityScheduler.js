// ActivityScheduler.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./ActivityScheduler.css";

const daysData = {
  monday: [1, 4, 7, 8, 9, 10, 11, 12, 15, 16, 17, 19, 20, 21],
  tuesday: [2, 5, 7, 8, 9, 10, 11, 13, 15, 16, 17, 19],
  wednesday: [3, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 19, 20],
  thursday: [1, 4, 7, 8, 10, 11, 12, 15, 19, 20, 21],
  friday: [2, 5, 7, 8, 10, 11, 13, 15, 16, 17, 19, 20, 21],
  saturday: [3, 6, 7, 10, 11, 14, 15, 16, 17, 18, 20, 21],
  sunday: [4, 5, 6, 10, 11, 15, 16, 17, 18, 20, 21],
  // Add data for other days
};

const daysOrder = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]; // maintain the order of days

const ActivityScheduler = () => {
  const [selectedDay, setSelectedDay] = useState("monday");
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch activities based on the selected day
    const fetchActivities = async () => {
      const response = await fetch("/data.csv");
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const { data } = Papa.parse(csv, { header: true });
      const filteredActivities = data.filter((activity) =>
        daysData[selectedDay].includes(parseInt(activity.id))
      );
      setActivities(filteredActivities);
    };

    fetchActivities();
  }, [selectedDay]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleNextDay = () => {
    const currentIndex = daysOrder.indexOf(selectedDay);
    const nextIndex = (currentIndex + 1) % daysOrder.length; // get the next index, wrap around to 0 if it's the last day
    setSelectedDay(daysOrder[nextIndex]); // set the next day
  };

  const handlePrevDay = () => {
    const currentIndex = daysOrder.indexOf(selectedDay);
    const prevIndex = (currentIndex - 1 + daysOrder.length) % daysOrder.length; // get the previous index, wrap around to the last day if it's the first day
    setSelectedDay(daysOrder[prevIndex]); // set the next day
  };

  return (
    <div className="toplevel">
      <div className="header">
        <div>
          <h1>Activity Scheduler</h1>
        </div>
        <div>
          <label htmlFor="day">Select a day:</label>
          <button onClick={handlePrevDay}>prev</button>
          <select id="day" value={selectedDay} onChange={handleDayChange}>
            {daysOrder.map((day) => (
              <option key={day} value={day}>
                {day.charAt(0).toUpperCase() + day.slice(1)}{" "}
                {/* capitalize the first letter */}
              </option>
            ))}
          </select>
          <button onClick={handleNextDay}>Next</button>
        </div>
      </div>

      {Object.keys(daysData).map((day) => (
        <div key={day}>
          {day === selectedDay && (
            <div className="contentWrapper">
              <div>
                <h4>Day</h4>
                <div className="timeDiv">
                  {activities
                    .filter((activity) => activity.time === "Day")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        <div className="location">
                          <strong>Location:</strong> {activity.location}
                          <br />
                          <strong>Activity:</strong> {activity.activity}
                        </div>
                        <div className="socialStat">
                          <strong>Social Stats:</strong>
                          <div className="socialStatDetail">
                            {activity.social_stat_name_1}:
                            {activity.social_stat_amt_1}
                          </div>
                          {activity.social_stat_name_2 && (
                            <div className="socialStatDetail">
                              {activity.social_stat_name_2}:
                              {activity.social_stat_amt_2}
                            </div>
                          )}
                          {/* Add more social stats if available */}
                        </div>
                        {activity.persona_stat_name_1 && (
                          <div className="personaStat">
                            <strong>Persona Stats:</strong>
                            <div className="personaStatDetail">
                              {activity.persona_stat_name_1}:
                              {activity.persona_stat_amt_1}
                            </div>
                            {/* Add more persona stats if available */}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4>Night</h4>
                <div className="timeDiv">
                  {activities
                    .filter((activity) => activity.time === "Day")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        <div className="location">
                          <strong>Location:</strong> {activity.location}
                          <br />
                          <strong>Activity:</strong> {activity.activity}
                        </div>
                        <div className="socialStat">
                          <strong>Social Stats:</strong>
                          <div className="socialStatDetail">
                            {activity.social_stat_name_1}:
                            {activity.social_stat_amt_1}
                          </div>
                          {activity.social_stat_name_2 && (
                            <div className="socialStatDetail">
                              {activity.social_stat_name_2}:
                              {activity.social_stat_amt_2}
                            </div>
                          )}
                          {/* Add more social stats if available */}
                        </div>
                        {activity.persona_stat_name_1 && (
                          <div className="personaStat">
                            <strong>Persona Stats:</strong>
                            <div className="personaStatDetail">
                              {activity.persona_stat_name_1}:
                              {activity.persona_stat_amt_1}
                            </div>
                            {/* Add more persona stats if available */}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
              <div>
                <h4>Always</h4>
                <div className="timeDiv">
                  {activities
                    .filter((activity) => activity.time === "Day")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        <div className="location">
                          <strong>Location:</strong> {activity.location}
                          <br />
                          <strong>Activity:</strong> {activity.activity}
                        </div>
                        <div className="socialStat">
                          <strong>Social Stats:</strong>
                          <div className="socialStatDetail">
                            {activity.social_stat_name_1}:
                            {activity.social_stat_amt_1}
                          </div>
                          {activity.social_stat_name_2 && (
                            <div className="socialStatDetail">
                              {activity.social_stat_name_2}:
                              {activity.social_stat_amt_2}
                            </div>
                          )}
                          {/* Add more social stats if available */}
                        </div>
                        {activity.persona_stat_name_1 && (
                          <div className="personaStat">
                            <strong>Persona Stats:</strong>
                            <div className="personaStatDetail">
                              {activity.persona_stat_name_1}:
                              {activity.persona_stat_amt_1}
                            </div>
                            {/* Add more persona stats if available */}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ActivityScheduler;
