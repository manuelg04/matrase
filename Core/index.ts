/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable n/handle-callback-err */
/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata';
import { Sequelize } from 'sequelize-typescript';
import * as DBConfig from './Infrastructure/Database/config/databse-config';
import { Container } from 'typedi';
import path from 'path';
import express from 'express';
import { router as mainRouter } from './Infrastructure/Routes';
import { createServer } from 'http';
import { Server as WebSocketServer } from 'socket.io';
import cors from 'cors';

import multer from 'multer';
import UsersModel from '../Core/Infrastructure/Database/Models/UserModels';
import jwt from 'jsonwebtoken';
import { ChatSocketController } from './Infrastructure/Controllers/ChatSocketController';

const sequelize = new Sequelize(DBConfig.development);
sequelize.addModels([path.join(__dirname, './Infrastructure/Database/Models')]);

Container.set(Sequelize, sequelize);

sequelize
  .authenticate()
  .then((): void => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

/* const app: App = new App();
void app.setup().then(); */

const app = express();

app.use(cors());

app.use(express.json());
// Middleware principal de tus rutas
app.use(mainRouter);

app.use(express.static('public'));
const server = createServer(app);
const httpServer = server.listen(process.env.PORT, () => {});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Aquí se especifica el directorio donde se almacenarán los archivos cargados
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Usa el nombre original del archivo
  }
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('Archivo subido con éxito!');
});

const io = new WebSocketServer(httpServer, {
  cors: {
    origin: '*', // Permite a cualquier dominio conectarse
    methods: ['GET', 'POST']
  }
});

const chatSocketController = new ChatSocketController();
chatSocketController.initializeSocket(io);

// Middleware para verificar el token
const SECRET_KEY = process.env.SECRET_KEY_JWT_API;
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  try {
    jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

// logica online offline

io.on('connection', (socket) => {
  socket.on('userConnected', async ({ userId }) => {
    socket.userId = userId;
    try {
      await UsersModel.update({ status: 1 }, { where: { id: userId } });
    } catch (error) {}
  });

  socket.on('disconnect', async () => {
    if (socket.userId) {
      try {
        await UsersModel.update(
          { status: 0 },
          { where: { id: socket.userId } }
        );
      } catch (error) {}
    }
  });
  app.use((err, req, res, next) => {
    res.status(500).send('Something broke!');
  });
});
