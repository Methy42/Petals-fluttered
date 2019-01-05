const THREE = require('three');

import Petal from './Petal';

export default function Atlant() {
    var app = {};

    function main() {
        app.renderer = new THREE.WebGLRenderer();
        app.renderer.shadowMapEnabled = true;
        app.renderer.shadowMapType = THREE.PCFSoftShadowMap;
        app.renderList = [];

        app.scene = new THREE.Scene();
        app.scene.fog = new THREE.Fog(0x000000, 0,1000);
        app.camera = new THREE.PerspectiveCamera(45, 2 / 1, 0.1, 1000);
        app.camera.position.x = 0;
        app.camera.position.y = 0;
        app.camera.position.z = 100;
        app.camera.lookAt(app.scene.position);

        app.ambientLight = new THREE.AmbientLight(0x0c0c0c);
        app.scene.add(app.ambientLight);

        app.spotLight = new THREE.SpotLight(0xffffff,4);
        app.spotLight.position.set(160, 80, -60);
        app.spotLight.castShadow = true;
        app.scene.add(app.spotLight);

        skySphere();

        document.body.appendChild(app.renderer.domElement);
        setCanvasSize();

        animate();

        createPetals ();
    }

    function setCanvasSize() {
        if (window.innerWidth > window.innerHeight * 2) {
            app.renderer.setSize(window.innerHeight * 4, window.innerHeight * 2);
            app.renderer.domElement.style.width = "180vh";
            app.renderer.domElement.style.height = "90vh";
        } else {
            app.renderer.setSize(window.innerWidth * 2, window.innerWidth);
            app.renderer.domElement.style.width = "90vw";
            app.renderer.domElement.style.height = "45vw";
        }
    }

    function skySphere(){
        var planeGeometry = new THREE.PlaneGeometry(360, 180, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc });
        app.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        app.plane.receiveShadow = true;

        
        app.plane.position.x = 0;
        app.plane.position.y = 0;
        app.plane.position.z = -100;

        app.scene.add(app.plane);
    }

    function createPetals () {
        var count = 2000;
        for(var i = 0; i < count; i++){
            var petal = new Petal(app);
            app.scene.add( petal.petal );
            app.renderList.push(petal.animate);
        }
    }

    function animate() {
        requestAnimationFrame( animate );
        app.renderList.forEach(function(render){
           render();
        });
        app.renderer.render( app.scene, app.camera );
    }

    main();
    window.onresize = function(){
        setCanvasSize();
    }
}