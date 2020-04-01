function photoJoiner() {
  const drawData = [];
  let image;
  let canvasWidth = 0;
  let offsetX = 0;

  this.join = (config) => {
    config = config || {};
    const images = config.images || [];
    const canvasHeight = config.canvasHeight || 390;
    const canvas = config.canvas || document.getElementById('joined');
    const context = canvas.getContext('2d');

    canvas.height = canvasHeight;

    if (images.length > 0) {
      image = new Image();
      image.src = images[0];
      //Wait for image load
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        images.shift();

        const ratio = image.naturalHeight / canvasHeight;
        const imageWidth = image.width / ratio;
        const imageHeight = image.height / ratio;

        drawData.push({
          'image': image,
          'ratio': ratio,
          'scaledWidth': imageWidth,
          'scaledHeight': imageHeight
        });

        canvasWidth += imageWidth;

        this.join(config)
      };
    } else {
      canvas.width = canvasWidth;

      for (let i = 0; i < drawData.length; i++) {
        const current = drawData[i];
        context.drawImage(current.image, 0, 0, current.image.width, current.image.height, offsetX, 0, current.scaledWidth, current.scaledHeight);
        offsetX += current.scaledWidth;
      }
    }
  }
}

export default photoJoiner;
