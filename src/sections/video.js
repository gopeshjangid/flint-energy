import React, { useState } from "react";
import { Waypoint } from "react-waypoint";
import ReactPlayer from "react-player";

const AutomaticPlayer = function (props) {
  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };

  return (
    <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
      <div>
        <ReactPlayer loop={true} playing={shouldPlay} url="1.mp4" />
      </div>
    </Waypoint>
  );
};
export default AutomaticPlayer;
