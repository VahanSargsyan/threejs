const c = console;
const dN =  degreeNominal = 0.10471666666666667 // degreeNominal = 6^

const planetCreator = (r, dist, name) => {
    let link = '/threejs/img/' + name + '.jpg'
    const texture = new THREE.TextureLoader().load(link);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );
    const planetGeo = new THREE.SphereGeometry(r, 36, 36);
    const planetMat = new THREE.MeshLambertMaterial({ map: texture });
    const planet = new THREE.Mesh(planetGeo, planetMat);
    planet.position.x = dist;
    planet.dist = planet.dist || dist;
    planet.speed = 5 / (r / 4);
    planet.xDirection = -1;
    planet.zDirection = -1;
    return planet;
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
    camera.position.z = 500;
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const solarSystem = [
        planetCreator(300, 0, 'sun'),         //sun
        planetCreator(11.88, 600, 'mercury'),     //mercury
        planetCreator(12.2, 800, 'venera'),      //venera
        planetCreator(12.9, 1100, 'eart'),     //Eart
        planetCreator(6.8, 1350, 'mars'),      //mars
        planetCreator(142.8, 2000, 'jupiter'),    //jupiter
        planetCreator(120.66, 2500, 'saturn'),   //saturn
        planetCreator(51.12, 2900, 'uranus'),    //uranus
        planetCreator(49.53, 3400, 'neptune'),    //neptune
        planetCreator(2.1, 3500, 'pluto'),      //pluto
    ]
    //// add spaces 
    const spacesGeo = new THREE.SphereGeometry(50000, 36, 36);
    const spacesTexture = new THREE.TextureLoader().load('/threejs/img/stars.jpg');
    const spacesMaterial = new THREE.MeshPhongMaterial({ map: spacesTexture });
    const spaces = new THREE.Mesh(spacesGeo, spacesMaterial);
    spaces.material.side = THREE.BackSide;
    scene.add(spaces);    
    scene.add(...solarSystem);
    
    
    
   

    const light = new THREE.AmbientLight(0xffffff);
    scene.add( light );
    const sunLight1 = new THREE.PointLight(0xffffff, 2, 3600, 2);
    sunLight1.position.set(0, 50, 0);
    scene.add(sunLight1);
    const sunLight2 = new THREE.PointLight(0xffffff, 2, 3600, 2);
    sunLight2.position.set(0, -50, 0);
    scene.add(sunLight2);

    //experimental zone/////////////////////////////////////////
    // const texture = new THREE.TextureLoader().load('../img/eartTexture.jpg');
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.wrapT = THREE.RepeatWrapping;
    // texture.repeat.set( 1, 1 );
    // const secondEartMaterial = new THREE.MeshBasicMaterial({ map: texture })
    // const secondEartGeo = new THREE.SphereGeometry(50, 36, 36);
    // const secondEart = new THREE.Mesh(secondEartGeo, secondEartMaterial);
    // secondEart.position.set(0, 600, 0);
    // scene.add( secondEart );



    // const light2 = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    // scene.add( light2 );
// GUI setup start
    // const sphereAnim = () => {
    //      this.rotationX = 0,
    //      this.rotationY = 0,
    //      this.rotationZ = 0,
    //      this.positionX = 0,
    //      this.positionY = 0,
    //      this.positionZ = 0
    // }
    // const anim = new sphereAnim();
    // const gui = new dat.GUI();
    // gui.add(anim, rotationX).min(-0.1).max(0.1).step(0.01);
    // gui.add(anim, rotationY).min(-0.1).max(0.1).step(0.01);
    // gui.add(anim, rotationZ).min(-0.1).max(0.1).step(0.01);
    // gui.add(anim, positionX).min(-2).max(2).step(0.1);
    // gui.add(anim, positionY).min(-2).max(2).step(0.1);
    // gui.add(anim, positionZ).min(-2).max(2).step(0.1);
// GUI setup end
    const animate = function () {
        requestAnimationFrame( animate );
        solarSystem.map( el => {
             el.rotation.y += 0.01;
             if (el.position.x >= el.dist) el.xDirection = -1;
             if (el.position.x <= -el.dist) el.xDirection = 1;
             if (el.position.z >= el.dist) el.zDirection = -1;
             if (el.position.z <= -el.dist) el.zDirection = 1;  
             el.position.x += (el.speed * el.xDirection);  
             el.position.z += (el.speed * el.zDirection);         
        }) 
        renderer.render(scene, camera);
    };
    animate();
}


