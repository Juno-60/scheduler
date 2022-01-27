import React from "react";
import useVisualMode from "hooks/useVisualMode";

import Confirm from "./Confirm.js";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show"
import Form from "./Form.js";
import Status from "./Status.js";
import Error from "./Error.js";

import "./styles.scss";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => (transition(SHOW)))
      .catch((err) => (transition(ERROR_SAVE, true)));
  }


  function cancel(id) {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => (transition(EMPTY)))
      .catch((err) => (transition(ERROR_DELETE, true)));
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
          onEdit={() => transition(EDIT)}
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

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
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

      {mode === ERROR_DELETE && (
        <Error
          keyword="delete"
          onClose={back}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          keyword="save"
          onClose={back}
        />
      )}
    </article>
  );
}