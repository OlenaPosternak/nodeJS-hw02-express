const app = require("./app");
const { PORT = 3000 } = process.env;

require("dotenv").config();

const mongoose = require("mongoose");
const { DB_HOST } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });

    console.log("Database connection successful");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
