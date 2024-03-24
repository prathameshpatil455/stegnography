import { useState } from "react";
import "./Encrpytion.css";

const Encrpytion = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [encryptedImage, setEncryptedImage] = useState(null);
  const [isDownloadButtonDisabled, setIsDownloadButtonDisabled] = useState(true);

  const handleTextChange = (event) => {
    setText(event.target.value);
    checkButtonDisabled();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }

    checkButtonDisabled();
  };

  const checkButtonDisabled = () => {
    setIsButtonDisabled(!selectedImage || !text.trim());
  };

  const handleEncrypt = () => {
    // Convert the text to binary
    const textBinary = text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join('');

    // Embed the binary text into the image using LSB steganography
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      let textIndex = 0;
      for (let i = 0; i < data.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          if (textIndex < textBinary.length) {
            data[i + j] = (data[i + j] & 0xFE) | parseInt(textBinary[textIndex++], 2);
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Convert the canvas to base64 image data URL
      const encryptedImage = canvas.toDataURL('image/png');

      // Display the encrypted image
      setEncryptedImage(encryptedImage);
      setIsDownloadButtonDisabled(false);
    };
    img.src = selectedImage;
  };


  const handleDownload = () => {
    // Create a link element and trigger the download of the encrypted image
    const downloadLink = document.createElement('a');
    downloadLink.href = encryptedImage;
    downloadLink.download = 'encrypted_image.png';
    downloadLink.click();
  };




  return (
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
            <p>Select the Image to be Embedded with:</p>
          <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <p>Enter the text to be encrpyted</p>
      <textarea  rows={5} value={text} onChange={handleTextChange} />
      <button onClick={handleEncrypt} disabled={isButtonDisabled}>Encrpyt</button>
          </div>  
        </div>
      </div>


      <div className="right-container">
        <div className="enc-image-container">
        {encryptedImage && (
          <div className="image-preview">
            <img src={encryptedImage} alt="encrypted" />
          </div>
        )}
        </div>
        <div className="btn">
        <button onClick={handleDownload} disabled={isDownloadButtonDisabled}>Downlaod</button>
        </div>
      </div>
    </div>
  )
}

export default Encrpytion
