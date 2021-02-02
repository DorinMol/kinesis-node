const Kinesis = require("lifion-kinesis");
const AWS = require("aws-sdk");
const EventModel = require("./models/event");

AWS.config.update({ region: "us-east-1" });

const kinesis = new Kinesis({
  limit: 10,
  streamName: process.env.RESIDENT_APP_KINESIS_STREAM_NAME,
  shardCount: 1,
  logger: {
    debug(data) {
      console.log("Debug: " + data);
    },
  },
});

module.exports = async () => {
  kinesis.on("data", async (data) => {
    if (data.records.length) {
      const records = data.records.map((record) => record.data);
      EventModel.insertMany(records, (err) => {
        if (err) console.error(err);
        console.log("Batch saved sucessfully!");
      });
    }
  });
  try {
    await kinesis.startConsumer();
  } catch (err) {
    kinesis.stopConsumer();
    console.error(err);
  }
};
