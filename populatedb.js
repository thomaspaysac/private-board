#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Message = require('./models/message');
const User = require('./models/user');

const users = [];
const messages = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");
  await createUsers();
  await createMessages();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(index, first_name, last_name, username, password, membership) {
  const user = new User({
    first_name,
    last_name,
    username,
    password,
    membership,
  });
  await user.save();
  users[index] = user;
}

async function messageCreate(index, title, text, author) {
  const message = new Message({
    title,
    timestamp: Date.now(),
    text,
    author,
  });
  await message.save();
  messages[index] = message;
}

async function createUsers() {
  await Promise.all([
    userCreate(0, 'John', 'Smith', 'User0', 'password0', 'Basic'),
    userCreate(1, 'Liza', 'Simpson', 'User1', 'password1', 'Gold'),
    userCreate(2, 'Hervé', 'Machin', 'User2', 'password2', 'Basic'),
  ])
}

async function createMessages() {
  await Promise.all([
    messageCreate(0, 'Message 1', 'Text 1', users[0]),
    messageCreate(1, 'Message 2', 'Test 2', users[1]),
    messageCreate(2, 'Message 3', 'Test 3', users[2]),
    messageCreate(4, 'Message 4', 'Test 4', users[1]),
  ])
}