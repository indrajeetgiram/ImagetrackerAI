async function detectImage() {
    const img = document.getElementById('imageUpload').files[0];
    if (!img) {
      alert("Please upload an image or capture one using the camera.");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async function() {
      const image = new Image();
      image.src = reader.result;
      image.onload = async function() {
        // Load the pre-trained MobileNet model
        const model = await mobilenet.load();
  
        // Classify the image
        const predictions = await model.classify(image);
  
        // Display the result with formatted text
        document.getElementById('result').innerHTML = `This image is of <span class="bold-text">${predictions[0].className}</span>.`;
      };
    };
    reader.readAsDataURL(img);
  }
  