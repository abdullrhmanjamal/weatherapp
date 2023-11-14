let todayName=document.getElementById('today-name')
let todayDate=document.getElementById('today-date')
let todayLocation=document.getElementById('today location')
let todayTemp=document.getElementById('today-temp')
let todayConditionImg=document.getElementById('today_condition_img')
let todayConditionText = document.getElementById('today_condition_text')
let humidity=document.getElementById('humidity')
let wind=document.getElementById('wind')
let windDirection=document.getElementById('wind_direction')


let nextDayName=document.getElementsByClassName('next_day_name')
let nextConditionImg=document.getElementsByClassName('next_condition_img')   
let nextConditionText=document.getElementsByClassName('next_condition_text')   
let nextMaxTemp=document.getElementsByClassName('next_max_temp')
let nextMinTemp=document.getElementsByClassName('next_min_temp')


let searchInput=document.getElementById('search')


// API

 async function getWeather(cityName){
let weather = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=50c3eab5f4b84ccfbb9142112232608&q=${cityName}&days=3`)
let weatherData = await weather.json()
return weatherData
}


// DISPLAY

function displayDayOne(data){
let todayDaate= new Date()
todayName.innerHTML=todayDaate.toLocaleDateString('en-US',{weekday:'long'})
todayDate.innerHTML=todayDaate.getDate()
todayDate.innerHTML=todayDaate.toDateString('en-US',{month:'long'})
    todayLocation.innerHTML=data.location.name
    todayTemp.innerHTML=data.current.temp_c
    todayConditionImg.setAttribute("src",data.current.condition.icon)
    todayConditionText.innerHTML=data.current.condition.text
    humidity.innerHTML=data.current.humidity+'%'
    wind.innerHTML=data.current.wind_kph+'km/h'
    windDirection.innerHTML=data.current.wind_dir

}

function displayNextDay(data){
let forcastData=data.forecast.forecastday
for(let i = 0; i< 2; i++){
    let nextDate=new Date(forcastData[i+1].date)
    nextDayName[i].innerHTML=nextDate.toLocaleDateString('en-US',{weekday:'long'})
nextMaxTemp[i].innerHTML=forcastData[i+1].day.maxtemp_c
nextMinTemp[i].innerHTML=forcastData[i+1].day.mintemp_c 
nextConditionImg[i].setAttribute('src',forcastData[i+1].day.condition.icon)
nextConditionText[i].innerHTML=forcastData[i+1].day.condition.text
}
}


// start app
 async function startApp(city='cairo'){
    let weather=  await getWeather(city)
    if(!weather.error){
        displayDayOne(weather)
        displayNextDay(weather)
    }
    
}
startApp()

searchInput.addEventListener('input', function(){
    startApp(searchInput.value)
    
})