import React from "react";

import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show"

import "./styles.scss";


export default function Appointment(props) {

  return (
    <article className="appointment">
            <Header time={props.time} />
      {props.interview ? <Show student={props.interview.student}/> : <Empty /> }
    </article>
  );
}