var request = require("request"); // "Request" library
var client_id = "e26e4e3168be4fc3b9a9c766601fa05a";
var client_secret = "a478ac602633484da0b64a6b9c2679bb";

var authOptions = {
  url: "https://accounts.spotify.com/api/token",
  headers: {
    Authorization:
      "Basic " + new Buffer(client_id + ":" + client_secret).toString("base64"),
  },
  form: {
    grant_type: "client_credentials",
  },
  json: true,
};

request.post(authOptions, function (error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log(body);
  }
});
