const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const morgan = require("morgan");
const passport = require("passport");
const exphbs = require("express-handlebars");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const path = require("path");
const methodOverride = require("method-override")
const mongoose = require("mongoose");
// Load config file

dotenv.config({ path: "./config/.env" });

require("./config/passport")(passport);

connectDB();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const {
  formatDate,
  truncate,
  stripTags,
  editIcon,
  select,
} = require("./helpers/hbs");

app.engine(
  ".hbs",
  exphbs({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })

app.use(express.static(__dirname + '/public'));

app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));
app.use("/ideas", require("./routes/ideas"));
app.use("/search", require("./routes/search"));


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server Started on port ${PORT} it is also running in ${process.env.NODE_ENV} mode`
  );
});
