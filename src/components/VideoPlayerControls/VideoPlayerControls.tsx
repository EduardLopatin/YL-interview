import React, { useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";

import VideoPlayerControlBtn from "../VideoPlayerControlBtn/VideoPlayerControlBtn";
import usePlayerStore from "../../store/player.store";
import { convertSecondsToTime } from "../../utils/player.utils";

import play_icon from "../../assets/icons/play_arrow.svg";
import pause_icon from "../../assets/icons/pause.svg";
import volumeUp_icon from "../../assets/icons/volume_up.svg";
import volumeMute_icon from "../../assets/icons/volume_mute.svg";
import settings_icon from "../../assets/icons/settings.svg";

import "./VideoPlayerControls.css";

const VideoPlayerControls = () => {
  const [
    isPlaying,
    isMuted,
    currentTime,
    duration,
    play,
    pause,
    mute,
    unmute,
    levels,
    currentQualityIndex,
    setCurrentLevel,
  ] = usePlayerStore(
    useShallow((state) => [
      state.isPlaying,
      state.isMuted,
      state.currentTime,
      state.duration,
      state.play,
      state.pause,
      state.mute,
      state.unmute,
      state.levels,
      state.currentLevel,
      state.setCurrentLevel,
    ]),
  );

  const [settingsToggle, setSettingsToggle] = useState(false);

  const durationTime = useMemo(
    () => convertSecondsToTime(duration),
    [duration],
  );

  const handlePlayPause = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const handleMute = () => {
    if (isMuted) {
      unmute();
    } else {
      mute();
    }
  };

  return (
    <div className="video-player-controls">
      <div className="left-controls">
        <VideoPlayerControlBtn
          src={isPlaying ? pause_icon : play_icon}
          alt="play/pause"
          onClick={handlePlayPause}
        />
        <VideoPlayerControlBtn
          src={isMuted ? volumeMute_icon : volumeUp_icon}
          alt="mute/unmute"
          onClick={handleMute}
        />
        <span className="time-widget">
          {convertSecondsToTime(currentTime)} / {durationTime}
        </span>
      </div>
      <div className="divider" />
      <div className="right-controls">
        <div className={`quality-menu ${settingsToggle ? "show" : ""}`}>
          {levels.map((level) => (
            <button
              key={level.index}
              onClick={() => setCurrentLevel(level.index)}
              style={{
                fontWeight:
                  currentQualityIndex === level.index ? "bold" : "normal",
              }}
            >
              {level.label}
            </button>
          ))}
        </div>
        <VideoPlayerControlBtn
          src={settings_icon}
          alt="settings"
          onClick={() => setSettingsToggle(!settingsToggle)}
        />
      </div>
    </div>
  );
};

export default VideoPlayerControls;
