export function getAppointmentsForDay(state, day) {
  const resultArray = [];
  let dayNumber = 0;

  const appointmentGetter = () => {
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === day) {
        // set variable containing the array index of the given day
        dayNumber = i;
        // returns the array of appointments for given day
        return state.days[i].appointments
      }
      // returns null if previous conditions don't work out
    } return null;
  }

  // checks for a non-null value from appointmentGetter
  if (appointmentGetter()) {
    for (let i = 0; i < state.days[dayNumber].appointments.length; i++) {
      // pushes appointment to array if its key matches the value in state.days.appointments array currently being iterated over
      resultArray.push(state.appointments[appointmentGetter()[i]])
    }
  }
  return resultArray;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  let interviewerNumber = interview.interviewer
  return {
    student: interview.student,
    interviewer: state.interviewers[interviewerNumber]
  }
}