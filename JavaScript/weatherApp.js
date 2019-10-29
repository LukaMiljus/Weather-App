window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDes = document.querySelector(".temperature-des");
    let location = document.querySelector(".location-timezone");
    let temperatureDegree = document.querySelector(".degree");
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector ('.temperature span');
    
    
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/9506607c097a0a16d5899508b460720a/${lat},${long}`;

            fetch(api)
            .then(response=> {
                return response.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;

                location.textContent = data.timezone;
                temperatureDegree.textContent = temperature;
                temperatureDes.textContent = summary;
                setIcon(icon, document.querySelector('.icon'));

                //Set temperature to Celsius/Fahrenheit;
                let celsius = (temperature - 32) * (5/9);
                temperatureSection.addEventListener('click', ()=>{
                    if (temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C"
                        temperatureDegree.textContent = Math.floor(celsius);
                    } else {
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = temperature;
                    }
                })
            })
        })
    }
    function setIcon(icon,iconID) {
        const skycons = new Skycons({color:'white'},{"resizeClear": true});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

    //clock
    const span = document.querySelector(".clock");
    let backgroundImg = document.querySelector(".app");

    function time() {
    let d = new Date();
    let s = d.getSeconds();
    let m = d.getMinutes();
    let h = d.getHours();
    span.textContent = h + ":" + m + ":" + s;
    if(h > 7 && h < 19){
        backgroundImg.style.backgroundImage = "url('../Images/WeatherApp-DayBg.jpg')";
        backgroundImg.style.backgroundRepeat = "no-repeat";
        backgroundImg.style.backgroundSize = "100% 100%";
        backgroundImg.style.color = 'white';
        }else{
        backgroundImg.style.backgroundImage = "url('../Images/WeatherApp-NightBg.jpg')";
        backgroundImg.style.backgroundRepeat = "no-repeat";
        backgroundImg.style.backgroundSize = "100% 100%";
        backgroundImg.style.color = 'white';
        }
    }
    setInterval(time, 1000);

});