import { GameSession } from './models/GameSession';

export async function fetchGameSessions(discordUserId: string): Promise<GameSession[]> {
    const apiUrl = `/data?userId=${discordUserId}`;
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
  
      const data = await response.json();
      return data; // Return the fetched game sessions
    } catch (error) {
      console.error("Error fetching game sessions:", error);
      return []; // Return an empty array if there was an error
    }
  }