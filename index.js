var location_btn = document.getElementById("getlocation");
var rest_data = document.getElementById("RestaurantData");
var myHeaders = new Headers();
myHeaders.append("user-key", "455f3c37600620a2babaf9ccaf9435a9");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    location_btn.innerHTML = "Geolocation is not supported by this browser.";
  }

}
var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
//     latitude = "17.4875"
//     longitude = "78.3953"
    async function getData(){
        const res = await fetch("https://developers.zomato.com/api/v2.1/geocode?lat="+latitude+"&lon="+longitude , requestOptions);
	    const data = await res.json();
        displayRestos(data)    
    }
    getData();
   
    function displayRestos(data){
        console.log(data)
        const restaurants = data.nearby_restaurants
        console.log(restaurants)
        geolocation.innerHTML = (`
            <div class="fade-in row data-row">
                <div class="col-sm-4 col-md-6 col-lg-4">
                    <div class="data-container ">
                        <div class="data-description">
                            Latitude 
                        </div>
                        <div id="lat" class="data">
                            ${latitude}
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-6 col-lg-4">
                    <div class="data-container">
                        <div class="data-description">
                            Longitude
                        </div>
                        <div id="lon" class="data">
                            ${longitude}
                        </div>
                    </div>
                </div>
                <div class="col-sm-4 col-md-6 col-lg-4">
                <div class="data-container">
                    <div class="data-description">
                        City/Region
                    </div>
                    <div id="lon" class="data">
                        ${data.location.title}
                    </div>
                </div>
            </div>
        </div>
`)      
        restaurants.forEach(rest => {
            const dataEl = document.createElement('div');
            dataEl.setAttribute("class" , "fade-in restaurant-card col-sm-4")
            dataEl.innerHTML=
                `<div class="col-sm-12 restaurant-data p-0">
                <div class="restaurant-container p-0 m-0 col-sm-12">
                    <div class="restaurant-photo p-0 m-0 col-sm-12">
                        <img src="${rest.restaurant.featured_image}" alt="">
                    </div>
                    <div class="col-sm-12 p-0 m-0 restaurant-name text-center">
                            ${rest.restaurant.name}
                        <p class="locality text-center p-0 m-0">
                            ${rest.restaurant.location.address}
                        </p>
                    </div>
                    <div class="row restaurant-content p-1 m-2">
                        <div class="col justify-content-left p-0">
                            Customer Rating : ${rest.restaurant.user_rating.aggregate_rating}
                        </div>
                        <div class="col justify-content-right p-0">
                            Resto Id: ${rest.restaurant.id}
                        </div>
                        <div class="avg-price col-sm-12 p-3">
                            Avg. Price For Two : Rs ${rest.restaurant.average_cost_for_two}/-
                        </div>
                        <div class="cuisines col-sm-12">
                            Cuisines : ${rest.restaurant.cuisines}
                        </div>
                    </div>
                    <div class="order-now col-sm-12 pd-0">
                        <button onclick="window.location.href='${rest.restaurant.url}'" class="btn shadow order-btn btn-danger btn-lg btn-block">Order Food</button>
                    </div>
                </div>
            </div>`
            
            rest_data.appendChild(dataEl);
        });
        
    }     

}
