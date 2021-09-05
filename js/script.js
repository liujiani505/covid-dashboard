let casesData;
let vaccinesData;

const $input = $("input[type='text']")
const $totalcases = $("#total-cases")
const $totaldeaths = $("#total-deaths")
const $vaccinations = $("#vaccinations")
const $country = $("#country")
const $flag = $(".flag")
const $population = $("#population")
const $lifeexpectancy = $("#life-expectancy")
const $continent = $("#continent")
const $location = $("#location")
const $capitalcity = $("#capital-city")

function handleData(event){
    event.preventDefault();
    $.ajax(`https://covid-api.mmediagroup.fr/v1/cases?country=${$input.val()}`)
    .then(function(data){
        casesData = data;
        $totalcases.text(`${casesData.All.confirmed.toLocaleString()}`) 
        $totaldeaths.text(`${casesData.All.deaths.toLocaleString()}`)
        $country.html(`<h3><strong>${casesData.All.country}</strong></h3>`)
        $population.html(`<h6><strong>Population:</strong> ${casesData.All.population.toLocaleString()}</h6>`)
        $lifeexpectancy.html(`<h6><strong>Life Expectancy:</strong> ${casesData.All.life_expectancy}</h6>`)
        $continent.html(`<h6><strong>Continent:</strong> ${casesData.All.continent}</h6>`)
        $location.html(`<h6><strong>Location:</strong> ${casesData.All.location}</h6>`)
        $capitalcity.html(`<h6><strong>Capital City:</strong> ${casesData.All.capital_city}</h6>`)
        // add a flag for each country
        let country = {countryCode: casesData.All.abbreviation}
        $flag.html(`<img src="https://www.countryflags.io/${country.countryCode}/flat/64.png"} width="100" height="100" />`)

            $.ajax(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${$input.val()}`)
            .then(function(data){
                vaccinesData = data;
                $vaccinations.text(`${vaccinesData.All.people_vaccinated.toLocaleString()}`)

                // create a chart

                $(".canvas-wrapper").html("").html(`<canvas id="doughnut-chart" width="50" height="50"></canvas>`)

                const ctx = $('#doughnut-chart')[0].getContext('2d');
                
                    const myChart = new Chart(ctx, {
                        type: 'doughnut',
                        data: {
                            labels: ["Total Cases", "Total Deaths", "Vaccinations"],
                            datasets: [{
                                label: 'number',      
                                data: [casesData.All.confirmed, casesData.All.deaths, vaccinesData.All.people_vaccinated],
                                backgroundColor: [
                                    'rgba(241, 237, 252)',
                                    'rgba(250, 237, 232)',
                                    'rgba(224, 236, 250)'
                                ],
                                borderColor: [
                                    'rgba(75, 23, 172)',
                                    'rgba(245, 37, 37)',
                                    'rgba(0, 66, 153)'
                                ],
                                borderWidth: 1
                            }]                           
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }  
                        }
                    });



            }, function(error){
                console.log(error)
            })

    }, function(error){
        console.log(error)
    })
}

$("form").on("submit", handleData)



