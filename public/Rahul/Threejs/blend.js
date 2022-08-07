//Variables 

let container; 
let camera; 
let renderer; 
let scene; 
let room; 

function init(){
    container = document.querySelector('.scene')

    //Create Scene
    scene = new THREE.Scene();
    
const fov = 35; 
const aspect = container.clientWidth / container.clientHeight; 
const near = 0.1; 
const far = 1000; 


camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.set(0, 0, 20); // x,y,z for camera scene. Play around with this

const ambient = new THREE.AmbientLight(0x404040,3); // can change lighting throught this
scene.add(ambient);
//Renderer
renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setSize(container.clientWidth,container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

container.appendChild(renderer.domElement);


// Load Model 
let loader = new THREE.GLTFLoader();
loader.load('House.gltf', function(gltf){
    scene.add(gltf.scene);
    room = gltf.scene.children[0];
    animate();
    })
} 

function animate(){ 
    requestAnimationFrame(animate);
    room.rotation.z += 0.005; 
    renderer.renderer(scene,camera);
}

init(); 
