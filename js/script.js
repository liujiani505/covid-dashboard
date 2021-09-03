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


function handleData(event){
    event.preventDefault();
    $.ajax(`https://covid-api.mmediagroup.fr/v1/cases?country=${$input.val()}`)
    .then(function(data){
        casesData = data;
        $totalcases.text(`${casesData.All.confirmed.toLocaleString()}`) 
        $totaldeaths.text(`${casesData.All.deaths.toLocaleString()}`)
        $country.html(`<h3>CASES IN: <strong>${casesData.All.country}</strong></h3>`)
        $population.html(`<h6>Population: ${casesData.All.population.toLocaleString()}</h6>`)
        $lifeexpectancy.html(`<h6>Life Expectancy: ${casesData.All.life_expectancy}</h6>`)
        // add a flag for each country
        let country = {countryCode: casesData.All.abbreviation}
        $flag.html(`<img src="https://www.countryflags.io/${country.countryCode}/flat/64.png"} width="100" height="100" />`)

            $.ajax(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${$input.val()}`)
            .then(function(data){
                vaccinesData = data;
                $vaccinations.text(`${vaccinesData.All.people_vaccinated.toLocaleString()}`)

                //generate a bar chart
                generateBarChart(ctx, ["Total Cases", "Total Deaths", "Vaccinations"], [casesData.All.confirmed, casesData.All.deaths, vaccinesData.All.people_vaccinated]);

                function generateBarChart(canvas, label, data){
                    const myChart = new Chart(canvas, {
                        type: 'doughnut',
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

                    
                    // const updateChartValue = (input, index) => {
                    //     input.on('change', e => {
                    //         myChart.data.datasets[0].data[index] = e.target.value;
                    //         myChart.update();
                    //     });
                    // };
                    
                    // updateChartValue(0);
                    // updateChartValue(1);
                    // updateChartValue(2);

                    // function addData(canvas, label, data) {
                    //     canvas.data.labels.push(label);
                    //     canvas.data.datasets.forEach((dataset) => {
                    //         dataset.data.push(data);
                    //     });
                    //     canvas.update();
                    // }
                        
                    // function removeData(canvas) {
                    //     canvas.data.labels.pop();
                    //     canvas.data.datasets.forEach((dataset) => {
                    //         dataset.data.pop();
                    //     });
                    //     canvas.update();
                    // }

                }

            }, function(error){
                console.log(error)
            })

    }, function(error){
        console.log(error)
    })
}

$("form").on("submit", handleData)

