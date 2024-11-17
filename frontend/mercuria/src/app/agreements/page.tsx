"use client";

// Import necessary libraries and components
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, FileCheck, AlertTriangle } from "lucide-react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

// Main component for the Project Agreement Page
export default function ProjectAgreementPage() {
  const { isSignedIn, user } = useUser(); // Access user information
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    contractYears: "",
  });
  const [identificationDocument, setIdentificationDocument] =
    useState<File | null>(null);
  const [landDocument, setLandDocument] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [handleClick, setHandleClick] = useState(true);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input for document uploads
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!identificationDocument || !landDocument) {
      alert("Please upload both identification and land documents.");
      return;
    }

    // Here you would typically upload the files and form data to your server
    // For this example, we'll simulate an upload with a timeout
    setHandleClick(false);
    setUploadStatus("idle");
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulating upload time
      // Prepare form data for submission
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("contractYears", formData.contractYears);
      formDataToSend.append("identificationDocument", identificationDocument);
      formDataToSend.append("landDocument", landDocument);

      try {
        setUploadStatus("idle");
        const response = await axios.post(
          "http://localhost:5000/api/agreement",
          formDataToSend
        );

        console.log(response.data); // Add this line to check the response
        if (!response) throw new Error("Error submitting form");

        setUploadStatus("success");
        router.push("/capture");
      } catch (error) {
        console.error("Error:", error); // Add this line to check the error
        setUploadStatus("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>
              Please sign in to access this page.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => router.push("/")}>
              Go to Home
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Project Agreement Upload</h1>
      <Card>
        <CardHeader>
          <CardTitle>Upload Details for Project Agreement</CardTitle>
          <CardDescription>
            Please fill in your details and upload the required documents.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Field */}
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Phone Number Field */}
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Address Field */}
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Contract Duration Field */}
            <div className="space-y-2">
              <Label htmlFor="contractYears">Contract Duration (Years)</Label>
              <Select
                name="contractYears"
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, contractYears: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select contract duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 years</SelectItem>
                  <SelectItem value="10">10 years</SelectItem>
                  <SelectItem value="15">15 years</SelectItem>
                  <SelectItem value="20">20 years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Identification Document Upload */}
            <div className="space-y-2">
              <Label htmlFor="identificationDocument">
                Identification Document
              </Label>
              <Input
                id="identificationDocument"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileChange(e, setIdentificationDocument)}
                required
              />
              {identificationDocument && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <FileCheck className="w-4 h-4 mr-1" />
                  {identificationDocument.name}
                </p>
              )}
            </div>
            {/* Land Document Upload */}
            <div className="space-y-2">
              <Label htmlFor="landDocument">Land Document</Label>
              <Input
                id="landDocument"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange(e, setLandDocument)}
                required
              />
              {landDocument && (
                <p className="text-sm text-green-600 mt-1 flex items-center">
                  <FileCheck className="w-4 h-4 mr-1" />
                  {landDocument.name}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              <Upload className="w-4 h-4 mr-2" />
              Submit Agreement
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Success Alert */}
      {uploadStatus === "success" && (
        <Alert className="mt-4 bg-green-100 border-green-500">
          <FileCheck className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your project agreement has been successfully submitted.
          </AlertDescription>
        </Alert>
      )}
      {/* Error Alert */}
      {uploadStatus === "error" && (
        <Alert className="mt-4 bg-red-100 border-red-500">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            There was an error submitting your agreement. Please try again.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
