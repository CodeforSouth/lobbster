// module.exports = {
//   mongoURI: process.env.MONGO_URI
//   expressSessionSecret: process.env.EXPRESS_SESSION_SECRET
// };

import MONGO_URI from "./dev-keys.js";

module.exports = {
  mongoURI: MONGO_URI,
  expressSessionSecret: "devTest"
};
