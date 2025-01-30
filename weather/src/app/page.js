"use client"

import React, {useState, useEffect} from 'react';
import {fetchAdjectives, getUserLocation} from '../components/weatherFetcher.js';
import {fetchSynonym} from '../components/synonymFetcher.js'

const HomePage = () => {

  const [description, setDescription] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const {lat,lon} = await getUserLocation();
        console.log(lat);
        console.log('fetchingweatherdata');
        //get list of all adjectives from weather forecast
        const adjectiveList = await fetchAdjectives(lat,lon);

        console.log('got adjective list', adjectiveList);

        //list of synonyms from fetchSynonym function
        const synonymList = await fetchSynonym(adjectiveList);

        //add list of synonyms to the original list of adjectives
        const synonymCollection = adjectiveList.concat(synonymList);

        console.log(synonymCollection);
        // loopSynonyms(synonymCollection);

        setDescription('hi');
      } catch (error) {
        setDescription('Unable to fetch weather data');
        throw error;
      }
    };

    getWeather();
  }, []);

  // function waitforme(millisec) {
  //     return new Promise(resolve => {
  //         setTimeout(() => { resolve('') }, millisec);
  //     })
  // }


  // //get the collection of synonyms on mount
  // useEffect(() => {
  //   const getSyn = async () => {
  //     try {
  //       //get the collection of synonym arrays
  //       const synonymCollection = await fetchSynonym("warm");
  //       loopSynonyms(synonymCollection);
  //     } catch (error) {
  //       setDescription('Unable to fetch synonyms');
  //     }
  //   };

  //   getSyn();
  // }, []);

  // //display a new synonym from collection every 10 seconds
  // const loopSynonyms = async (collection) => {
  //   //loop through array
  //   for (const key in collection) {
  //     if (Array.isArray(collection[key])) {
  //         console.log(`new array incoming`);
  //         for (const element of collection[key]) {
  //         await waitforme(1000)
  //         console.log(element);
  //         setDescription(element)
  //         }
  //       }
  //     }
  //     return;
  //   }

      
  return(
    <div className="flex flex-col justify-center items-center w-full h-screen gap-4 text-center">
      <h1 className="text-4xl">What's the weather today?</h1>
      <h1 id="weather" className="text-4xl max-w-lg">{description || 'Loading...'}</h1>
    </div>
  )
}

export default HomePage