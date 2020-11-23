const navigationbar = document.createElement("nav");
navigationbar.className = 'navbar';
navigationbar.id= 'navbar_top'
navigationbar.classList.add("p-0");
navigationbar.classList.add("shadow");
navigationbar.classList.add("justify-content-center");
navigationbar.style = 'background-color: rgb(203, 32, 45)'
document.body.appendChild(navigationbar)

const navbarLink = document.createElement('a');
navbarLink.className = "navbar-brand" ;
navbarLink.classList.add("p-0")
navbarLink.classList.add("m-0")
navbarLink.setAttribute("href", "#"); 
navigationbar.appendChild(navbarLink);

const logoimg = document.createElement('img');
logoimg.src = 'imgs/RestoFinderLogo.png'
logoimg.setAttribute("height", "70"); 
navbarLink.appendChild(logoimg);

const search_container = document.createElement("div");
search_container.className = 'container-fluid';
search_container.classList.add("p-0");
document.body.appendChild(search_container)

const search_box = document.createElement("div");
search_box.className = 'search-box';
search_container.appendChild(search_box);

const bg_banner = document.createElement("div");
bg_banner.className = 'bg-img';
bg_banner.classList.add('justify-content-center');
search_box.appendChild(bg_banner);

const form = document.createElement("form");
bg_banner.appendChild(form);

const form_container = document.createElement('div');
form_container.className = 'form-container';
form.appendChild(form_container);

const input_group = document.createElement('div');
input_group.className = 'input-group';
input_group.classList.add('col-sm-12');
input_group.style = 'background-color: rgb(0, 0, 0 , 0.6); height: 140px;'
form_container.appendChild(input_group);

const button_ = document.createElement("button");
button_.className = 'btn';
button_.classList.add('shadow');
button_.classList.add('search-btn');
button_.classList.add('btn-lg');
button_.classList.add('btn-block');
const favicon = document.createElement('i');
favicon.className = 'fa fa-search';
button_.appendChild(favicon)
const text = document.createTextNode(" Click Here to Search Restaurants In Your Location");
button_.appendChild(text);
button_.onclick = function(){getLocation()};
button_.type = 'button';
input_group.appendChild(button_);

const data_container = document.createElement("div");
data_container.className = 'container-fluid';
data_container.style = 'background:#f0f8ff center; background-size: cover;'
document.body.appendChild(data_container);

const geo_details = document.createElement("div");
geo_details.id = 'geolocation';
geo_details.className = 'geolocation-container';
geo_details.classList.add('text-center');
geo_details.style = 'background:#f0f8ff center; background-size: cover;'
data_container.appendChild(geo_details);

const restaurant_data_container = document.createElement("div");
restaurant_data_container.id = 'RestaurantData';
restaurant_data_container.className = 'container-fluid';
restaurant_data_container.classList.add('row');
restaurant_data_container.classList.add('m-1');
document.body.appendChild(restaurant_data_container);


const myHeaders = new Headers();

