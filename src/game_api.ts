import { Filter, ObjectId } from 'mongodb';
import playsCollection from './connections/mongo.js';

type ActiveGames = {[key: string]: ObjectId};
let activeGames: ActiveGames = {};

export async function startOrEndGame(userId: string, gameName: string, isStart: boolean) {
  try {
    console.log(gameName);
    
    const activityName = gameName.replace(':', '').replace('™', '');
    
    // create a document to insert
    if (isStart)
    {
        const play = {
            userId: userId,
            gameName: activityName,
            startTimestamp: new Date(),
            endTimestamp: new Date()
        }

        const result = await playsCollection.insertOne(play);
        console.log(`[${new Date().toString()}] A document was inserted with the _id: ${result.insertedId.toString()}`);
        activeGames[userId] = result.insertedId;
    }
    else
    {
      const filter: Filter<Document> = { userId: userId, gameName: activityName, _id: activeGames[userId] };
      console.log(filter);
      
      const updatePlay = {
        $set: {
           endTimestamp: new Date()
        },
      };
      
      const result = await playsCollection.updateOne(filter as any, updatePlay);
      console.log(`[${new Date().toString()}] ${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);
      delete activeGames[userId];
    }
  } finally {
    
  }
};