# Interview Scheduler
Interview Scheduler is a simple React and Javascript based app, intended as an exercise in effectively using React states and custom hooks. Using axios API calls to a development server to mimic operation, and Jest and Cypress testing libraries.
- - -
## Project Description

- User should start the application, and navigate to `http://localhost:8080/`
- By navigating to a day in the `dayList` in the left sidebar (upper nav bar on mobile view) and clicking on the `+` icon in an empty interview slot, the user can enter an interviewee's name and select from a list of the available interviewers for a given day. Once the required field contians a name, and an interviewer is selected, the user can `Save` the appointment.
- Saved appointments can be `Edited` or `Deleted` by clicking the corresponding icons on the lower right of an existing interivew block.
- - -
## Pretty Pictures
Adding and Deleting
!["Adding and Deleting Appointments"](https://raw.githubusercontent.com/Juno-60/scheduler/master/docs/add%20and%20delete.gif)


Changing Days and Editing an Existing Appointment
!["Changing Days and Editing an Existing Appointment"](https://raw.githubusercontent.com/Juno-60/scheduler/master/docs/move%20and%20edit.gif)
- - -

## Setup

Install all dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```