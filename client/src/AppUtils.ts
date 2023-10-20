import { GameSession } from './models/GameSession';

export async function fetchGameSessions(): Promise<GameSession[]> {
    const userId = "131989430171992064";
    const apiUrl = `/data?userId=${userId}`;
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