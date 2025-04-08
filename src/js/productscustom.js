/*
TODO:
- Connect to DB
- Admin check model with decal
- Limit image type, size and dimensions 
*/

// check for remove

import * as THREE from 'https://unpkg.com/three@0.174.0/build/three.module.js';

import WebGL from "https://unpkg.com/three@0.174.0/examples/jsm/capabilities/WebGL.js"; // import to see if device/browser supports WebGl 2

import { GLTFLoader } from 'https://unpkg.com/three@0.174.0/examples/jsm/loaders/GLTFLoader.js'; // import own 3D models

import { OrbitControls } from 'https://unpkg.com/three@0.174.0/examples/jsm/controls/OrbitControls.js'; // import to rotate the GLTF model using mouse click and drag

import { DecalGeometry } from 'https://unpkg.com/three@0.174.0/examples/jsm/geometries/DecalGeometry.js'; // import to place decal on top of model

import { GLTFExporter } from 'https://unpkg.com/three@0.174.0/examples/jsm/exporters/GLTFExporter.js'; // import to export the scene



let loadingText, logo, decalPlaced = false;
let canvas, scene, camera, renderer, controls, light;
let loader, model, box, center, size;
let mouse, raycaster, helper, customDecal, decal, decalTexture, decalMaterial;

document.querySelectorAll(".thumbnail").forEach(thumbnail => {
    thumbnail.addEventListener("click", function () {
        document.getElementById("bigImage").src = this.src;

        // Remove 'active' class from all thumbnails
        document.querySelectorAll(".thumbnail").forEach(img => img.classList.remove("active"));

        // Add 'active' class to the clicked thumbnail
        this.classList.add("active");
    });
});

// Define sizes dynamically
const sizes = ["S", "M", "L", "XL", "2XL"];

// Generate size buttons dynamically
const sizeContainer = document.getElementById("idSizeOptions");
sizes.forEach(size => {
    const btn = document.createElement("button");
    btn.classList.add("sizeBtn");
    btn.textContent = size;
    
    // Set click event immediately
    btn.onclick = function () {
        document.querySelectorAll(".sizeBtn").forEach(sizeBtn => sizeBtn.classList.remove("activeSize"));
        this.classList.add("activeSize");
    };

    sizeContainer.appendChild(btn);
});

// Define colors dynamically
const colors = ["white", "black", "blue", "red"];

// Generate color buttons dynamically
const colorContainer = document.getElementById("idColorOptions");
colors.forEach(color => {
    const btn = document.createElement("button");
    btn.classList.add("colorBtn");
    btn.style.backgroundColor = color;
    btn.setAttribute("data-color", color);
    
    // Set click event immediately (slow for whatever reason and not working as intended)
    btn.onclick = function () {
        document.querySelectorAll(".colorBtn").forEach(colorBtn => colorBtn.classList.remove("activeColor"));
        this.classList.add("activeColor");
    };

    colorContainer.appendChild(btn);
});

document.getElementById("openModal").addEventListener("click", function () {
    document.getElementById("modal3D").style.display = "flex";
    document.getElementById("modalImage").style.display = "flex";
    document.body.classList.add("no-scroll");
});

document.getElementById("closeModal").addEventListener("click", function () {
    document.getElementById("modal3D").style.display = "none";
    document.getElementById("modalImage").style.display = "none";
    document.body.classList.remove("no-scroll");
});

document.addEventListener("DOMContentLoaded", function () {
    const label = document.getElementById("uploadImage");
    const fileInput = label.querySelector("input[type='file']");

    fileInput.addEventListener("change", function (event) {

        if (event.target.files && event.target.files[0]) {

            const reader = new FileReader();
            reader.onload = function (e) {

                reader.src = URL.createObjectURL(event.target.files[0]); // set src to blob url

                logo = reader.src;
    
                label.innerHTML = `<img id="chosenImg" class="chosenImg" src="${e.target.result}" alt="Uploaded Image" style="max-width: 50%; height: 50%;">`;

                checkSupport();

            };

            document.getElementById('warningsId').innerText = "Double Click to place decal!"

            reader.readAsDataURL(event.target.files[0]);
            removeClass("btnReplaceImage", "hideButton");
           
        }
    })
})

document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("inputReplaceImage");

    fileInput.addEventListener("change", function (event) {

        if (event.target.files && event.target.files[0]) {

            const reader = new FileReader();

            reader.onload = function (e) {

                logo = e.target.result;

                document.getElementById("chosenImg").src = logo;

                checkSupport();

            };

            reader.readAsDataURL(event.target.files[0]);

            removeDecal();
        }
    });
});


function removeClass(id, className) {

    let element = document.getElementById(id);
    element.classList.remove(className);
}

function addClass(id, className) {

    let element = document.getElementById(id);
    element.classList.add(className);
}

