/**
 * Remembrall telegram bot
 *
 * Store messages sent to bot in database
 *
 * @author Anton Lukin
 * @license MIT
 * @version 1.0.0
 */


/**
 * Require settings
 */
require('dotenv').config();

const app = require('./modules/server');
const bot = require('./modules/bot');

/**
 * Start express app
 */
app.listen(process.env.PORT || 3000);

/**
 * Start telegram polling
 */
bot.launch();