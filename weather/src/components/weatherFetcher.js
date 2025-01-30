let { RiTa } = require('rita');

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({ lat, lon });
                console.log(lat,lon)
            },
            (error) => {
              console.error("Error getting location:", error);
              // Fallback to a default location if geolocation fails
              reject({lat: 42.369898, lon: -74.868172});
            }
          );
        } else {
            reject({lat: 42.369898, lon: -74.868172});
          }
      });
    };

export const fetchAdjectives = async (lat,lon) => {
        console.log('Received coordinates:', { lat, lon });

        const api = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY
        console.log(api);
        if (!api) {
            throw new Error('OpenWeather API key is missing');
        }    

        const url = `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${api}&units=imperial`
        console.log(url);

        // const checkAdjective = (word) => {
        //   console.log(RiTa.isAdjective(word));
        //   return RiTa.isAdjective(word);
        // }
        
        try {
          //get weather data from API
          const serverResponse = await fetch(url);
          if (!serverResponse.ok) {
              throw new Error('Weather data fetch failed');
          }
          const {weather_overview} = await serverResponse.json();
          // return weather_overview;

          //get array of synonyms from weather forecast
          const sentence = RiTa.tokenize(weather_overview);
          console.log(sentence);

        // Filter adjectives using RiTa
        const adjectives = sentence.filter(word => RiTa.isAdjective(word));
        console.log(adjectives);

        return adjectives;
  
        }catch(error){
            console.error(error);
        }
    };
