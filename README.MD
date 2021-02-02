### Kinesis Producer - Consumer

Setup
===
`npm install`

Add `.env` file to the root of the application with the following contents
```
RESIDENT_APP_MONGO_HOST=<mongodb_host>
RESIDENT_APP_MONGO_DB=<mongodb_db>
RESIDENT_APP_MONGO_USER=<mongodb_user>
RESIDENT_APP_MONGO_PASS=<mongodb_pass>
RESIDENT_APP_KINESIS_STREAM_NAME=<stream_name>
```

Make sure to have aws credentials in `~/.aws/credentials`

Run
===
To run as a consumer `npm start -- consumer`

To run as a producer `npm start -- producer [maxRcordsToRead]` - there needs to be a file in the root directory called `resident-samples.log` of the following format `number,string,number` per line. eg: `1567365890,earth,0.018`