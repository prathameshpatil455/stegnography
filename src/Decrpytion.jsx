import { useState } from "react";
// import "./Decryption.css"; // Assuming the CSS file name

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
      let terminationReached = false;
      let consecutiveNulls = 0;

      for (let i = 0; i < data.length; i += 4) {
        let byte = "";
        for (let j = 0; j < 3; j++) {
          byte += (data[i + j] & 1);
        }

        if (byte === "00000000") {
          consecutiveNulls++;
          if (consecutiveNulls >= 8) {
            terminationReached = true;
            break;
          }
        } else {
          consecutiveNulls = 0;
        }

        binaryText += byte;
      }
      // Convert binary text to characters
      let decryptedMessage = "";
      for (let i = 0; i < binaryText.length; i += 8) {
        let byte = binaryText.substr(i, 8);
        let charCode = parseInt(byte, 2);
        decryptedMessage += String.fromCharCode(charCode);
      }

      // Update the decrypted text state
      setDecryptedText(decryptedMessage);
    };
    img.src = selectedImage;
};



  return (
    <div className="main-container">
      <div className="left-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {/* Display the uploaded image */}
        {selectedImage && (
          <div className="image-preview">
            <img src={selectedImage} alt="selected" />
          </div>
        )}
        {/* Decrypt button */}
        <button onClick={handleDecrypt} disabled={!selectedImage}>Decrypt</button>
      </div>
      <div className="right-container">
        <p>The Secret Message:</p>
        <p>{decryptedText}</p>
      </div>
    </div>
  );
};

export default Decryption;
