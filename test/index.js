'use strict';

const Repo = require('../lib/MongooseRepository');
const mongoose = require('mongoose');
mongoose.Promise = Promise;
const Assertions = require('../lib/test/Assertions');

const modelName = 'cats';
const schema = new mongoose.Schema({
  name: {
    type: String
  }
});

if (!mongoose.modelSchemas[modelName]) {
  mongoose.model(modelName, schema);
}

/**
 * NODE_ENV=test mocha --require babel-register test/mongoose.js --watch
 */
let connStr = 'mongodb://localhost/test';
if (process.env.NODE_ENV === 'docker') {
  console.log('Using docker configuration!');
  connStr = 'mongodb://mongo:27017/test';
}

describe('Mongoose Repository', () => {
  let repo;
  before(done => {
    repo = new Repo(mongoose, modelName);
    const db = mongoose.connection;
    db.once('open', () => {
      done();
    });

    mongoose.connection.close(() => {
      mongoose.connect(connStr);
    });
  });

  describe('generic assertions', () => {
    const client = {
      name: 'foo'
    };
    const bag = {
      client
    };
    Assertions.assertions.forEach(x => {
      it(x.assertion, done => {
        x.method(repo, bag)(done);
      });
    });
  });
});
