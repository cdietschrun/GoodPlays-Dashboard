import { createContext } from "react";
import { GameSession } from './GameSession';

type GoodplaysContextType = {
  gameSessions: GameSession[];
  setGameSessions: React.Dispatch<React.SetStateAction<GameSession[]>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GoodplaysContext = createContext<GoodplaysContextType>({
  gameSessions: [],
  setGameSessions: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {}
});
