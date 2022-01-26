import { useEffect, useState } from "react";
import axios from "axios";

import "components/Appointment"

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  function updateSpots() {
    // console.log("state.days: ", state.days) // returns all days as array
    // console.log("state.day: ", state.day) // - returns current day as string
    // console.log("state.days.0.name: ", state.days[0].name) // returns day 0 name as string

    // REQUEST CODE REVIEW ON THIS!!!
    axios.get('api/days')
      .then((res) => setState((prev) => ({ ...prev, days: res.data })))
      // .then(console.log(state.days))
  }

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        setState(prev => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.log(err.message));
  },
    []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return (
      axios.put(`api/appointments/${id}`, appointment)
        .then((res) => setState((prev) => (({ ...prev, appointments }))))
        .then(updateSpots())
    )
  };

  function cancelInterview(id) {
    // create a copy of an appointment object, set state of interview to be null
    const appointment = {
      // spreads the state to take in all object keys
      ...state.appointments[id],
      // overwrites the interview key to NULL by providing a new value for that key
      interview: null
    };
    // create NEW appointments object
    const appointments = {
      ...state.appointments,
      // targets ID of appointments, overwrites it with value of appointment variable from above
      [id]: appointment
    };
    // 
    return (
      axios.delete(`api/appointments/${id}`)
        // takes in and makes a copy of the previous STATE, then overwrites appointments with the NEW appointments as supplied above!
        .then((res) => setState((prev) => (({ ...prev, appointments }))))
        .then(updateSpots())
    )
  };

  return { state, setDay, bookInterview, cancelInterview, updateSpots }
}