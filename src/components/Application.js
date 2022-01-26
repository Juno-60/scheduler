import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import "components/Appointment"
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";


export default function Application(props) {

  // set state for multiple components
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // sets state of "day"
  const setDay = day => setState({ ...state, day });

  // gets results of selector functions
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const todaysInterviewers = getInterviewersForDay(state, state.day)

  // function to book interviews, pass as props into each appointment component
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
        // .then((res) => setState((prev) => ({ ...prev, appointment })))
        .then((res) => (setState({...state, appointments})))
    )
  };

  // function to delete interviews
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
        .then((res) => setState((prev) => (({...prev, appointments}))))
        // .catch(err => console.log(err.message))
    )
  };

  // parsed version of appointments array to be rendered
  const parsedAppointments = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview)
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={todaysInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  // gets data from API, sets states of all once ALL data is retrieved (.then((all)...)
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

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {parsedAppointments}
        <Appointment
          key="last"
          time="5pm"
        />
      </section>
    </main>
  );
}
