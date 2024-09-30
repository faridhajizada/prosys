import React, { useState } from "react";
import axios from "axios";

function ImageTest() {
  const [selectedFile, setSelectedFile] = useState(null); 
  const [uploadStatus, setUploadStatus] = useState(""); 
  const [isUploading, setIsUploading] = useState(false); 


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
    setUploadStatus(""); 
  };


  const handleUpload = async () => {
    if (!selectedFile) return; 

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3009/images/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(`File uploaded: ${response.data.filePath}`); 
      setSelectedFile(null); 
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file"); 
    } finally {
      setIsUploading(false); 
    }
  };

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />{" "}

      {selectedFile && ( 
        <button onClick={handleUpload} disabled={isUploading}>
   
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      )}
      {uploadStatus && <p>{uploadStatus}</p>} 
      {selectedFile && (
        <div>
          <h3>Selected Image:</h3>
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="Selected"
            style={{ width: "300px" }}
          />
        </div>
      )}
    </div>
  );
}

export default ImageTest;
