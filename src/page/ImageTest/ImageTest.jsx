import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Это нужно для работы карусели

function ImageTest() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState([]); // Список изображений

  // Загружаем изображения с бэкенда при первом рендере
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:3009/images");
        setImages(response.data); // Устанавливаем изображения в стейт
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []); // Пустой массив зависимостей - запрос выполняется только один раз при монтировании компонента

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
      setUploadStatus(`File uploaded: ${response.data.filename}`);
      setSelectedFile(null);

      // Добавляем новое изображение в состояние без повторной загрузки всех изображений
      const newImage = {
        filename: response.data.filename,
        base64: response.data.base64, // Предполагаем, что сервер возвращает base64 строку загруженного изображения
      };
      setImages((prevImages) => [...prevImages, newImage]);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Image</h2>
      <input type="file" onChange={handleFileChange} />

      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="btn btn-primary mt-2"
        >
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

      <h2 className="mt-4">Uploaded Images</h2>
      {images.length > 0 ? (
        <div
          id="carouselExample"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={`data:image/webp;base64,${image.base64}`}
                  className="d-block w-100"
                  alt={image.filename}
                />
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      ) : (
        <p>No images uploaded yet</p>
      )}
    </div>
  );
}

export default ImageTest;
