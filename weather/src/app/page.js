"use client"

import React, {useState, useEffect} from 'react';
import P5Wrapper from 'react-p5-wrapper';
import {fetchAdjectives, getUserLocation} from '../components/weatherFetcher.js';
import {fetchSynonym} from '../components/synonymFetcher.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import SceneInit from '../components/sceneInit.js';


const App = () => {

  const [description, setDescription] = useState(null);

  // useEffect(() => {
  //   const getWeather = async () => {
  //     try {
  //       const {lat,lon} = await getUserLocation();
  //       console.log(lat);
  //       console.log('fetchingweatherdata');
  //       //get list of all adjectives from weather forecast
  //       const adjectiveList = await fetchAdjectives(lat,lon);

  //       console.log('got adjective list', adjectiveList);

  //       //list of synonyms from fetchSynonym function
  //       const synonymList = await fetchSynonym(adjectiveList);

  //       //add list of synonyms to the original list of adjectives
  //       const synonymCollection = adjectiveList.concat(synonymList);

  //       console.log(synonymCollection);
  //       // loopSynonyms(synonymCollection);

  //       setDescription('hi');
  //     } catch (error) {
  //       setDescription('Unable to fetch weather data');
  //       throw error;
  //     }
  //   };

  //   getWeather();
  // }, []);

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

  useEffect(() => {
    const sky = new SceneInit('threeJsCanvas');
    sky.initialize();
    sky.animate();

    const boxGeometry = new THREE.BoxGeometry(16,16,16);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxMesh = new THREE.Mesh(boxGeometry,boxMaterial);
    sky.scene.add(boxMesh);

  },[]);
      
  return(
    <div>
      {/* <h1 className="text-4xl">What's the weather today?</h1>
      <h1 id="weather" className="text-4xl max-w-lg">{description || 'Loading...'}</h1> */}
      <canvas id="threeJsCanvas"/>
    </div>
  )
}

export default App