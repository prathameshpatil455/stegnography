import { useState } from "react";
import "./Decrpytion.css"; 

const Decryption = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [decryptedText, setDecryptedText] = useState("");

  // Function to handle changes in the image input
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to decrypt the image
  const handleDecrypt = () => {
    if (!selectedImage) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // Required for accessing image data
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let binaryText = "";
      let byte = "";

      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          byte += (data[i + j] & 1); // Extract LSB of each color channel

          if (byte.length === 8) { // Convert 8 bits to a character
            if (byte === '00000000') { // Stop if null terminator is encountered
              setDecryptedText(binaryText);
              return;
            }
            binaryText += String.fromCharCode(parseInt(byte, 2));
            byte = "";
          }
        }
      }
  
      console.log("working");
      // Update the decrypted text state
      setDecryptedText(binaryText);
    };
    img.src = selectedImage;
  };


  return (
    <>
    <div className="main-container">
      <div className="left-container">
        <div className="input-container">
          <div className="image-container">
          {
          selectedImage && (
            <div className="image-preview"> 
              <img src={selectedImage} alt="selected" />
            </div>
          )
        }
          </div>
          <div className="inputs">
            <p>Select the Image from which the data to be extracted:</p>
          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <button onClick={handleDecrypt} disabled={!selectedImage}>Decrypt</button>
          </div>  
        </div>
      </div>


      <div className="output-message">
        <p>The Secret Message:</p>
        <p>{decryptedText}</p>
      </div>
    </div>
    </>
  );
};

export default Decryption;
