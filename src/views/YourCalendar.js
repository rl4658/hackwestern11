import React from "react";
import { withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import CalendarApp from '../components/Calendar/calendar-app'
import "./backend_calendar.css";

export const ExternalApiComponent = () => {

  return (
    <>
      <CalendarApp />
    </>
  );
};

export default withAuthenticationRequired(ExternalApiComponent, {
  onRedirecting: () => <Loading />,
});
