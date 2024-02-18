// ActivityScheduler.js
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./ActivityScheduler.css";

const daysData = {
  monday: [
    1, 4, 7, 8, 9, 10, 12, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 28, 36, 37,
  ],
  tuesday: [2, 5, 7, 8, 9, 10, 13, 15, 16, 17, 19, 22, 23, 31, 33, 35, 36, 38],
  wednesday: [
    3, 6, 7, 8, 9, 10, 14, 15, 16, 17, 19, 20, 24, 25, 26, 27, 28, 29, 31, 32,
    35, 36, 37,
  ],
  thursday: [
    1, 4, 7, 8, 10, 12, 15, 19, 20, 21, 22, 23, 24, 26, 29, 33, 35, 36, 39,
  ],
  friday: [
    2, 5, 7, 8, 10, 13, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 28, 31, 32, 35,
    36, 39,
  ],
  saturday: [
    3, 6, 7, 10, 14, 15, 16, 17, 18, 20, 21, 24, 26, 27, 28, 33, 35, 36, 37, 38,
    39,
  ],
  sunday: [4, 5, 6, 10, 11, 15, 16, 17, 18, 20, 21, 30, 32, 34, 35, 36, 37, 39],
  // Add data for other days
};

const daysDataHoliday = {
  monday: [
    1, 4, 7, 8, 9, 10, 11, 12, 15, 16, 17, 19, 20, 21, 22, 24, 25, 26, 28, 34,
    36, 37,
  ],
  tuesday: [
    2, 5, 7, 8, 9, 10, 11, 13, 15, 16, 17, 19, 22, 23, 31, 33, 34, 35, 36, 37,
    38,
  ],
  wednesday: [
    3, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17, 19, 20, 24, 25, 26, 27, 28, 29, 31,
    32, 34, 35, 36, 37,
  ],
  thursday: [
    1, 4, 7, 8, 10, 11, 12, 15, 19, 20, 21, 22, 23, 24, 26, 29, 33, 34, 35, 36,
    37, 39,
  ],
  friday: [
    2, 5, 7, 8, 10, 11, 13, 15, 16, 17, 19, 20, 21, 22, 23, 25, 26, 28, 31, 32,
    34, 35, 36, 37, 39,
  ],
  saturday: [
    3, 6, 7, 10, 11, 14, 15, 16, 17, 18, 20, 21, 24, 26, 27, 28, 33, 34, 35, 36,
    37, 38, 39,
  ],
  sunday: [4, 5, 6, 10, 11, 15, 16, 17, 18, 20, 21, 30, 32, 34, 35, 36, 37, 39],
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
  const [isHoliday, setIsHoliday] = useState(false);

  useEffect(() => {
    // Fetch activities based on the selected day
    const fetchActivities = async () => {
      const response = await fetch(
        "https://raw.githubusercontent.com/faithol1024/p3-calendar/gh-pages/data.csv"
        // "/data.csv"
      );
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const csv = decoder.decode(result.value);
      const { data } = Papa.parse(csv, { header: true });
      if (isHoliday) {
        const filteredActivities = data.filter((activity) =>
          daysDataHoliday[selectedDay].includes(parseInt(activity.id))
        );
        setActivities(filteredActivities);
      } else {
        const filteredActivities = data.filter((activity) =>
          daysData[selectedDay].includes(parseInt(activity.id))
        );
        setActivities(filteredActivities);
      }
    };

    fetchActivities();
  }, [selectedDay, isHoliday]);

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
          <button onClick={() => setIsHoliday(!isHoliday)}>
            Toggle Holiday
          </button>
          {isHoliday && <h2>Holiday</h2>}
        </div>
      </div>
      {Object.keys(daysData).map((day) => (
        <div key={day}>
          {day === selectedDay && (
            <div className="contentWrapper">
              <div className="innerWrapper">
                <div className="timeDiv">
                  <h2>Day</h2>
                  {activities
                    .filter((activity) => activity.time === "Day")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        {activity.activity && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Activity:</strong> {activity.activity}
                          </div>
                        )}

                        {activity.arcana && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Arcana:</strong> {activity.arcana}
                          </div>
                        )}

                        {!activity.arcana && (
                          <div className="socialStat">
                            <strong>Social Stats:</strong>
                            {activity.social_stat_name_1 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_1}:
                                {activity.social_stat_amt_1}
                              </div>
                            )}
                            {activity.social_stat_name_2 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_2}:
                                {activity.social_stat_amt_2}
                              </div>
                            )}
                            {/* Add more social stats if available */}
                          </div>
                        )}
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
                <div className="timeDiv">
                  <h2>Night</h2>
                  {activities
                    .filter((activity) => activity.time === "Night")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        {activity.activity && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Activity:</strong> {activity.activity}
                          </div>
                        )}

                        {activity.arcana && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Arcana:</strong> {activity.arcana}
                          </div>
                        )}

                        {!activity.arcana && (
                          <div className="socialStat">
                            <strong>Social Stats:</strong>
                            {activity.social_stat_name_1 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_1}:
                                {activity.social_stat_amt_1}
                              </div>
                            )}
                            {activity.social_stat_name_2 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_2}:
                                {activity.social_stat_amt_2}
                              </div>
                            )}
                            {/* Add more social stats if available */}
                          </div>
                        )}
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
                <div className="timeDiv">
                  <h2>Always</h2>
                  {activities
                    .filter((activity) => activity.time === "Always")
                    .map((activity) => (
                      <div key={activity.id} className="activity">
                        {activity.activity && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Activity:</strong> {activity.activity}
                          </div>
                        )}

                        {activity.arcana && (
                          <div className="location">
                            <strong>Location:</strong> {activity.location}
                            <br />
                            <strong>Arcana:</strong> {activity.arcana}
                          </div>
                        )}

                        {!activity.arcana && !activity.persona_stat_name_1 && (
                          <div className="socialStat">
                            <strong>Social Stats:</strong>
                            {activity.social_stat_name_1 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_1}:
                                {activity.social_stat_amt_1}
                              </div>
                            )}
                            {activity.social_stat_name_2 && (
                              <div className="socialStatDetail">
                                {activity.social_stat_name_2}:
                                {activity.social_stat_amt_2}
                              </div>
                            )}
                            {/* Add more social stats if available */}
                          </div>
                        )}
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
