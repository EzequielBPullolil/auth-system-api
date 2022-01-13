const rateLimit = require('express-rate-limit')
module.exports = rateLimit({
	windowsMs: 15 * 60 * 1000,
	max: 100,
	standarHeader: true,
	legacyHeaders: false
})
