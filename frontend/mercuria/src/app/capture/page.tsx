import { useRef, useState } from "react";
import axios from "axios";
import { Button } from "@shadcn/ui"; // Shadcn button component

const Home = () => {
  const [imageResponse, setImageResponse] = useState<string>("");
  const [capturing, setCapturing] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Start the camera when the button is clicked
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCapturing(true);
      }
    } catch (error) {
      console.error("Error accessing the camera:", error);
    }
  };

  // Capture the image from the video stream
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        setImage(canvasRef.current.toDataURL("image/jpeg"));
        setCapturing(false);
      }
    }
  };

  // Send the captured image to the backend API
  const handleImageUpload = async () => {
    if (!image) return alert("No image captured!");

    try {
      const formData = new FormData();
      const blob = await fetch(image).then((res) => res.blob());
      formData.append("image", blob, "captured-image.jpg");

      const res = await axios.post("http://localhost:5000/capture", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImageResponse(res.data.response);
    } catch (error) {
      console.error("Error uploading image:", error);
      setImageResponse("An error occurred while processing the image.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Direct Camera Capture</h1>
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          {!capturing ? (
            <Button onClick={startCamera} className="w-full">
              Start Camera
            </Button>
          ) : (
            <div>
              <video ref={videoRef} autoPlay className="w-full mb-4" />
              <canvas ref={canvasRef} width={640} height={480} className="hidden" />
              <Button onClick={captureImage} className="w-full mb-4">
                Capture Image
              </Button>
            </div>
          )}
        </div>

        {image && (
          <div className="mb-4">
            <img src={image} alt="Captured" className="w-full h-auto rounded-lg" />
            <Button onClick={handleImageUpload} className="w-full mt-4">
              Upload & Analyze
            </Button>
          </div>
        )}

        {imageResponse && <p className="mt-4 font-semibold">Response: {imageResponse}</p>}
      </div>
    </div>
  );
};

export default Home;
