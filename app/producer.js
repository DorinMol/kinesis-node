const Kinesis = require("lifion-kinesis");
const AWS = require("aws-sdk");
const lineReader = require("line-reader");
const { join } = require("path");

AWS.config.update({ region: "us-east-1" });

const kinesis = new Kinesis({
  streamName: process.env.RESIDENT_APP_KINESIS_STREAM_NAME,
  logger: {
    debug(data) {
      console.log("Debug: " + data);
    },
  },
});

module.exports = (maxRead = 0) => {
  let currentLine = 0;
  lineReader.eachLine(
    join(__dirname, "..", "resident-samples.log"),
    async (line) => {
      try {
        if (maxRead) {
          currentLine++;
          if (currentLine >= maxRead) return false;
        }
        //sample: 1567365890,earth,0.018
        const [timestamp, type, value] = line.split(",");
        const record = {
          data: JSON.stringify({ timestamp, type, value }),
          streamName: process.env.RESIDENT_APP_KINESIS_STREAM_NAME,
          partitionKey: "shardId-000000000000",
        };
        await kinesis.putRecord(record);
      } catch (err) {
        console.error("Error while sending records: ", err);
      }
    }
  );
};
