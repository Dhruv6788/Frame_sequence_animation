var canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 893,
};

let loadedImages = 0;
var images = [];

const preloadImages = () => {
  for (var i = 1; i <= frames.maxIndex; i++) {
    const imgUrl = `./frames/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imgUrl;
    img.onload = () => {
      loadedImages++;
      if (loadedImages === frames.maxIndex) {
        loadImage(frames.currentIndex);
        startAnimation();
      }
    }
    images.push(img);
  }
};

const loadImage = (index) => {
  if (index >= 0 && index <= frames.maxIndex) {
    let image = images[index]; 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const scaleX = canvas.width / image.width;
    console.log(image.width)
    const scaleY = canvas.height / image.height;
    const scale = Math.max(scaleX, scaleY);

    const newWidth = image.width * scale;
    const newHeight = image.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = true; 
    context.imageSmoothingQuality = "high"; 
    context.drawImage(image, offsetX, offsetY, newWidth, newHeight);
    frames.currentIndex = index;
  }
};

const startAnimation = () => {
  var tl = gsap.timeline({
    scrolTrigger : {
        trigger : ".parent", 
        start : "top top",
        scrub : 2
    }
  })

  tl.to(frames, {
    currentIndex : frames.maxIndex, 
    onUpdate : ()=>{
        loadImage(Math.floor(frames.currentIndex))
    }
  })
};

preloadImages();
