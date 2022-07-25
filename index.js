var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var axios = require("axios");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var cors = require("cors");
var app = express();

// view engine setup


  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "pug");
  app.use(cors("*"));
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/", indexRouter);
  app.use("/users", usersRouter);

  app.use(async (reg, res) => {
    var myHeaders = {};
    myHeaders["authority"] = "api.digikala.com";
    myHeaders["pragma"] = "no-cache";
    myHeaders["cache-control"] = "no-cache";
    myHeaders["accept"] = "application/json, text/plain, */*";
    myHeaders["x-auth-token"] =
      "2CBCABBEAB36E84348A70D289CD57437251001228F53FECA0CCD5EB4780634C2B19E1DBB7FCC855C3C1EA6B09C99FA31AA1CB553DC832C45BC06099BFC9A9E0B3D81BEF4078E72CB910F147410512A9C17409683810193AC33796C9B3B8A0C0905420ABB461E281C0F5766EBD5FC3A372075B68BF3C2655D4E7201231DC543DF132B24E8EE0185E108E86992D945D784E50114204C610252BCBB9B50CD3FA9211BD18746624E21B722A182F031DE0444EAC887CF215309FEA1058461988FFEE85F3A85389A46DD648F65C0A8C1D8ADC37422D09B6B336C9E9123A741618F34B975F78CB1A62F0AD38F67F81A09A1931C";
    myHeaders["x-application-type"] = "WebClient";
    myHeaders["user-agent"] =
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36";
    myHeaders["sec-fetch-site"] = "same-origin";
    myHeaders["sec-fetch-mode"] = "cors";
    myHeaders["sec-fetch-dest"] = "empty";
    myHeaders["referer"] = "https://www.digikala.com/";
    myHeaders["accept-language"] = "en-US,en;q=0.9";
    myHeaders["cookie"] =
      '_gcl_au=1.1.1764437611.1655120320; tracker_glob_new=9p5mOqB; _conv_r=s%3Awww.google.com*m%3Aorganic*t%3A*c%3A; _ym_d=1655120321; _ym_uid=1655120321984891052; _hjSessionUser_2754176=eyJpZCI6IjM3YWNmMTE3LWE2NzctNWFlNi1hZWE3LTg3MzA2NjU5NzdlYSIsImNyZWF0ZWQiOjE2NTY3NTkxOTgwNDAsImV4aXN0aW5nIjp0cnVlfQ==; affiliate_id=NDg5NGE5MjktZmNkMy00MzUyLTk2NTUtZDc4MDdlNGU1ZTJkIyMjOTUzOQ==; Digikala:User:Token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyMTU4OTI5NSwiZXhwaXJlX3RpbWUiOjE2NTkzNTE4NTUsInBheWxvYWQiOltdLCJwYXNzd29yZF92ZXJzaW9uIjoxLCJ0eXBlIjoidG9rZW4ifQ.YeEJwB9qYDI2MG7KJKpT3v9tdyVULRp4kfkkaQKkB_E; _gid=GA1.2.1132313653.1658570272; _sp_id.13cb=7b0f7c51-501e-490a-ae9d-b7038588e127.1655120320.21.1658700060.1658697470.cd58eb09-611c-48b0-8da1-5b0f2568a051; _ga=GA1.2.157970960.1655120321; _conv_v=vi%3A1*sc%3A18*cs%3A1658700011*fs%3A1655120321*pv%3A43*ps%3A1658696882; _ga_4S04WR965Q=GS1.1.1658707488.26.0.1658707488.0; _ga_LR50FG4ELJ=GS1.1.1658706310.30.0.1658707488.60; TS01e4b47a=0102310591a62e945057e687498256349e938ca3a5a13e84540381455181fbe3813d81982f5f7ee88963aa07bdec76cf69784adcccbdf276b7b2216be92c10523f07d9a810f0919344851e13f289919974870f7741';
    let response = await axios.get(`https://api.digikala.com/${reg.path}`, {
      headers: myHeaders,
      params: reg.query || {},
    });
    try {
      let response = await axios.get(`https://api.digikala.com/${reg.path}`, {
        headers: myHeaders,
        params: reg.query || {},
      });
      res.json(response.data);
    } catch (error) {
      res.json({ succeeded: false, error: "Invalid" });
    }
  });
  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  const port = process.env.PORT || 5000
  app.listen(port, () => {
    console.log(`App is Running on port ${port}`);
  });


  module.exports = app;