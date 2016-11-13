const profile = process.env.NODE_ENV || 'development'
require(`./webpack/${profile}.profile.js`)
