// Search form
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// Section
const weatherReport = document.querySelector('#weather-report')
// Loading
const loadingText = document.querySelector('#loading')
const loader = document.querySelector('#loader')
// left hand side of the grid in order
const currentConditions = document.querySelector('#current-conditions')
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
const weatherIcon = document.querySelector('#weather-icon')
const currentSummary = document.querySelector('#summary')
const currentTemperature = document.querySelector('#current-temperature')
// right hand side in order
const yourLocation = document.querySelector('#your-location')
const city = document.querySelector('#city')
const timeDate = document.querySelector('#time-date')
const dailySummary = document.querySelector('#daily-summary')
const rainProbabilityLabel = document.querySelector('#rain-prob-label')
const rainProbability = document.querySelector('#rain-prob')
const minMaxTemperatureLabel = document.querySelector('#min-max-temp-label')
const minMaxTemperature = document.querySelector('#min-max-temp')
const windLabel = document.querySelector('#wind-label')
const wind = document.querySelector('#wind')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    // Section
    weatherReport.style.display = 'block'
    // Loading 
    loader.style.display = 'block'
    loadingText.textContent = 'Loading...'
    // left hand side of the grid in order
    currentConditions.textContent = ''
    weatherIcon.style.display = 'none'
    currentSummary.textContent = ''
    currentTemperature.textContent = ''
    // right hand side of the grid in order
    yourLocation.textContent = ''
    city.textContent = ''
    timeDate.textContent = ''
    dailySummary.textContent = ''
    rainProbabilityLabel.textContent = ''
    rainProbability.textContent = ''
    minMaxTemperatureLabel.textContent = ''
    minMaxTemperature.textContent = ''
    windLabel.textContent = ''
    wind.textContent = ''
    window.scrollTo(0,document.body.scrollHeight);

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            loader.style.display = 'none'
            city.textContent = ''
            dailySummary.textContent = ''
            loadingText.textContent = data.error
        } else {
            // Loader
            loader.style.display = 'none'
            loadingText.textContent = ''
            // left hand side of the grid in order 
            currentConditions.textContent = 'Current Conditions'
            weatherIcon.style.display = 'inline-block'
            icon.set('weather-icon', data.forecast.currently.icon)
            icon.play()
            currentSummary.textContent = data.forecast.currently.summary
            // Convert the temperature into a whole number
            let convertedValue = Math.round(parseFloat(data.forecast.currently.temperature))   
            currentTemperature.textContent = convertedValue + '°'
            // right hand side of the grid in order
            yourLocation.textContent = 'Your Location'
            city.textContent = data.location.split(",").shift()
            let currentTime = parseInt(data.forecast.currently.time)
            timeDate.textContent = moment.unix(currentTime).format('LLLL').split(",").shift() + ', ' + moment.unix(currentTime).format('D MMMM')
            dailySummary.textContent = data.forecast.daily.data[0].summary
            rainProbabilityLabel.textContent = 'Rain Probability: '
            rainProbability.textContent = data.forecast.currently.precipProbability + '%'
            minMaxTemperatureLabel.textContent = 'Temperature: '
            minMaxTemperature.textContent = Math.round(parseFloat(data.forecast.daily.data[0].temperatureHigh)) + '°/' + Math.round(parseFloat(data.forecast.daily.data[0].temperatureLow)) + '°'
            windLabel.textContent = 'Wind Speed: '
            wind.textContent = data.forecast.currently.windSpeed + ' kph'
        }
    })
})
})