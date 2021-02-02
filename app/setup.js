const mongoose = require("mongoose");

mongoose
  .connect(
    `mongodb+srv://${process.env.RESIDENT_APP_MONGO_USER}:${process.env.RESIDENT_APP_MONGO_PASS}@${process.env.RESIDENT_APP_MONGO_HOST}/${process.env.RESIDENT_APP_MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .catch(console.error);
