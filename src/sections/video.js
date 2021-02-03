import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Waypoint } from "react-waypoint";
import { Box } from "theme-ui";

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
      <Box sx={style.wrapper}>
        <ReactPlayer
          width="100%"
          height="100%"
          loop={true}
          playing={shouldPlay}
          url="homepagevideo.mp4"
        />
      </Box>
    </Waypoint>
  );
};
export default AutomaticPlayer;

const style = {
  wrapper: {
    margin: "20px",
    maxWidth: "465px",
  },
};
