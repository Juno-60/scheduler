import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Confirm from "./Confirm.js";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show"
import Form from "./Form.js";
import Status from "./Status.js";

import "./styles.scss";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => (transition(SHOW)));
  }


  function cancel(id) {
    transition(DELETING);
    props.cancelInterview(props.id)
    .then(() => (transition(EMPTY)));
  }


  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
      <Header time={props.time} />

      {mode === EMPTY && (
        <Empty 
          onAdd={() => transition(CREATE)} 
          />
      )}
      
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}

      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save}
        />
      )}
      
      {mode === SAVING && (
        <Status
        message="Saving"
        />
      )}

      {mode === DELETING && (
        <Status
        message="Deleting"
        />
      )}

      {mode === CONFIRM && (
        <Confirm
        onCancel={back}
        onConfirm={cancel}
        />
      )}

    </article>
  );
}