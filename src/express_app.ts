import 'dotenv/config';
import express from 'express';
import playsCollection from './connections/mongo.js';
import cors from 'cors';
//import mailDaily from './mail.js';a
import { upsertGameSession } from './game_api.js';
import axios from 'axios';
import path from 'path';
import { getGlobals } from 'common-es'
import { GameSession } from './models/GameSession.js';
import { FindOptions, ObjectId } from 'mongodb';
const { __dirname } = getGlobals(import.meta.url);
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import session from 'express-session';

export async function StartExpressServer()
{
  // Create an express app
  const app = express();

  // Get port, or default to 9000
  const PORT = process.env.PORT || 9000;

  app.use(cors());
  app.use(express.json());

  app.use(passport.initialize());
  // app.use(passport.session());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(session({
    secret: 'keyboard catchris123',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.authenticate('session'));

  passport.serializeUser(function(user: any, cb) {
    console.log('serialize user called');
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user: any, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

  passport.use(new LocalStrategy(function verify(username: any, password: any, cb: any) {
    console.log(`verify called: ${username} ${password}`);

    // This one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    if (username === 'a' && password === 'c') {
      return cb(null, { id: 1, username: 'a' });
    }
    return cb(null, false, { message: 'Incorrect email or password.' });
  }));

  // app.post('/login/password', passport.authenticate('local', {
  //   successRedirect: '/',
  //   failureRedirect: '/login'
  // }));

  app.post('/login/password', async (req, reply, next) => {
    passport.authenticate('local', function(err: any , user: any, info: any) {
      if (err) { return next(err) }
      if (!user) { return reply.json({"redirectUri": "/login"}) }
      reply.json({"redirectUri": "/", "user": user})

    })(req, reply, next);
  });

  // app.get('/protected', function(req, res, next) {
  //   passport.authenticate('local', function(err, user, info, status) {
  //     if (err) { return next(err) }
  //     if (!user) { return res.redirect('/signin') }
  //     res.redirect('/account');
  //   })(req, res, next);
  // });

  app.get('/data', async function (req, response)
  {
    const userId = req.query.userId;
    const query = { userId: userId };
    const options: FindOptions<GameSession> =
    {
      sort: { endTimestamp: -1 },
      projection: { gameName: 1, startTimestamp: 1, endTimestamp: 1, _id: 1 }
    };

    let results = await playsCollection.find<GameSession>(query, options).toArray();

    response.send(results).status(200);
  });

  // Add game session
  app.post('/game_sessions', async (req, reply) =>
  {
    const { gameName, startTimestamp, endTimestamp, userId } = req.body;

    upsertGameSession(undefined, userId as string, gameName as string, new Date(startTimestamp), new Date(endTimestamp));

    reply.sendStatus(200);
  });

  // Update game session
  app.put('/game_sessions/:id', async function (req, response)
  {
    console.log(req.body);

    const id = req.params.id;
    const { gameName, startTimestamp, endTimestamp } = req.body;

    upsertGameSession(id, undefined, gameName as string, new Date(startTimestamp), new Date(endTimestamp));

    response.sendStatus(200);
  });

  // Delete game session
  app.delete('/game_sessions/:id', async function (req, response)
  {
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    const result = await playsCollection.deleteOne(query);

    console.log(result);

    response.send(result).status(200);
  });

  app.get('/email', async function (req, response)
  {
    const userId = req.query.userId;
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
    for await (const doc of results)
    {
      html += doc.gameName += ', ';
    }

    if (html != '')
    {
      // mailDaily('test', html);
    }

    response.sendStatus(200);
  });

  app.get('/callback', async (request, reply) =>
  {
    const { code } = request.query;

    // Define your Discord application's client ID and client secret test
    const redirectUri = 'http://localhost:3000/callback'; // Must match the one in your Discord app settings

    // Use axios to send a POST request to Discord's token endpoint to exchange the code for an access token
    const response = await axios.post(
      'https://discord.com/api/oauth2/token',
      new URLSearchParams({
        client_id: process.env.APP_ID || '',
        client_secret: process.env.DISCORD_TOKEN || '',
        code: code?.toString() || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }).toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    // The response should contain the access token
    const accessToken = response.data.access_token;

    reply.send(accessToken).status(200);
  });

  
  if (process.env.NODE_ENV?.trim() === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '../client/build')));
    
    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
    });
  }

  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV?.trim() === "production") {
    console.log('production');
  } else {
    console.log('development');
  }

  app.listen(PORT, () =>
  {
    console.log(`[${new Date().toString()}] Listening on port: ${PORT}`);
  });

}

StartExpressServer();