const videoElem = document.getElementById('video');
const playBack = document.getElementById('play-back');
const startElem = document.getElementById('start');
const stopElem = document.getElementById('stop');
let recordedChunks = [];
let recorder = null;
let shouldStop = false;

// navigator.mediaDevices.enumerateDevices().then(devices => {
//     devices.forEach(d => console.log('Device:', d));
// });

// console.log('webm: ', MediaRecorder.isTypeSupported('video/webm\;codecs=h264'));
// console.log('webm: ', MediaRecorder.isTypeSupported('video/webm\;codecs=vp8'));
// console.log('webm: ', MediaRecorder.isTypeSupported('video/webm\;codecs=daala'));
// console.log('mp4: ', MediaRecorder.isTypeSupported('video/mpeg'));

const mediaOptions = {
    video: {
        cursor: 'motion'
    },
    audio: false
}

navigator.mediaDevices.getUserMedia({ audio: true }).then(function () {
    console.log('Arguments:', arguments);
    mediaOptions.audio = true;
});

startElem.addEventListener('click', function(e){
    startCapture()
}, false);

stopElem.addEventListener('click', function(e){
    stopCapture();
}, false);

async function startCapture(){
    try {
        const recorderOptions = { mimeType: 'video/webm\;codecs=h264'};
        recordedChunks = [];
        
        const stream = await navigator.mediaDevices.getDisplayMedia(mediaOptions);
        videoElem.srcObject = stream;

        recorder = new MediaRecorder(stream, recorderOptions);

        console.log('MIME TYPE:', recorder.mimeType);

        recorder.addEventListener('dataavailable', function(e){
            console.log('Recorder Event:', e);
            console.log('Stream:', stream);
            recordedChunks.push(e.data);
            sendChunk(e.data);

            if(recorder.state === 'inactive'){
                console.log('SENDING ALL CHUNKS');
                sendChunk(recordedChunks);
            }
        });

        recorder.addEventListener('start', function(){
            console.log('Start Called:', arguments);
            // recorder.requestData();
            setTimeout(() => {
                recorder.requestData();
            }, 300);
        });

        recorder.addEventListener('stop', function(){
            console.log('Recorder Stopped');
        });

        recorder.start(2000);

        // setTimeout(() => {
        //     recorder.requestData();
        // }, 300);

        console.log('Recorder State:', recorder.state);

        console.log('Screen Capture Streaming!');
    } catch(err) {
        console.log('Error:', err);
    }
}

function stopCapture(){
    const tracks = videoElem.srcObject.getTracks();

    if (recorder && recorder.state === 'recording') {
        console.log('Stopping Recorder');
        recorder.stop();
    }

    tracks.forEach(track => {
        console.log('Stopping Track:', track);
        track.stop();
    });

    // videoElem.srcObject = null;
}

function sendChunk(data){
    if(Array.isArray(data)){
        const dataUrl = URL.createObjectURL(new Blob(data));

        console.log('Full Data URL:', dataUrl);

        playBack.src = dataUrl;
        return;
    }

    toDataUrl(data);

    // console.log('Data Chunk:', data);
    // const dataUrl = URL.createObjectURL(data);

    // console.log('Data URL:', dataUrl);
}

function postData(obj) {
    const params = new URLSearchParams();

    for ([k, v] of Object.entries(obj)) {
        params.append(k, v);
    }

    return params;
}

function toDataUrl(data){
    const f = new FileReader();
    f.onload = function(e){
        // console.log(e.target.result);
    }

    f.readAsDataURL(data);
}
