import "../styles/GameSessionCard.css";

import React from "react";
import { GameSession } from "../models/GameSession";
import { format, differenceInMinutes } from "date-fns";

interface GameSessionCardProps {
  session: GameSession;
}

// Helper function to format session duration
const formatSessionDuration = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hour${hours !== 1 ? "s" : ""}${
      remainingMinutes > 0 ? ` and ${remainingMinutes} minutes` : ""
    }`;
  }
};

const GameSessionCard: React.FC<GameSessionCardProps> = ({ session }) => {
  // Parse the dateTime strings into JavaScript Date objects
  const startTime = new Date(session.startTimestamp);
  const endTime = new Date(session.endTimestamp);

  // Format the start time and end time in a human-readable format
  const formattedStartTime = format(
    startTime,
    "EEEE, MMMM do yyyy 'at' h:mm a"
  );
  const formattedEndTime = format(endTime, "h:mm a");

  // Calculate session duration in minutes
  const sessionDurationMinutes = differenceInMinutes(endTime, startTime);
  const formattedSessionDuration =
    sessionDurationMinutes < 1
      ? "< 1 minute"
      : formatSessionDuration(sessionDurationMinutes);

  return (
    <div className="game-session-card">
      <h2>Game Session: {session.gameName}</h2>
      <p className="session-duration">
        Session Duration:{" "}
        <span className="duration-text">{formattedSessionDuration}</span>
      </p>
      <p>Start Time: {formattedStartTime}</p>
      <p>End Time: {formattedEndTime}</p>
      <p>All Time Game Time Played: {session.overallGameTime} minutes</p>
    </div>
  );
};

export default GameSessionCard;