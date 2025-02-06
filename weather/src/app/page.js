"use client"

import React, {useState, useEffect} from 'react';
import {fetchAdjectives, getUserLocation} from '../components/weatherFetcher.js';
import {fetchSynonym} from '../components/synonymFetcher.js';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import Link from 'next/link'


const App = () => {
  const scene = new THREE.Scene();
  const words = [];
  let synonymCollection = [];
  const loadingManager = new THREE.LoadingManager;

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const startLoop = (collection) => {
    const interval = getRandomNumber(400,800)
    setInterval(getText, interval, collection);
  };
  
  const getText = (collection) => {
      function chooseWord() {
        console.log('new text');
        const length = collection.length;
        console.log('length = ', length);
      
        const randomWord = collection[Math.floor(Math.random() * length)];
  
        if (randomWord !== 'Currently'){
          console.log(randomWord);
          displayText(randomWord);
        }
        else {
          chooseWord();
        }
      };
      
      chooseWord();
  };
  
  const displayText = (text) => {
    let textMesh;
    const loader = new FontLoader();
    loader.load(
      '/font/dm_sans.json', 
      
      function (font) {
      const geometry = new TextGeometry(text , {
        font: font,
        size: 2,
        depth: .01,
      })
      const materials = [
        new THREE.MeshBasicMaterial({ color: 0x000000 })
      ];    
      textMesh = new THREE.Mesh(geometry, materials);
      textMesh.position.y = 35
      textMesh.position.z = getRandomNumber(-30,20)
      textMesh.position.x = getRandomNumber(-40,25)
      textMesh.rotation.y = getRandomNumber(-1,1)
      scene.add(textMesh);
      words.push(textMesh);
      });
  };

  function fall (objects) {
    objects.forEach(object => {
      if (object) {
        object.position.y -= .05;
      }
    })
  };

  const getSynonyms = async () => {
    console.log('getting new synonyms')
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
      synonymCollection = adjectiveList.concat(synonymList);

      console.log(synonymCollection);
      startLoop(synonymCollection);

    } catch (error) {
      throw error;
    }
  };

  //initialize 3js scene
  useEffect(() => {

    const progressBar = document.getElementById('progress-bar');

    loadingManager.onProgress = function(url, total, loaded) {
      console.log('in progress')
      progressBar.value = (loaded / total) * 100
    };

    loadingManager.onLoad = function() {
      console.log('finished loading');
      onLoaded();
    };

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 70 
    const canvas = document.getElementById('threeJsCanvas');
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0,0,0);
    controls.update();

  //Load space background.
  const loader = new THREE.TextureLoader(loadingManager);
  const texture = loader.load('/images/sky2.jpg');
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = texture;

  window.addEventListener('resize', () => onWindowResize(), false);

  const animate = () => {
    window.requestAnimationFrame(animate);
    renderer.render(scene,camera);
    if (words.length >= 1 ){
      fall(words)
    };
  };
  animate();

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };
  },[]);

  //get the synonymCollection
  useEffect(() => {

    getSynonyms();
    const synonymInterval = setInterval(getSynonyms, 360000);
    return () => clearInterval(synonymInterval);
  }, []);

  //hide loading screen
  const onLoaded = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const nav = document.getElementById('nav');
    function render () {
      loadingScreen.style.display = "none";
      nav.style.display = "flex"
    };
    setTimeout(render, 2000)
  };


  return(
    <div>
      <canvas id="threeJsCanvas"/>

      {/* loading screen */}

      <div id="loadingScreen" className="w-screen h-screen bg-[url(/images/sky3.jpg)] bg-left bg-cover bg-no-repeat absolute z-1000 top-0 flex flex-col gap-[60px] justify-center items-center px-[40px]">
        <h1 className="text-white md:text-8xl custom-shadow text-6xl">
          Useless Weather App
        </h1>
        <progress id="progress-bar" value="0" max="100" className="sm:w-[400px] w-full"/>
      </div>

      {/* nav */}
      <div id="nav" className="absolute w-screen h-fit top-0 hidden py-[16px] px-[60px] justify-end">
        <div className="">
          <Link href="/about" className="text-white text-2xl custom-shadow">
          About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default App