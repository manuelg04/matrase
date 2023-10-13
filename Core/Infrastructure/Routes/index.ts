/* eslint-disable @typescript-eslint/no-floating-promises */
import 'reflect-metadata';
import { Router } from 'express';

const router: Router = Router();

import('./auth').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./recovery').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./changePassword').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./authAdmin').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./otpAdmin').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./chatRouter').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./createNovelty').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./onlineHelp').then((routerModule): void => {
  router.use(routerModule.router);
});

import('./crudAdmin').then((routerModule): void => {
  router.use(routerModule.router);
});

export { router };

/**
 GET: users
 Post: users
 Put: users/:id
 Delete: users/:id
 Get: users/:id/posts
 get: posts/:id/comments
 */
