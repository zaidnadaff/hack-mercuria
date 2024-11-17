"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page } from "react-pdf";

import SignaturePadPopup from "@/components/SignaturePad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Download, Printer } from "lucide-react";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function useResizeObserver(callback: (entry: ResizeObserverEntry) => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      callback(entries[0]);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return ref;
}

const EnhancedAgreementsPage = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  // PDF viewer container ref
  const containerRef = useResizeObserver((entry) => {
    const { width } = entry.contentRect;
    setPageWidth(width);
  });

  const { toast } = useToast();

  // Use resize observer to adjust PDF width

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setReadProgress((prev) => Math.min(prev + 1, 100));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!fullName || !email || !isAgreed || !signatureDataUrl) {
      toast({
        title: "Error",
        description:
          "Please fill in all fields, agree to the terms, and sign the agreement.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the data to your server
    console.log("Submitting agreement:", {
      fullName,
      email,
      isAgreed,
      signatureDataUrl,
    });
    toast({
      title: "Success",
      description: "Your signed agreement has been submitted successfully!",
    });
  };

  const handleDownload = () => {
    // This is a placeholder. In a real application, you'd generate a PDF with the filled information.
    toast({
      title: "Download started",
      description: "Your agreement is being downloaded.",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        Agreement Review and Signature
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Agreement Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div ref={containerRef} className="mb-6">
              <ScrollArea className="h-[600px] w-full border rounded">
                <Document
                  file="https://pdfobject.com/pdf/sample.pdf"
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex flex-col items-center"
                >
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </ScrollArea>
            </div>
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <span>
                Page {pageNumber} of {numPages}
              </span>
              <Button
                onClick={() =>
                  setPageNumber((prev) => Math.min(prev + 1, numPages || 1))
                }
                disabled={pageNumber >= (numPages || 1)}
              >
                Next <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Sign Agreement</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={isAgreed}
                  onCheckedChange={(checked) => setIsAgreed(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the terms and conditions
                </label>
              </div>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Sign Agreement</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Signature Pad</DialogTitle>
                  </DialogHeader>
                  <SignaturePadPopup />
                </DialogContent>
              </Dialog>
              {signatureDataUrl && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-2">Your signature:</p>
                  <img
                    src={signatureDataUrl}
                    alt="Your signature"
                    className="h-20 border border-gray-300 rounded"
                  />
                </div>
              )}
              <Button onClick={handleSubmit} className="w-full">
                Submit Signed Agreement
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Agreement Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Reading Progress</p>
              <Progress value={readProgress} className="w-[60%]" />
            </div>
            <div className="space-x-2">
              <Button onClick={handleDownload} variant="outline">
                <Download className="mr-2 h-4 w-4" /> Download
              </Button>
              <Button onClick={handlePrint} variant="outline">
                <Printer className="mr-2 h-4 w-4" /> Print
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAgreementsPage;
