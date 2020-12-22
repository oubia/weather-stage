const ville = document.getElementById("ville")
const date = document.getElementById("date")
const description = document.getElementById("description")
const temperature = document.getElementById("temperature")
const icon = document.getElementById("icon")
const villeDonner = document.getElementById("ville-donner")
const villeForn = document.getElementById("ville-form")

var ctx = document.getElementById('myChart').getContext('2d');

const affichMeteo = (villeNom) => {

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${villeNom}&appid=c31cd1ae7810d5aeecb7322948e92366`)
        .then(response => response.json())
        .then((data) => {
            ville.innerText = data.name;

            let descriptions = data.weather[0]["description"];
            description.innerText = descriptions

            let temperatures = data.main["temp"]
            let temp = parseInt(temperatures) - 273.15
            temperature.innerText = parseInt(temp) + "°C"

            let jour = new Date();
            let localOffset = data.timezone + jour.getTimezoneOffset() * 60;
            let localtemp = new Date(jour.setUTCSeconds(localOffset))
            let options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let formatjour = localtemp.toLocaleDateString('fr-FR', options);

            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            date.innerText = formatjour;

            let MaxTemperatures = data.main["temp_max"]
            let Maxtemp = parseInt(MaxTemperatures) - 273
            let MaxtempArray = [];
            MaxtempArray.push(Maxtemp)
            let MinTemperatures = data.main["temp_min"]
            let Mintemp = parseInt(MinTemperatures) - 273
            let MintempArray = [];
            MintempArray.push(Mintemp)
            console.log(data.sys["sunrise"] / 3600 * 60)
            console.log(data.sys["sunset"] / (3600 * 60))


            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    datasets: [{
                            label: 'Maxtemp',
                            backgroundColor: 'rgb(0,0,0,0.2)',
                            borderColor: 'rgb(0,0,0,0.8)',
                            data: MaxtempArray
                        },
                        {
                            label: 'Mintemp',
                            backgroundColor: 'rgb(0,255,0,0.2)',
                            borderColor: 'rgb(0,0,0,0.8)',
                            data: MintempArray
                        }
                        //en peut ajoute des autres elements
                    ]
                }, //les donnes se que on va affiche
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true //start with zero
                            }
                        }]
                    }
                }
            });
        });

};

villeForn.addEventListener('submit', (event) => {
    event.preventDefault();
    affichMeteo(villeDonner.value)
});