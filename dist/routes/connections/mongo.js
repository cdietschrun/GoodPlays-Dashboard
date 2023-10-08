import { MongoClient } from "mongodb";
const connectionString = process.env.ATLAS_URI || `mongodb+srv://cdietschrunfast:${process.env.MONGO_DB_PASSWORD}@goodplays.yhu6h4r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(connectionString);
await client.connect();
const db = client.db("goodplays_database");
const playsCollection = db.collection("game_play");
export default playsCollection;
