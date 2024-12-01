import React, { Fragment } from "react";

import Hero from "../components/Hero";
import Content from "../components/Content";
import TeamSolutions from "../components/team-solution";
import DownloadOptions from "../components/download-option";
import CallToAction from "../components/individual-solution";

const Home = () => (
  <Fragment>
    <Hero />
    <hr />
    <Content />
    <TeamSolutions />
    <CallToAction />
    <DownloadOptions />
  </Fragment>
);

export default Home;
