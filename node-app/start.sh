#!/bin/bash

source app.env

cp -r /nodecache/node_modules/. /application/node_modules/

npm run build && npm run start:server
