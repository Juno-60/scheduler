import React from "react";
import useVisualMode from "hooks/useVisualMode";

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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
    .then(() => (transition(SHOW)));
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

    </article>
  );
}