import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const fs = require('fs')
const path = require('path');
const credentials = 'C:/Users/kacsk/OneDrive/Pulpit/studia/ADT/projekt_v2/database/X509-cert-637210842762971277.pem'

const client = new MongoClient('mongodb+srv://adt.ijsvr.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority', {
  sslKey: credentials,
  sslCert: credentials
});

async function database(req, res, next) {
  await client.connect();
  req.dbClient = client;
  req.db = client.db('ADT');
  console.log("Connected correctly to server");
  return next();
}

const middleware = nextConnect();
middleware.use(database);

export default middleware;