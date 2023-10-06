import { createContext } from "react";
import { GameSession } from './GameSession';

type GameSessionsContextType = {
  gameSessions: GameSession[];
  setGameSessions: React.Dispatch<React.SetStateAction<GameSession[]>>;
};

export const GameSessionsContext = createContext<GameSessionsContextType>({
  gameSessions: [],
  setGameSessions: () => {},
});
