var THREE = require('three');

var SceneUtils = {

	createMultiMaterialObject: function ( geometry, materials ) {

		var group = new THREE.Group();

		for ( var i = 0, l = materials.length; i < l; i ++ ) {

			group.add( new THREE.Mesh( geometry, materials[ i ] ) );

		}

		return group;

	},

	detach: function ( child, parent, scene ) {

		child.applyMatrix( parent.matrixWorld );
		parent.remove( child );
		scene.add( child );

	},

	attach: function ( child, scene, parent ) {

		child.applyMatrix( new THREE.Matrix4().getInverse( parent.matrixWorld ) );

		scene.remove( child );
		parent.add( child );

	}

};

export default function Petal(app){

    var that = this;
    this.v = 0.5 + Math.random();

    function main () {
        var geometry = new THREE.Geometry();

        // var verticesOfCube = [
        //     // -1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
        //     // -1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
        // ];
        
        // var indicesOfFaces = [
        //     // 2,1,0,    0,3,2,
        //     // 0,4,7,    7,3,0,
        //     // 0,1,5,    5,4,0,
        //     // 1,2,6,    6,5,1,
        //     // 2,3,7,    7,6,2,
        //     // 4,5,6,    6,7,4
        // ];

        var pines = getAllPineOnHeart();
        pines.forEach(function(pine){
            // verticesOfCube.push(pine[0],  pine[1], 0);
            geometry.vertices.push(
                new THREE.Vector3( pine[0],  pine[1], 0 )
            );
        });
        // verticesOfCube.push(0,  0, 0);
        // verticesOfCube.push(0,  0, 0);
        geometry.vertices.push(
            new THREE.Vector3( 0,  0, 0.1 ),
            new THREE.Vector3( 0,  0, -0.1 )
        );
        
        
    
        var lin = pines.length;
        pines.forEach(function(pine, index){
            if(index + 1 < lin){
                // indicesOfFaces.push(index, index + 1, lin);
                // indicesOfFaces.push(index, lin, index +1);
                // indicesOfFaces.push(index, index + 1, lin+1);
                // indicesOfFaces.push(index, lin + 1, index +1);
                geometry.faces.push(
                    new THREE.Face3(index, index + 1, lin, null, "rgba(238, 162, 164, 0.3)"),
                    new THREE.Face3(index, lin, index +1, null, "rgba(238, 162, 164, 0.3)"),
                    new THREE.Face3(index, index + 1, lin+1, null, "rgba(238, 162, 164, 0.3)"),
                    new THREE.Face3(index, lin + 1, index +1, null, "rgba(238, 162, 164, 0.3)")
                );
            }
        });
        
    
        geometry.computeBoundingSphere();
        // var geometry = new THREE.PlaneGeometry(1, 1, 1, 1);
        
        // var geometry = new THREE.PolyhedronGeometry( verticesOfCube, indicesOfFaces );
        // var materials = [
        //     new THREE.MeshLambertMaterial( { opacity: 0, transparent: true } ),
        //     new THREE.MeshBasicMaterial( { color: "#eea2a4" } )
        // ];

        var material = new THREE.MeshBasicMaterial( { color: "#eea2a4" } );
    
        // that.petal = new SceneUtils.createMultiMaterialObject( geometry, materials );
        that.petal = new THREE.Mesh(geometry, material);
        // that.petal.traverse(function(e){
        //     e.castShadow = true;
        // });

        setPlace();
    }

    function setPlace(){
        that.v = 0.5 + Math.random();
        var canvasWidth = app.renderer.domElement.width * 2;
        var canvasHeight = app.renderer.domElement.height * 2;
        var depth = 200;

        var z = depth/2 - (depth * Math.random());
        var thisWidth = canvasWidth * (z / depth);
        var thisHeight = canvasHeight * (z / depth);
        var x = thisWidth/2 - (thisWidth * Math.random());
        that.y = thisHeight/2 - (thisHeight * Math.random());
        
        var rx = 360 * Math.random();
        var ry = 360 * Math.random();
        var rz = 360 * Math.random();

        that.petal.position.x = x;
        that.petal.position.y = that.y;
        that.petal.position.z = z;
        that.petal.rotation.x = rx;
        that.petal.rotation.y = ry;
        that.petal.rotation.z = rz;
    }
    
    function getAllPineOnHeart() {
        var pines = [];
    
        // -pi<=t<=pi 或 0<=t<=2*pi
        for(var i = -Math.PI; i <= Math.PI; i=i+0.1){
            var x = 0.2 * (2 * Math.cos(i) - Math.cos(2 * i)); // a*(2*cos(t)-cos(2*t))
            var y = 0.2 * (2 * Math.sin(i) - Math.sin(2 * i)); // a*(2*sin(t)-sin(2*t))
            pines.push([x,y]);
        }
        pines.push([
            0.2 * (2 * Math.cos(Math.PI) - Math.cos(2 * Math.PI)),
            0.2 * (2 * Math.sin(Math.PI) - Math.sin(2 * Math.PI))
        ]);
        return pines;
    }
    
    this.animate = function(){
        if(that.y - that.petal.position.y > 100){
            setPlace();
        }
        that.petal.rotation.x += 0.1 * that.v;
        that.petal.rotation.y += 0.1 * that.v;
        that.petal.position.x += 0.1 * that.v;
        that.petal.position.y -= 0.1 * that.v;
    }

    main ();
}