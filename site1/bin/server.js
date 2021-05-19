'use strict';
const Koa = require('koa');
const Router = require('@koa/router');
const json = require('koa-json');
const client = require("prom-client");
const metrics = require('./metrics');
const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  metrics.visit();
  ctx.body = 'Hello World'
});

router.get('/metrics', (ctx) => {
    ctx.body = client.register.metrics();
});

app
  .use(json())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8000);
