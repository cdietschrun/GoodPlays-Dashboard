import { Filter, ObjectId } from 'mongodb';
import playsCollection from './connections/mongo.js';

// TODO endgame/activegames here should be replaced, with a button to press "ended game session"
// that updates the gamesession._id's entry in the DB (just like with delete) with a new endTimestamp.
export async function upsertGameSession(_id: string | undefined, userId: string | undefined, gameName: string, startTimestamp: Date, endTimestamp: Date)
{
  console.log(gameName);
  
  const activityName = gameName.replace(':', '').replace('™', '');
  
    const play = {
        userId: userId,
        gameName: activityName,
        startTimestamp: startTimestamp,
        endTimestamp: endTimestamp
    }

    if (userId === undefined)
    {
      delete play.userId;
    }

    const id = new ObjectId(_id);
    const result = await playsCollection.updateOne(
      { _id: id },
      { $set: play },
      { upsert: true}
    );

    console.log(`[${new Date().toString()}] A document was ${result.upsertedCount > 0 ? "inserted" : "updated"} with the _id: ${id.toString()}}`);
};