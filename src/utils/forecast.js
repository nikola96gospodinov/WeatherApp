const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = process.env.DARK_SKY_API + latitude + ',' + longitude + '?units=auto'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body)
        }
    })
}

module.exports = forecast