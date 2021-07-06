import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { lerp } from 'three/src/math/MathUtils';


//var algo = document.getElementById('about-us');

//function cambio()
//{
//  console.log("hola");
//}

//algo.addEventListener('click',cambio,true)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Sizes
 */
 const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () =>
{
  // Update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 4.2
scene.add(camera)

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Lights

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(0,0,6)
scene.add(pointLight)

//Loader GLTF
let milk_box;
const loader = new GLTFLoader();


loader.load( 'Resources/milk_carton_new.glb', function ( gltf ) {

  milk_box = gltf.scene;
	scene.add( milk_box );

}, undefined, function ( error ) {

	console.error( error );

} );




document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

let scrollY = 0;
let scrollY_update = 0;
let contador = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event){
  mouseX = (event.clientX - windowX)
  mouseY = (event.clientY - windowY)
}

const onDocumentScrollMove = (event) => {
  contador = contador + 50;
  scrollY = contador
}

document.addEventListener("scroll", onDocumentScrollMove);


const clock = new THREE.Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();
  let timeNoDecimals = parseInt(elapsedTime.toFixed(0))

  targetX = mouseX * .001;
  targetY = mouseY * .001;
  if(milk_box)milk_box.rotation.y = 0.5 * elapsedTime;
  if(milk_box)milk_box.rotation.y += 0.005 *(scrollY);
  //if(milk_box)milk_box.rotation.x += 0.01 *(targetY - milk_box.rotation.x);
  //if(milk_box)milk_box.position.z += 0.01 *(targetY - milk_box.rotation.x);
  //if(milk_box)milk_box.rotation.z = -0.09;

  if ( milk_box !== undefined ) milk_box.position.y=-2.4;
  if ( milk_box !== undefined ) milk_box.position.x=3;

  //console.log(contador);
  //console.log(timeNoDecimals);
	requestAnimationFrame( animate );
	renderer.render( scene, camera, onDocumentScrollMove );
}

animate();
