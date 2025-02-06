import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

export default class SceneInit {
  constructor(canvasId) {
    // NOTE: Core components to initialize Three.js app.
    this.scene = undefined;
    this.camera = undefined;
    this.renderer = undefined;

    // NOTE: Camera params;
    this.fov = 45;
    this.nearPlane = 1;
    this.farPlane = 1000;
    this.canvasId = canvasId;

    // NOTE: Additional components.
    this.controls = undefined;

    // NOTE: Lighting is basically required.
    // this.ambientLight = undefined;
    // this.directionalLight = undefined;
  }

  initialize() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 96;

    // NOTE: Specify a canvas which is already created in the HTML.
    const canvas = document.getElementById(this.canvasId);
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      // NOTE: Anti-aliasing smooths out the edges.
      antialias: true,
    });

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // // ambient light which is for the whole scene
    // this.ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    // this.ambientLight.castShadow = true;
    // this.scene.add(this.ambientLight);

    // // directional light - parallel sun rays
    // this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // // this.directionalLight.castShadow = true;
    // this.directionalLight.position.set(0, 32, 64);
    // this.scene.add(this.directionalLight);

    // if window resizes
    window.addEventListener('resize', () => this.onWindowResize(), false);

    // new RGBELoader()
    // .load('/images/sky.hdr', function (texture){
    //   texture.mapping = THREE.EquirectangularReflectionMapping;
    //   this.scene.background = texture;
    //   this.scene.environment = texture;
    // });

    // NOTE: Load space background.
    this.loader = new THREE.TextureLoader();
    const texture = this.loader.load('/images/sky2.jpg');
    texture.mapping = THREE.EquirectangularReflectionMapping;
    this.scene.background = texture;


    // const pmremGenerator = new THREE.PMREMGenerator( this.renderer );

    // const hdriLoader = new RGBELoader()
    // hdriLoader.load( '/images/sky.hdr', function ( texture ) {
    //   const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
    //   texture.dispose(); 
    //   this.scene.environment = envMap
    // } );

    // NOTE: Declare uniforms to pass into glsl shaders.
    // this.uniforms = {
    //   u_time: { type: 'f', value: 1.0 },
    //   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
    //   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
    // };
  }

  animate() {
    // NOTE: Window is implied.
    // requestAnimationFrame(this.animate.bind(this));
    window.requestAnimationFrame(this.animate.bind(this));
    this.render();
    this.controls.update();
  }

  render() {
    // NOTE: Update uniform data on each render.
    // this.uniforms.u_time.value += this.clock.getDelta();
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}