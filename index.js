require("dotenv").config();
require("./app/setup");
const consumer = require("./app/consumer");
const producer = require("./app/producer");

if (process.argv[2] === "consumer") {
  consumer();
} else if (process.argv[2] === "producer") {
  if ((maxReads = Number(process.argv[3]))) {
    producer(maxReads);
  } else {
    producer();
  }
} else {
  process.stdout.write("=== Usage ===\n");
  process.stdout.write("Producer: npm start -- producer [numberOfReads]\n");
  process.stdout.write("Consumer: npm start -- consumer\n");
  process.exit();
}
