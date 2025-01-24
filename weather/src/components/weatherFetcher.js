export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                resolve({ lat, lon });
            },
            (error) => {
              console.error("Error getting location:", error);
              // Fallback to a default location if geolocation fails
              reject('42.369898,-74.868172');
            }
          );
        } else {
            reject({lat: 42.369898, lon: -74.868172});
          }
      });
    };

export const fetchWeatherData = async (lat,lon) => {

        console.log('hello');
        const api = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY
        console.log(api);
        if (!api) {
            throw new Error('OpenWeather API key is missing');
        }    

        // const url = 'https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api}&units=imperial'
        const url = 'https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${api}'
        console.log(url);
        try {
            const serverResponse = await fetch(url);

            if (!serverResponse.ok) {
                throw new Error('Weather data fetch failed');
            }

            const data = await serverResponse.json();
            console.log('should get data');
            return `test`;
        }catch(error){
            console.error(error);
        }

    };
