const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');


function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMeadiaStream=>{
        console.log(localMeadiaStream);
        video.src=window.createObjectURL(localMeadiaStream);
        video.play();
    })
    .catch(err=>{
        console.error(`oh no!!`,err);
    })
}

function paintToCanvas(){
    const width=video.videoWidth;
    const height=video.videoHeight;
    canvas.width=width;
    canvas.height=height;

    setInterval(()=>{
        ctx.drawImage(video, 0,0 ,width, height);
    },16);
//take the pixels out
let pixels = ctx.getImageData(0, 0, width, height);
//mess with the pixels
/* pixels=redEffect(pixels); */
pixels=rgbSplit(pixels);
//put the pixels back 
ctx.putImageData(pixels,0,0);
}
function takePhoto(){
    //play sound
    snap.currentTime=0;
    snap.play();

    //take the data out of canva i.e :take the photo
    const data=canvas.toDataURL('image/jpeg');
const link=document.createElement('a');
link.href=data;
link.setAttribute('download','Handsome');
link.innerHTML=`<img src="${data}" alt="Handsome MAN/>`;
strip.insertBefore(link, strip.firstChild);
}
function redEffect(pixels){
for(let i=0; i<pixels.data.length; i++){
    pixels.data[i+0]=pixels.data[i+0]+100//red
    pixels.data[i+1]=pixels.data[i+1]-50//green
    pixels.data[i+2]=pixels.data[i+2]*0.5//blue
    
    

    
}
return pixels;
}
function rgbSplit(){
    for(let i=0; i<pixels.data.length; i++){
        pixels.data[i-150]=pixels.data[i+0]//red
        pixels.data[i+100]=pixels.data[i+1]//green
        pixels.data[i-150]=pixels.data[i+2]//blue
        
        
    
        
    }
    return pixels;
    }

    function greenScreen(pixels) {
        const levels = {};
      
        document.querySelectorAll('.rgb input').forEach((input) => {
          levels[input.name] = input.value;
        });
      
        for (i = 0; i < pixels.data.length; i = i + 4) {
          red = pixels.data[i + 0];
          green = pixels.data[i + 1];
          blue = pixels.data[i + 2];
          alpha = pixels.data[i + 3];
      
          if (red >= levels.rmin
            && green >= levels.gmin
            && blue >= levels.bmin
            && red <= levels.rmax
            && green <= levels.gmax
            && blue <= levels.bmax) {
            // take it out!
            pixels.data[i + 3] = 0;
          }
        }
      
        return pixels;
      }

getVideo();
video.addEventListener('canplay',paintToCanvas);