const c = console;
const degreeNominal = 0.10471666666666667 // degreeNominal = 6^
const dN = degreeNominal
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
    c.log(THREE);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    const baloonArr = []
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.SphereGeometry( 50,12,12 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true });
        const sphere = new THREE.Mesh( geometry, material );
        sphere.position.x = -250 + 100 * i;
        baloonArr.push(sphere);
       
    }
    const geometry = new THREE.SphereGeometry( 100,12,12 );
    const material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true });

    const planeGeo = new THREE.PlaneGeometry(300, 200, 500 );
    const planeMat = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DubleSide});
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.x = -1;
    plane.position.z = 50;
    plane.position.y = -100;
    scene.add(plane);
    scene.add(...baloonArr );
    
    
    
    camera.position.z = 500;
    // camera.position.x = 100;
    // camera.position.y = 100;
    // camera.position.z = 300;
    // camera.lookAt(new THREE.Vector3(0, 0, 0));
    // var flyControls = new THREE.FlyControls(camera);
    // flyControls.movementSpeed = 25;
    // flyControls.domElement = document.querySelector("#WebGL-output");
    // flyControls.rollSpeed = Math.PI / 24;
    // flyControls.autoForward = true;
    // flyControls.dragToLook = false;

    const light = new THREE.AmbientLight(0x0000ff);
    scene.add( light );
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
    
        // sphere.rotation.x += sphereAnim.rotationX;
        // sphere.rotation.y += sphereAnim.rotationY;
        baloonArr.map( el => {
            el.rotation.y += 0.01//sphereAnim.rotationZ;
        }) 
        // sphere.position.x += sphereAnim.positionX;
        // sphere.position.y += sphereAnim.positionY;
        // sphere.position.z += sphereAnim.positionZ;
        renderer.render(scene, camera);
    };
    
    animate();
}


