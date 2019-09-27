const videoElem = document.getElementById('video');
const startElem = document.getElementById('start');
const stopElem = document.getElementById('stop');

const mediaOptions = {
    video: {
        cursor: 'motion'
    },
    audio: true
}

startElem.addEventListener('click', function(e){
    startCapture()
}, false);

stopElem.addEventListener('click', function(e){
    stopCapture();
}, false);

async function startCapture(){
    try {
        videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(mediaOptions);
        console.log('Screen Capture Streaming!');
    } catch(err) {
        console.log('Error:', err);
    }
}

function stopCapture(){
    const tracks = videoElem.srcObject.getTracks();

    tracks.forEach(track => {
        console.log('Stopping Track:', track);
        track.stop();
    });

    videoElem.srcObject = null;
}
