import React, { useState } from 'react';

const MyComponent = () => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleImageChange = (event) => {
    // Assuming you want to handle only one image
    setImage(event.target.files[0]);
  };

  return (
    <div>
    <div className='encrpyt'>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Enter your text here..."
        rows={5}
        cols={50}
      />
      <br />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
      <br />
      {/* Add any other button or functionality related to image upload */}
    </div>
    <div className='decrpyt'>
        <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
    </div>
    </div>
  );
};

export default MyComponent;
