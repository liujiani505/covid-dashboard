let casesData;
let vaccinesData;

const $input = $("input[type='text']")
const $totalcases = $("#totalcases")
const $vaccinated = $("#vaccinated")
const $country = $("#country")


function handleCasesData() {
 
    $.ajax(`https://covid-api.mmediagroup.fr/v1/cases?country=${$input.val()}`)
    .then(function(data){
        casesData = data;
        $totalcases.text(`Total Cases: ${casesData.All.confirmed}`) 
    }, function(error){
        console.log(error)
    })
}

function handleVaccinesData() {
    
    $.ajax(`https://covid-api.mmediagroup.fr/v1/vaccines?country=${$input.val()}`)
    .then(function(data){
        vaccinesData = data;
        $vaccinated.text(`People Vaccinated: ${vaccinesData.All.people_vaccinated}`)
    }, function(error){
        console.log(error)
    })
}

$("form").on("submit", function(event){
    event.preventDefault();
    handleCasesData();
    handleVaccinesData();
})