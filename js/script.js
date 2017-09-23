const c = console;
const dN = 0.10471666666666667 //dN is degreeNominal = 6^

const planetCreator = (r, dist, name, speed) => {
    let link = '/threejs/img/' + name + '.jpg'
    const texture = new THREE.TextureLoader().load(link);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    const planetGeo = new THREE.SphereGeometry(r, 36, 36);
    const planetMat = new THREE.MeshLambertMaterial({ map: texture });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.name = name;
    planet.position.x = dist;
    planet.dist = planet.dist || dist;
    planet.speed = speed / 25;
    planet.xDirection = -1;
    planet.zDirection = -1;
    return planet;
}
const satelliteing = ( parent, satEl, distance, speed = 0) => {
    satEl.position.x = parent.position.x + distance;
    satEl.position.y = parent.position.y;
    
    satEl.animation = () => {
        satEl.rotation.z += 0.003;
        if (satEl.position.x >= distance + parent.position.x) satEl.xDirection = -1;
        if (satEl.position.x <= -(distance + parent.position.x)) satEl.xDirection = 1; 
        satEl.position.x = parent.position.x + distance;
        satEl.position.z = parent.position.z;
        
        // satEl.position.x += (speed * satEl.xDirection);  
        // el.position.z = (Math.sqrt( el.dist ** 2 - el.position.x ** 2 ) * el.xDirection);         
   } 

}


window.onload = function() {
      //camera custome  control start
      document.onkeydown  = e =>{ //keyboard control
        if (e.keyCode === 87 || e.keyCode === 38) camera.position.z -= 10;
        if (e.keyCode === 83 || e.keyCode === 40) camera.position.z += 10;
        if (e.keyCode === 68 || e.keyCode === 39) camera.position.x += 10;
        if (e.keyCode === 65 || e.keyCode === 37) camera.position.x -= 10;
        if (e.keyCode === 32) camera.position.y += 10;
        if (e.keyCode === 17) camera.position.y -= 10;
    }
    document.onmousedown = e => {
        c.log(e);
        c.log(camera.rotation)
        if (e.clientX < window.innerWidth / 2) camera.rotation.y += dN;
        if (e.clientX > window.innerWidth / 2) camera.rotation.y -= dN;
           
    }
    //camera custome  control end
      
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 100000 );
    camera.position.z = 1150;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const solarSystem = [
        // planetCreator( radiusOfPlanet, distanceFromSun, textureName, speed )
        planetCreator(300, 0, 'sun', 0),         //sun
        planetCreator(11.88, 600, 'mercury', 47.87),     //mercury
        planetCreator(12.2, 800, 'venera', 35),      //venera
        planetCreator(12.9, 1100, 'eart', 30),     //Eart
        planetCreator(6.8, 1350, 'mars', 24),      //mars
        planetCreator(142.8, 2000, 'jupiter', 13),    //jupiter
        planetCreator(120.66, 2500, 'saturn', 10),   //saturn
        planetCreator(51.12, 2900, 'uranus', 7),    //uranus
        planetCreator(49.53, 3400, 'neptune', 5.5),    //neptune
        planetCreator(2.1, 3500, 'pluto', 3),      //pluto
      
    ]
    ////==================>satellites start
    const satellites = [];

    const moon =  planetCreator(2.5, 0, 'moon', 0 );
    satelliteing(solarSystem[3], moon, 30);
    satellites.push(moon);

    const saturnRing = new THREE.Mesh(new THREE.RingGeometry(150, 230, 30), new THREE.MeshBasicMaterial({ color: 0xf4f4f4, side: THREE.DoubleSide }));
    saturnRing.rotation.x = 15 * dN;
    satelliteing(solarSystem[5], saturnRing, 0)
    satellites.push(saturnRing);
      ////==================>satellites End
    
    //// add spaces 
    const spacesGeo = new THREE.SphereGeometry(50000, 36, 36);
    const spacesTexture = new THREE.TextureLoader().load('/threejs/img/stars.jpg');
    const spacesMaterial = new THREE.MeshPhongMaterial({ map: spacesTexture });
    const spaces = new THREE.Mesh(spacesGeo, spacesMaterial);
    spaces.material.side = THREE.BackSide;

    //experimental zone 
    const listener = new THREE.AudioListener();
    camera.add( listener );
    
    //Create the PositionalAudio object (passing in the listener)
    const sound1 = new THREE.PositionalAudio( listener );
    const sound2 = new THREE.PositionalAudio( listener );
    c.log( sound2 );
    //Load a sound and set it as the PositionalAudio object's buffer
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load( '/threejs/audio/sun.ogg', function( buffer ) {
        sound1.setBuffer( buffer );
        sound1.setRefDistance( 20 );
        sound2.loop = true;
        sound1.play();

    });
    audioLoader.load( '/threejs/audio/earth.ogg', function( buffer ) {
        sound2.setBuffer( buffer );
        sound2.setRefDistance( 4 );
        sound2.loop = true;
        sound2.play();
        
    });
    c.log( sound2 )
    solarSystem[0].add( sound1 );
    solarSystem[3].add( sound2 );
    
   

    const light = new THREE.AmbientLight(0xffffff);
    scene.add( light );
    const sunLight1 = new THREE.PointLight(0xffffff, 2, 3600, 2);
    sunLight1.position.set(0, 50, 0);
    scene.add(sunLight1);
    const sunLight2 = new THREE.PointLight(0xffffff, 2, 3600, 2);
    sunLight2.position.set(0, -50, 0);
    scene.add(sunLight2);
    scene.add(spaces);    
    scene.add(...solarSystem);
    scene.add(...satellites);
    const animate = function () {
        requestAnimationFrame( animate );
        solarSystem.map( el => {
             el.rotation.y += 0.01;
             if (el.position.x >= el.dist) el.xDirection = -1;
             if (el.position.x <= -el.dist) el.xDirection = 1; 
             el.position.x += (el.speed * el.xDirection);  
             el.position.z = (Math.sqrt( el.dist ** 2 - el.position.x ** 2 ) * el.xDirection);         
        })
        satellites.map(el => {
            el.animation();
        }) 
        renderer.render(scene, camera);
    };
    animate();
}