'use strict';

const autoBind = require('auto-bind');
const pg = require('polygoat');

/**
 * IRepository implementation for Mongoose
 * @class MongooseRepository
 */
class MongooseRepository {
  constructor(mongoose, model) {
    if (!mongoose || !model) {
      throw new Error('Mongoose model type cannot be null.');
    }
    this.mongoose = mongoose;

    if (typeof model === 'string') {
      this.collection = mongoose.model(model);
    } else {
      this.collection = model;
    }

    autoBind(this);
  }

  /**
   * Truncates a collection.
   * @param {function} cb - callback
   * @returns {void}
   */
  clear(cb) {
    return pg(done => this.collection.find({}).remove(done), cb);
  }

  /**
   * Counts number of documents
   * @param {function} cb - callback
   * @returns {void}
   */
  count(cb) {
    return pg(done => this.collection.count(done), cb);
  }

  /**
   * Disconnects from mongodb.
   * @param {function} cb - callback
   * @returns {void}
   */
  disconnect(cb) {
    return pg(done => this.mongoose.connection.close(done), cb);
  }

  /**
   * Finds all instances in the collection.
   * @param {function} cb - callback
   * @returns {void}
   */
  findAll(cb) {
    return pg(done => this.collection.find({}).exec((err, res) => {
      if (err) {
        return done(err);
      }
      const obj = JSON.parse(JSON.stringify(res));
      return done(null, obj);
    }), cb);
  }

  /**
   * Find an object.
   * @param {string} id - Object Id
   * @param {function} cb - callback
   * @returns {void}
   */
  findOne(id, cb) {
    const self = this;
    return pg(done => self.collection.findOne({
      _id: id
    }).lean().exec((err, res) => {
      if (err) {
        return done(err);
      }
      done(null, JSON.parse(JSON.stringify(res)));
    }), cb);
  }

  /**
   * Create an entity.
   * @param {object} entity - Object to create.
   * @param {function} cb - callback
   * @returns {void}
   */
  add(entity, cb) {
    return pg(done => this.collection.create(entity, (err, res) => {
      if (err) {
        return done(err);
      }
      const obj = JSON.parse(JSON.stringify(res));
      done(null, obj);
    }), cb);
  }

  /**
   * Partially update an object.
   * @param {string} id - Object Id
   * @param {object} obj - Key/Value pairs to update
   * @param {function} cb - callback
   * @returns {void}
   */
  patch(id, obj, cb) {
    return pg(done => this.collection.findOneAndUpdate({
        _id: id
      }, {
        $set: obj
      }, {
        new: true,
        lean: true
      },
      (err, res) => {
        if (err) {
          return done(err);
        }
        const obj = JSON.parse(JSON.stringify(res));
        done(null, obj);
      }), cb);
  }

  /**
   * Update an entity.
   * @param {object} entity - Object to update.
   * @param {function} cb - callback
   * @returns {void} - async
   */
  update(entity, cb) {
    const self = this;
    return pg(done => self.collection.findByIdAndUpdate(entity._id, entity, {
      new: true,
      passRawResult: true,
      lean: true
    }).exec((err, res) => {
      if (err) {
        return done(err);
      }
      const obj = JSON.parse(JSON.stringify(res));
      done(null, obj);
    }), cb);
  }

  /**
   * Delete an entity.
   * @param {string} id - Entity Id
   * @param {function} cb - callback
   * @returns {void} - async
   */
  remove(id, cb) {
    const self = this;
    return pg(done => self.collection.findByIdAndRemove(id, (err, res) => {
      if (err) {
        return done(err);
      }
      const obj = JSON.parse(JSON.stringify(res));
      done(null, obj);
    }), cb);
  }
}

module.exports = MongooseRepository;
