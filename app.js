import express from "express";
import expresslayouts from 'express-ejs-layouts';
import { connectUsingMongoose } from "./config/dbConfig.js";
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import LocalStretegy from './config/passport_local_stretegy.js';
import googleStretegy from './config/passport-google-oauth2-stretegy.js';
import { displayFlash } from './config/displayMsg.js';
import router from "./routes/index.js";
const app = express();

app.use(expresslayouts);

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.set("layout extractStyles", true);
app.set('layout extractScript', true);

app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: "nodeja auth",
    secret: 'balasomthing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(displayFlash);
app.use('/',router);
const PORT = 3500;

app.listen(PORT, () => {
    console.log('The App is Listening on Port', PORT);
    connectUsingMongoose();
});
