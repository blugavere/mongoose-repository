'use strict';

const mongoose = require('mongoose');
const Repo = require('../lib');
const Assertions = require('../lib/test/Assertions');

mongoose.Promise = Promise;

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
 * NODE_ENV=test mocha test/index.js --watch
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

  after(() => {
    mongoose.connection.close();
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
