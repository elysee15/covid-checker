    const newtworkStatus = () => {  
        if (!navigator.online){
            return `Aucune connexion internet`;
        }
    } 
    
    let currentDate = new Date().toISOString();
    let params1 = new Date();
    let params2 = new Date();
    params1.setDate(params1.getDate() - 1);
    params1.setHours(00,00,00,00);
    params2.setHours(00,00,00,00)
    
    let api_url2 = `https://api.covid19api.com/countries`;
    
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

// retrieving by country

async function getByCountry(country){
        const api_url = `https://api.covid19api.com/live/country/${country}/status/confirmed/date/${params1.toISOString()}`;

        const response = await fetch(api_url, requestOptions);   
        
        const data = await response.json();            

        document.getElementById("active").innerHTML = data[0].Active;
        document.getElementById("recovered").innerHTML = data[0].Recovered;
        document.getElementById("deaths").innerHTML = data[0].Deaths;
        document.getElementById("total").innerHTML =  data[0].Confirmed;

        
        }
setInterval(getByCountry("CI"), 600000);

        

async function getCountries(){
    const response = await fetch(api_url2, requestOptions); // retrieving countries name

    const data = await response.json();      // converting into json   
       
    data.forEach((value) => {
        const option = document.createElement('option'); 
        option.innerHTML = value.Slug;
        document.querySelector('div > #pays > select').appendChild(option);
    })
}
    getCountries();

document.querySelector("#countries").addEventListener("change", (e) => {
    setInterval(getByCountry(e.target.value), 600000);
})

