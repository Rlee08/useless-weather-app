export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              resolve(`${latitude},${longitude}`);
            },
            (error) => {
              console.error("Error getting location:", error);
              // Fallback to a default location if geolocation fails
              reject('42.369898,-74.868172');
            }
          );
        }
      });
    };

export const fetchWeatherData = async (location) => {

        const url = 'https://api.weather.gov/points/' + location
        console.log(url)
        
        try{
        const gridFetch = await fetch(url);
        const gridData = await gridFetch.json();

        const forecast = await fetch(gridData.properties.forecast);
        const forecastData = await forecast.json();
        
        return forecastData.properties.periods[0].detailedForecast;
        }catch(error){
        console.error('error:'+ error)
        }
    };
