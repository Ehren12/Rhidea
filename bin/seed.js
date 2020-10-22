#!/usr/bin/env node

let faker = require("faker");
let Post = require("../models/Idea");

// connect to MongoDB


// remove all data from the collection first
Idea.remove({})
  .then(() => {
    let posts = [];
    for (let i = 0; i < 30; i++) {
      posts.push({
        text: faker.lorem.sentence(),
        posted_at: faker.date.past(),
        likes_count: Math.round(Math.random() * 20),
        author: faker.name.findName(),
      });
    }
    return Idea.create(posts);
  })
  .then(() => {
    process.exit();
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
