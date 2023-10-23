import { createContext } from "react";
import { GameSession } from './GameSession';
import { GoodplaysUser } from './GoodplaysUser';

type GoodplaysContextType = {
  gameSessions: GameSession[];
  setGameSessions: React.Dispatch<React.SetStateAction<GameSession[]>>;

  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;

  goodplaysUser: GoodplaysUser;
  setGoodplaysUser: React.Dispatch<React.SetStateAction<GoodplaysUser>>;

  // discordUserId: string;
  // setDiscordUserId: React.Dispatch<React.SetStateAction<string>>;
};

export const GoodplaysContext = createContext<GoodplaysContextType>({
  gameSessions: [],
  setGameSessions: () => {},

  isLoggedIn: false,
  setIsLoggedIn: () => {},

  goodplaysUser: { _id: "", userName: "", email: "", discordUserId: "" },
  setGoodplaysUser: () => {},
  
  // discordUserId: "",
  // setDiscordUserId: () => {},
});
