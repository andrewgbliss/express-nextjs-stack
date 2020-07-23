import express, { Response, Request, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from './middleware/logger';
import expressjwt from 'express-jwt';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import socket from 'socket.io';
import next from 'next';
import db from './db';
import email from './email';
import routes from './routes';

const dev = process.env.NODE_ENV !== 'production';
const ssr = next({ dev });
const handle = ssr.getRequestHandler();

const app = express();
const http = require('http').Server(app);

/**
 * Environment
 */
const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const SESSION_TIMEOUT = process.env.SESSION_TIMEOUT || 3600 * 24; // 24 hours

/**
 * Express Variables
 */
app.set('port', PORT);
app.set('env', NODE_ENV);
app.set('db', db);
app.set('email', email);

/**
 * Middleware
 */
app.use(cors());
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * JWT Authentication
 */
app.use(
  expressjwt({
    algorithms: ['HS256'],
    secret: JWT_SECRET,
    credentialsRequired: false,
    getToken(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer'
      ) {
        return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        return req.query.token;
      }
      return null;
    },
  })
);

/**
 * Refresh JWT for each use
 */
app.use(async (req: Request, res: Response, next: NextFunction) => {
  req.refreshJWT = (id: number, accountId: number) => {
    const token = jwt.sign(
      {
        id,
        account: {
          id: accountId,
        },
        createdAt: new Date(),
      },
      JWT_SECRET,
      {
        expiresIn: SESSION_TIMEOUT,
      }
    );
    res.set('JWT_TOKEN', token);
  };
  if (req.user) {
    req.refreshJWT(req.user.id, req.user.account.id);
    next();
  } else {
    next();
  }
});

app.use('/', routes);

let server: any;
let io: any;
(async () => {
  // Start NextJs handler
  await ssr.prepare();

  app.get('*', (req: Request, res: Response) => {
    return handle(req, res);
  });

  // Start the express server
  server = app.listen(PORT, () => {
    console.log(
      `Express Server started on Port ${app.get(
        'port'
      )} | Environment : ${app.get('env')}`
    );
  });

  // Start the socket server
  io = await socket(http);
  app.set('socket.io', io);
  // Debug socket io connections
  // socketio.on('connection', (socket) => {
  //   console.log('a user connected');
  //   socket.on('disconnect', () => {
  //     console.log('user disconnected');
  //   });
  //   socket.on('message', (msg) => {
  //     socketio.emit('message', msg);
  //   });
  //   socket.on('info', (msg) => {
  //     socketio.emit('info', {
  //       env: process.env.NODE_ENV,
  //       hostname: require('os').hostname(),
  //     });
  //   });
  // });
  console.log(`Socket Server started | Environment : ${app.get('env')}`);
})();

export default {
  app,
  server,
  io,
};
