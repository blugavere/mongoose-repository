# Mongoose Repository [![NPM version][npm-image]][npm-url][![dependencies Status](https://david-dm.org/blugavere/mongoose-repository/status.svg)](https://david-dm.org/blugavere/mongoose-repository) [![Coverage Status](https://coveralls.io/repos/github/blugavere/mongoose-repository/badge.svg?branch=master)](https://coveralls.io/github/blugavere/mongoose-repository?branch=master)[![NPM Downloads](https://img.shields.io/npm/dm/mongoose-repository.svg?style=flat)](https://www.npmjs.com/package/mongoose-repository)[![Build Status](https://travis-ci.org/blugavere/mongoose-repository.svg?branch=master)](https://travis-ci.org/blugavere/mongoose-repository)[![Patreon](https://img.shields.io/badge/patreon-support%20the%20author-blue.svg)](https://www.patreon.com/blugavere)

## Installation 

```sh
$ npm install --save mongoose-repository
```

## Usage

```js
const MongooseRepository = require('mongoose-repository');
```

## Getting Started

```js

'use strict';

const mongoose = require('mongoose');

const modelName = 'cats';

// configure a schema somewhere
const schema = new mongoose.Schema({
  name: { type: String }
});

// register it to mongoose
mongoose.model(modelName, schema);

// connect to mongodb
mongoose.connect('mongodb://localhost');

const MongooseRepository = require('mongoose-repository');
const repo = new MongooseRepository(mongoose, modelName);

// default json format
const cat = { name : 'Fido' };

repo.add(cat, (err, data) => {
  console.log(data);
  repo.disconnect();
});

```


## License

MIT © [Ben Lugavere](http://benlugavere.com/)


[npm-image]: https://badge.fury.io/js/mongoose-repository.svg
[npm-url]: https://npmjs.org/package/mongoose-repository
[travis-image]: https://travis-ci.org/blugavere/mongoose-repository.svg?branch=master
[travis-url]: https://travis-ci.org/blugavere/mongoose-repository
[daviddm-image]: https://david-dm.org/blugavere/mongoose-repository.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/blugavere/mongoose-repository
[coveralls-image]: https://coveralls.io/repos/blugavere/mongoose-repository/badge.svg
[coveralls-url]: https://coveralls.io/r/blugavere/mongoose-repository
