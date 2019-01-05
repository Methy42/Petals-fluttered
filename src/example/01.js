const THREE = require('three');

export default function E001() {
    var app = {};

    function main() {
        app.renderer = new THREE.WebGLRenderer();
        app.renderer.shadowMapEnabled = true;
        app.renderer.shadowMapType = THREE.PCFSoftShadowMap;

        app.scene = new THREE.Scene();
        app.scene.fog = new THREE.Fog(0xffffff, 0,100);
        app.camera = new THREE.PerspectiveCamera(45, 2 / 1, 0.1, 1000);
        app.camera.position.x = -30;
        app.camera.position.y = 40;
        app.camera.position.z = 30;
        app.camera.lookAt(app.scene.position);

        var planeGeometry = new THREE.PlaneGeometry(60, 50, 1, 1);
        var planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
        app.plane = new THREE.Mesh(planeGeometry, planeMaterial);
        app.plane.receiveShadow = true;
        // rotate and position the plane
        app.plane.rotation.x = -0.5 * Math.PI;
        app.plane.position.x = 0;
        app.plane.position.y = 0;
        app.plane.position.z = 0;

        app.scene.add(app.plane);

        app.ambientLight = new THREE.AmbientLight(0x0c0c0c);
        app.scene.add(app.ambientLight);

        app.spotLight = new THREE.SpotLight(0xffffff);
        app.spotLight.position.set(-40, 60, -10);
        app.spotLight.castShadow = true;
        app.scene.add(app.spotLight);

        document.body.appendChild(app.renderer.domElement);
        setCanvasSize();

        app.cubes = [];
        for(var i = 1; i < 100; i++){
            addCube();
        }

        app.renderer.render(app.scene, app.camera);
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

    function addCube() {
        var cubeSize = Math.ceil((Math.random() * 3));
        var cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff });
        var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.castShadow = true;
        cube.name = "cube-" + app.scene.children.length;
        // position the cube randomly in the scene
        cube.position.x = -30 + Math.round((Math.random() * app.plane.geometry.parameters.width));
        cube.position.y = Math.round((Math.random() * 5));
        cube.position.z = -20 + Math.round((Math.random() * app.plane.geometry.parameters.height));

        cube.rotation.x = Math.round((Math.random() * 90));
        cube.rotation.y = Math.round((Math.random() * 90));
        cube.rotation.z = Math.round((Math.random() * 90));
        // add the cube to the scene
        app.scene.add(cube);
        app.cubes.push(cube);
    }

    main();
}