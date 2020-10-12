const url = "http://api.openweathermap.org/data/2.5/weather?q=London&appid=c31cd1ae7810d5aeecb7322948e92366"
const ville = document.getElementById("ville")
const date = document.getElementById("date")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")



fetch(url)
    .then(response => response.json())
    .then((data) => {
        console.log(data);
        let descriptions = data.weather[0]["description"];
        description.innerText = descriptions
        let temperatures = data.main["temp"]
        let temp = parseInt(temperatures) - 273.15
        temperature.innerText = temp
    });