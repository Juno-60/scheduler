import React from "react";

import "../styles/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem(props) {

  let { id, name, avatar, selected, setInterviewer } = props;

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  });

  let interviewerImgClass = classNames("interviewers__item-image", {
    "interviewers__item--selected-image": selected
  });

  return (
    <li className={interviewerClass} onClick={setInterviewer}>
      <img
        className={interviewerImgClass}
        src={avatar}
        alt={name}
      />
      {selected ? name : ""}
    </li>
  );
};