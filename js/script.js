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
        $country.html(`<h2><strong>${casesData.All.country}</strong></h2>`)
        $population.html(`<h5><strong>Population:</strong> ${casesData.All.population.toLocaleString()}</h5>`)
        $lifeexpectancy.html(`<h5><strong>Life Expectancy:</strong> ${casesData.All.life_expectancy}</h5>`)
        $continent.html(`<h5><strong>Continent:</strong> ${casesData.All.continent}</h5>`)
        $location.html(`<h5><strong>Location:</strong> ${casesData.All.location}</h5>`)
        $capitalcity.html(`<h5><strong>Capital City:</strong> ${casesData.All.capital_city}</h5>`)
        // add a flag for each country
        let country = {countryCode: casesData.All.abbreviation}
        $flag.html(`<img src="https://www.countryflags.io/${country.countryCode}/flat/64.png"} width="100" height="100" />`)

            $.ajax(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${$input.val()}`)
            .then(function(data){
                vaccinesData = data;
                $vaccinations.text(`${vaccinesData.All.people_vaccinated.toLocaleString()}`)

                // create a chart for each country
                $(".canvas-wrapper").html("").html(`<canvas id="doughnut-chart" width="50" height="50"></canvas>`)

                const ctx = $('#doughnut-chart')[0].getContext('2d');

                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ["Total Cases", "Total Deaths", "People Vaccinated"],
                        datasets: [{
                            label: 'number',      
                            data: [casesData.All.confirmed, casesData.All.deaths, vaccinesData.All.people_vaccinated],
                            backgroundColor: [
                                'rgba(241, 237, 252)',
                                'rgba(250, 237, 232)',
                                'rgba(239, 250, 224)'
                            ],
                            borderColor: [
                                'rgba(75, 23, 172)',
                                'rgba(245, 37, 37)',
                                'rgba(74, 153, 0)'
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

//Create a table for all countries
function handleTableData() {
    $.ajax(`https://covid-api.mmediagroup.fr/v1/cases?`)
    .then(function(data){
        const $table = $(".table")
            let tableData = "";
            $.each(data, function(index, element){
                tableData += "<tr>";
                tableData += "<td>" + element.All.country + "</td>";
                tableData += "<td>" + element.All.confirmed + "</td>";
                tableData += "<td>" + element.All.deaths + "</td>";
                tableData += "<td>" + element.All.recovered + "</td>";
                tableData += "</tr>";

            }) 

            $("#table-data").append(tableData);
    })
}

handleTableData()
