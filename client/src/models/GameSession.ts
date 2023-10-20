export interface GameSession {
    _id: string;
    gameName: string;
    sessionDuration: number;
    overallGameTime: number;
    startTimestamp: string;
    endTimestamp: string;
}