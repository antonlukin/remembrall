/**
 * Remembrall telegram bot
 *
 * Store messages sent to bot in database
 *
 * @author Anton Lukin
 * @license MIT
 * @version 1.0.1
 */


/**
 * Require settings
 */
require('dotenv').config();

const app = require('./app/server');
const bot = require('./app/bot');

/**
 * Start express app
 */
app.listen(process.env.PORT || 3000);

/**
 * Start telegram polling
 */
bot.launch();