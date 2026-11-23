const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const compression = require('compression');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis').RedisStore;
const redis = require('redis');

const connectDB = require('./db');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Configure Handlebars
app.engine('handlebars', engine({
    defaultLayout: false,
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve compiled frontend files
app.use(express.static(path.join(__dirname, '../hosted')));

// Redis Connection
const redisClient = redis.createClient({
    url: process.env.REDISCLOUD_URL,
});

redisClient.on('error', (error) => {
    console.error('Redis Client Error: ', error);
});

app.use(session({
    name: 'questlog.sid',
    store: new RedisStore({
        client: redisClient,
        prefix: 'questlog:sess:',
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
    },
}))

// Main application page
app.get('/', (req, res) => {
    res.render('index');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const startServer = async () => {
    try {
        if (!process.env.SESSION_SECRET) {
            throw new Error('SESSION_SECRET is missing!')
        }

        await connectDB();
        await redisClient.connect();

        console.log('Connected to Redis');

        app.listen(port, () => {
            console.log(`QuestLog server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong'})
    }
};

startServer();
