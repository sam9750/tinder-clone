import React from "react";

import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";

import "./SwipeButtons.css";
import { IconButton } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

function SwipeButtons() {
  return (
    <div className="swipeButtons">
      <Tooltip title="Not Interested">
        <IconButton className="swipeButtons__left">
          <ArrowBackIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Intel">
        <IconButton className="swipeButtons__start">
          <StarRateIcon fontSize="large" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Interested">
        <IconButton className="swipeButtons__right">
          <ArrowForwardIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default SwipeButtons;
