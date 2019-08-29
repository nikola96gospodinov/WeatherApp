const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const rainProbability = document.querySelector('#rain-prob')
const rainProbabilityLabel = document.querySelector('#rain-prob-label')
const minMaxTemperature = document.querySelector('#min-max-temp')
const minMaxTemperatureLabel = document.querySelector('#min-max-temp-label')
const timeDate = document.querySelector('#time-date')
const loadingText = document.querySelector('#loading')
const loader = document.querySelector('#loader')
const weatherReport = document.querySelector('#weather-report')
const weatherIcon = document.querySelector('#weather-icon')
const currentConditions = document.querySelector('#current-conditions')
const currentSummary = document.querySelector('#summary')
const wind = document.querySelector('#wind')
const windLabel = document.querySelector('#wind-label')
const yourLocation = document.querySelector('#your-location')
const currentTemperature = document.querySelector('#current-temperature')
const icon = new Skycons({
    'monochrome': false,
    'colors': {
        'main': '#fff',
        'cloud': '#c1c1c1',
        'rain': '#ADD8E6',
        'sun': '#e4c502',
        'moon': '#494960'
    }
})

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    weatherReport.style.display = 'block'
    loader.style.display = 'block'
    loadingText.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    rainProbability.textContent = ''
    rainProbabilityLabel.textContent = ''
    minMaxTemperature.textContent = ''
    minMaxTemperatureLabel.textContent = ''
    currentSummary.textContent = ''
    currentTemperature.textContent = ''
    timeDate.textContent = ''
    currentConditions.textContent = ''
    wind.textContent = ''
    windLabel.textContent = ''
    yourLocation.textContent = ''
    weatherIcon.style.display = 'none'
    window.scrollTo(0,document.body.scrollHeight);

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            loader.style.display = 'none'
            messageOne.textContent = ''
            messageTwo.textContent = ''
            loadingText.textContent = data.error
        } else {
            loader.style.display = 'none'
            loadingText.textContent = ''
            messageOne.textContent = data.location.split(",").shift()
            messageTwo.textContent = data.forecast.daily.data[0].summary
            rainProbability.textContent = data.forecast.currently.precipProbability + '%'
            rainProbabilityLabel.textContent = 'Rain Probability: '
            minMaxTemperature.textContent = Math.round(parseFloat(data.forecast.daily.data[0].temperatureHigh)) + '°/' + Math.round(parseFloat(data.forecast.daily.data[0].temperatureLow)) + '°'
            minMaxTemperatureLabel.textContent = 'Temperature: '
            let currentTime = parseInt(data.forecast.currently.time)
            timeDate.textContent = moment.unix(currentTime).format('LLLL').split(",").shift() + ', ' + moment.unix(currentTime).format('D MMMM')
            weatherIcon.style.display = 'inline-block'
            currentSummary.textContent = data.forecast.currently.summary
            currentConditions.textContent = 'Current Conditions'
            windLabel.textContent = 'Wind Speed: '
            yourLocation.textContent = 'Your Location'
            wind.textContent = data.forecast.currently.windSpeed + ' kph'
            // Convert the temperature into a whole number
            let convertedValue = Math.round(parseFloat(data.forecast.currently.temperature))   
            currentTemperature.textContent = convertedValue + '°'
            icon.set('weather-icon', data.forecast.currently.icon)
            icon.play()
        }
    })
})
})