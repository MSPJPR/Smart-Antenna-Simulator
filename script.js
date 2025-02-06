let scene, camera, renderer, antenna;

function initThreeJS() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.5);
    document.getElementById("threejs-container").appendChild(renderer.domElement);
    camera.position.z = 5;
    animate();
}

function createAntenna(type) {
    if (antenna) {
        scene.remove(antenna);
    }

    let geometry, material = new THREE.MeshBasicMaterial({ color: 0x0073e6, wireframe: true });

    switch (type) {
        case "dipole":
            geometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
            break;
        case "helical":
            geometry = new THREE.TorusGeometry(1, 0.2, 8, 100);
            break;
        case "yagi":
            geometry = new THREE.BoxGeometry(2, 0.1, 0.1);
            break;
        default:
            geometry = new THREE.SphereGeometry(1, 16, 16);
    }

    antenna = new THREE.Mesh(geometry, material);
    scene.add(antenna);
}

function simulateAntenna() {
    let type = document.getElementById("antennaType").value;
    let frequency = parseFloat(document.getElementById("frequency").value);
    let length = parseFloat(document.getElementById("length").value);

    createAntenna(type);

    let gain = (length * frequency) / 2;
    let beamwidth = 70 / frequency;
    let directivity = 10 * Math.log10(gain);

    document.getElementById("gainValue").innerText = gain.toFixed(2);
    document.getElementById("beamwidthValue").innerText = beamwidth.toFixed(2);
    document.getElementById("directivityValue").innerText = directivity.toFixed(2);
}

function animate() {
    requestAnimationFrame(animate);
    if (antenna) antenna.rotation.y += 0.01;
    renderer.render(scene, camera);
}

window.onload = () => {
    initThreeJS();
    simulateAntenna();
};
