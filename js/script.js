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
const $countrybarchart = $("#country-barchart")
const ctx = $('#country-barchart')[0].getContext('2d');


function handleVaccinesData() {   
    $.ajax(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${$input.val()}`)
    .then(function(data){
        vaccinesData = data;
        let totalVaccinations = vaccinesData.All.people_vaccinated;
        $vaccinations.text(`${totalVaccinations.toLocaleString()}`)
    }, function(error){
        console.log(error)
    })
}


function handleData() {
    $.ajax(`https://covid-api.mmediagroup.fr/v1/cases?country=${$input.val()}`)
    .then(function(data){
        casesData = data;
        $totalcases.text(`${casesData.All.confirmed.toLocaleString()}`) 
        $totaldeaths.text(`${casesData.All.deaths.toLocaleString()}`)
        $country.html(`<h3>CASES IN: <strong>${casesData.All.country}</strong></h3>`)
        $population.html(`<h6>Population: ${casesData.All.population.toLocaleString()}</h6>`)
        $lifeexpectancy.html(`<h6>Life Expectancy: ${casesData.All.life_expectancy}</h6>`)
        // add a flag for the country
        let country = {countryCode: casesData.All.abbreviation}
        $flag.html(`<img src="https://www.countryflags.io/${country.countryCode}/flat/64.png"} width="100" height="100" />`)
        // call the generateBarChart function
        let returnedVaccinesData = handleVaccinesData();
        generateBarChart(ctx, ["Total Cases", "Total Deaths", "Vaccinations"], [casesData.All.confirmed, casesData.All.deaths,returnedVaccinesData])
    }, function(error){
        console.log(error)
    })
}


// Bar chart
function generateBarChart(canvas, label, data){
    const myChart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: label,
            datasets: [{
                label: 'number',      
                data: data,
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
}


$("form").on("submit", function(event){
    event.preventDefault();
    handleData();
    handleVaccinesData();

})