myHeaders.append("user-key", "455f3c37600620a2babaf9ccaf9435a9");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    button_.innerHTML = "Geolocation is not supported by this browser.";
  }
}
const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };
function showPosition(position) {
    geolocation.innerHTML="LOADING....";
    restaurant_data_container.innerHTML = '';
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    // latitude = "17.4875"
    // longitude = "78.3953"
    async function getData(){
        const res = await fetch("https://developers.zomato.com/api/v2.1/geocode?lat="+latitude+"&lon="+longitude , requestOptions);
	    const data = await res.json();
        displayRestos(data)    
    }
    getData();
   
    function displayRestos(data){
        // console.log(data)
        const restaurants = data.nearby_restaurants
            geolocation.innerHTML=""
            const geo_content = document.createElement('div');
            geo_content.className = 'fade-in';
            geo_content.classList.add('row');
            geo_content.classList.add('data-row');
            geo_details.appendChild(geo_content);

            const geo_card = document.createElement('div');
            geo_card.className = 'col-sm-4';
            geo_card.classList.add('col-md-6');
            geo_card.classList.add('col-lg-4');
            geo_content.appendChild(geo_card);

            const geodata_container = document.createElement('div');
            geodata_container.className = 'data-container';
            geo_card.appendChild(geodata_container);

            const latdescri = document.createElement('div');
            latdescri.className = 'data-description';
            latdescri.innerHTML = 'Latitude';
            geodata_container.appendChild(latdescri);

            const lattitude = document.createElement('div');
            lattitude.className = 'data';
            lattitude.innerHTML = `${latitude}`+'°N';
            geodata_container.appendChild(lattitude);

            const geo_card2 = document.createElement('div');
            geo_card2.className = 'col-sm-4';
            geo_card2.classList.add('col-md-6');
            geo_card2.classList.add('col-lg-4');
            geo_content.appendChild(geo_card2);

            const geodata_container2 = document.createElement('div');
            geodata_container2.className = 'data-container';
            geo_card2.appendChild(geodata_container2);

            const latdescri2 = document.createElement('div');
            latdescri2.className = 'data-description';
            latdescri2.innerHTML = 'Latitude';
            geodata_container2.appendChild(latdescri2);

            const Longittude = document.createElement('div');
            Longittude.className = 'data';
            Longittude.innerHTML = `${longitude}`+'°E';
            geodata_container2.appendChild(Longittude);

            const geo_card3 = document.createElement('div');
            geo_card3.className = 'col-sm-4';
            geo_card3.classList.add('col-md-6');
            geo_card3.classList.add('col-lg-4');
            geo_content.appendChild(geo_card3);

            const geodata_container3 = document.createElement('div');
            geodata_container3.className = 'data-container';
            geo_card3.appendChild(geodata_container3);

            const latdescri3 = document.createElement('div');
            latdescri3.className = 'data-description';
            latdescri3.innerHTML = 'City/Region';
            geodata_container3.appendChild(latdescri3);

            const City = document.createElement('div');
            City.className = 'data';
            City.innerHTML = `${data.location.title}`;
            geodata_container3.appendChild(City);

            restaurants.forEach(rest => {
            const dataEl = document.createElement('div');
            dataEl.setAttribute("class" , "fade-in restaurant-card col-sm-4")
            const restaurant__ = document.createElement('div');
            restaurant__.className = 'col-sm-12';
            restaurant__.classList.add('restaurant-data');
            restaurant__.classList.add('p-0');
            dataEl.appendChild(restaurant__);
            
            const resto_card = document.createElement('div');
            resto_card.className = 'restaurant-container';
            resto_card.classList.add('col-sm-12');
            resto_card.classList.add('p-0');
            resto_card.classList.add('m-0');
            restaurant__.appendChild(resto_card);
            
            const resto_pic_div = document.createElement('div');
            resto_pic_div.className = 'restaurant-photo';
            resto_pic_div.classList.add('col-sm-12');
            resto_pic_div.classList.add('p-0');
            resto_pic_div.classList.add('m-0');
            resto_card.appendChild(resto_pic_div);
            
            const resto_pic = document.createElement('img');
            resto_pic.src = `${rest.restaurant.featured_image}`;
            resto_pic.onerror = ()=>{
                resto_pic.src = 'https://b.zmtcdn.com/data/pictures/8/18752268/6d39c2cfa97dbbdc0354dd17db3ea66c.jpg?output-format=webp'
            }
            resto_pic_div.appendChild(resto_pic);
            
            const resto_name = document.createElement('div');
            resto_name.className = 'restaurant-name';
            resto_name.classList.add('col-sm-12');
            resto_name.classList.add('p-0');
            resto_name.classList.add('m-0');
            resto_name.classList.add('text-center');
            resto_name.innerHTML = `${rest.restaurant.name}`
            resto_card.appendChild(resto_name);
            
            const Locality = document.createElement('p');
            Locality.className = 'locality';
            Locality.classList.add('p-0');
            Locality.classList.add('m-0');
            Locality.classList.add('text-center');
            Locality.innerHTML = `${rest.restaurant.location.address}`;
            resto_name.appendChild(Locality);
            
            const resto_content = document.createElement('div');
            resto_content.className = 'restaurant-content';
            resto_content.classList.add('row');
            resto_content.classList.add('p-1');
            resto_content.classList.add('m-2');
            resto_card.appendChild(resto_content);
            
            
            const resto_rating = document.createElement('div');
            resto_rating.className = 'p-0';
            resto_rating.classList.add('justify-content-left');
            resto_rating.classList.add('col');
            resto_rating.innerHTML = "Customer Rating: "+`${rest.restaurant.user_rating.aggregate_rating}`
            resto_content.appendChild(resto_rating);
            
            const resto_id = document.createElement('div');
            resto_id.className = 'p-0';
            resto_id.classList.add('justify-content-left');
            resto_id.classList.add('col');
            resto_id.innerHTML ='Resto Id: '+`${rest.restaurant.id}`;
            resto_content.appendChild(resto_id);
            
            const resto_avg = document.createElement('div');
            resto_avg.className = 'avg-price';
            resto_avg.classList.add('col-sm-12');
            resto_avg.classList.add('p-3');
            resto_avg.innerHTML ='Avg. Price For Two : Rs'+`${rest.restaurant.average_cost_for_two}`+'/-';
            resto_content.appendChild(resto_avg);
            
            const cuisines_ = document.createElement('div');
            cuisines_.className = 'cuisines';
            cuisines_.classList.add('col-sm-12');
            cuisines_.innerHTML ='Cuisines: '+`${rest.restaurant.cuisines}`;
            resto_content.appendChild(cuisines_);
            
            const order_now_div = document.createElement('div');
            order_now_div.className = 'order-now';
            order_now_div.classList.add('col-sm-12');
            order_now_div.classList.add('p-0');
            resto_card.appendChild(order_now_div);
            
            const button_order_now = document.createElement("button");
            button_order_now.className = 'btn';
            button_order_now.classList.add('order-btn');
            button_order_now.classList.add('btn-lg');
            button_order_now.classList.add('btn-block');
            const order_txt = document.createTextNode("Order Food Now");
            button_order_now.appendChild(order_txt);
            button_order_now.onclick = function(){ window.location.href= `${rest.restaurant.url}`} ;
            button_order_now.type = 'button';
            order_now_div.appendChild(button_order_now);
            
            restaurant_data_container.appendChild(dataEl);
        });
        
    }     

}
if ($(window).width() > 300) {
  $(window).scroll(function(){  
     if ($(this).scrollTop() > 449) {
        $('#navbar_top').addClass("fixed-top");
        $('#navbar_top').addClass("fade-in");
        // add padding top to show content behind navbar
        $('body').css('padding-top', $('.navbar').outerHeight() + 'px');
      }else{
        $('#navbar_top').removeClass("fixed-top");
        $('#navbar_top').removeClass("fade-in");	      
         // remove padding top from body
        $('body').css('padding-top', '0');
      }   
  });
} 
