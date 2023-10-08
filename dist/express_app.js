import 'dotenv/config';
import express from 'express';
import playsCollection from './routes/connections/mongo.js';
import cors from 'cors';
//import mailDaily from './mail.js';a
//import { startOrEndGame } from './events/presenceUpdate.js';
import axios from 'axios';
import path from 'path';
import { getGlobals } from 'common-es';
const { __dirname } = getGlobals(import.meta.url);
export async function StartExpressServer() {
    // Create an express app
    const app = express();
    // Get port, or default to 9000
    const PORT = process.env.PORT || 9000;
    app.use(cors());
    app.get('/data', async function (req, response) {
        const userId = req.query.userId;
        const query = { userId: userId };
        const options = {
            sort: { endTimestamp: -1 },
            projection: { gameName: 1, startTimestamp: 1, endTimestamp: 1, _id: 0 }
        };
        let results = await playsCollection.find(query, options).toArray();
        response.send(results).status(200);
    });
    app.get('/email', async function (req, response) {
        const userId = req.query.userId;
        // let collection = await db.collection('game_play');a
        const results = playsCollection.aggregate([
            {
                $match: {
                    $expr: {
                        $gt: [
                            "$startTimestamp",
                            { $dateSubtract: { startDate: "$$NOW", unit: "day", amount: 1 } }
                        ]
                    }, userId: userId
                }
            }
        ]).sort({ "startTimestamp": -1 });
        let html = '';
        for await (const doc of results) {
            html += doc.gameName += ', ';
        }
        if (html != '') {
            // mailDaily('test', html);
        }
        response.sendStatus(200);
    });
    app.post('/manual_game_log', async (request, reply) => {
        const { userId, gameName, isGameStart } = request.query;
        console.log(gameName);
        let activity = { name: gameName };
        //startOrEndGame(userId, activity, isGameStart == "true" ? true : false);
        reply.sendStatus(200);
    });
    app.get('/callback', async (request, reply) => {
        const { code } = request.query;
        // Define your Discord application's client ID and client secret test
        const redirectUri = 'http://localhost:3000/callback'; // Must match the one in your Discord app settings
        // Use axios to send a POST request to Discord's token endpoint to exchange the code for an access token
        const response = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
            client_id: process.env.APP_ID || '',
            client_secret: process.env.DISCORD_TOKEN || '',
            code: code?.toString() || '',
            redirect_uri: redirectUri,
            grant_type: 'authorization_code',
        }).toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // The response should contain the access token
        const accessToken = response.data.access_token;
        reply.send(accessToken).status(200);
    });
    if (process.env.NODE_ENV?.trim() === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, 'client/build')));
        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
            res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
    }
    console.log(process.env.NODE_ENV);
    if (process.env.NODE_ENV?.trim() === "production") {
        console.log('production');
    }
    else {
        console.log('development');
    }
    app.listen(PORT, () => {
        console.log(`[${new Date().toString()}] Listening on port: ${PORT}`);
    });
}
StartExpressServer();