function checkSupport() {

    if (WebGL.isWebGL2Available()) {

        initThreeJS();

    } else {

        const webGLError =  WebGL.getWebGL2ErrorMessage();
        //document.getElementById('modal3D').appendChild(warning);

        loadingText = document.getElementById("loading");
        loadingText.style.display = webGLError;

    }
}

function initThreeJS() {

    canvas = document.getElementById("modelCanvas");
    loadingText = document.getElementById("loading");

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, canvas.clientWidth / canvas.clientHeight, 0.1, 2000);

    // Renderer
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(canvas.devicePixelRatio);
    
    // Adding OrbitControls
    controls = new OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1.2;
    controls.minDistance = 1;
    controls.maxDistance = 1.5;
    controls.enablePan = true;

    // Light
    light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    // Adding own model to the scene
    loader = new GLTFLoader();

    loader.load('../public/modelos3D/3D_Shirt.glb', function(gltf){

        model = gltf.scene;

        scene.add(model);

        // Center model
        box = new THREE.Box3().setFromObject(model);
        center = box.getCenter(new THREE.Vector3());

        // Place the model in the center
        model.position.sub(center);

        // Move camera to fit model
        size = box.getSize(new THREE.Vector3()).length();
        camera.position.set(0, size * 0.5, size * 1.5);
        camera.lookAt(model.position);


        addCustomDecal();


    }, undefined, function(error){

        alert(`Error loading the model! \n Please try again. \n Error: ${error}`);

    });

    // Hide loading text when model is ready
    loadingText.style.display = "none";

    animate();

    // Resize Handling
    canvas.addEventListener("resize", () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });

}

// Animate the model
function animate() {

    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);

}

// Add decal to Model
function addCustomDecal() {

    // Decal
    mouse = new THREE.Vector2();
    raycaster = new THREE.Raycaster();
    helper = new THREE.Object3D();

    // Load the custom decal
    customDecal = new THREE.TextureLoader();
    decalTexture = customDecal.load(logo);

    document.addEventListener('dblclick', onClick);

}

function onClick(event){

    event.preventDefault();

    mouse.x = (event.clientX / canvas.width) * 2 - 1;
    mouse.y = - (event.clientY / canvas.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObject(model, true);

    if (intersects.length > 0) {

        let intersectedMesh = intersects[0].object;
        let position = intersects[0].point;
        let normal = intersects[0].face.normal.clone();
        normal.transformDirection(intersectedMesh.matrixWorld);
        normal.add(position);
        helper.position.copy(position);
        helper.lookAt(normal);
    
        let size = new THREE.Vector3(0.3, 0.3, 0.3);
        let decalGeometry = new DecalGeometry(intersectedMesh, position, helper.rotation, size);
        decalMaterial = new THREE.MeshStandardMaterial({
            map: decalTexture,
            transparent: true,
            depthTest: true,
            depthWrite: false,
            polygonOffset: true,
            polygonOffsetFactor: -4,
        });

        if (!decalPlaced) {

            decal = new THREE.Mesh(decalGeometry, decalMaterial);
            scene.add(decal);

            decalPlaced = true;

            document.getElementById('warningsId').innerText = "Limit to only one decal!"

            removeClass("rmvDecal", "disableButton");
            removeClass("btnAdd", "disableButton");
            document.removeEventListener('dblclick', onClick);


            addToCart();

            document.querySelectorAll(".removeDecal").forEach(button => {
                button.addEventListener("click", function() {
                    removeDecal()
                });
            });

        }
    }
}

function removeDecal() {

    scene.remove(decal);
    decalPlaced = false;

    document.getElementById('warningsId').innerText = "Double Click to place decal!"
    document.addEventListener('dblclick', onClick);
    addClass("rmvDecal", "disableButton");
    addClass("btnAdd", "disableButton");

}

function addToCart() {

    document.querySelectorAll(".buttonAdd").forEach(button => {
        button.addEventListener("click", function() {

        const gltfExporter = new GLTFExporter();

        gltfExporter.parse(
            scene,
            function (result) {

                if (result instanceof ArrayBuffer) {

                    saveArrayBuffer(result, 'scene.glb');

                } else {

                    const output = JSON.stringify(result, null, 2);
                    saveString(output, 'scene.gltf');

                }

            },
            function ( error ) {

                console.log('An error happened during parsing', error);

            },
        );

        });
    });

}

const link = document.createElement('a');
link.style.display = 'none';
document.body.appendChild(link); // Firefox workaround, see #6594

function save(blob, filename) {

    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();

    // URL.revokeObjectURL( url ); breaks Firefox...

}

function saveString(text, filename) {

    save(new Blob([text], {type: 'text/plain'} ), filename);

}


function saveArrayBuffer(buffer, filename) {

    save(new Blob([buffer], {type: 'application/octet-stream'}), filename);

}