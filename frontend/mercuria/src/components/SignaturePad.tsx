"use client";

import { useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const SignaturePadComponent: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const signaturePadRef = useRef<SignaturePad | null>(null);
  const [isEmpty, setIsEmpty] = useState(true);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      canvas.width = parent.clientWidth * ratio;
      canvas.height = parent.clientHeight * ratio;
      canvas.style.width = `${parent.clientWidth}px`;
      canvas.style.height = `${parent.clientHeight}px`;

      const context = canvas.getContext("2d");
      if (context) {
        context.scale(ratio, ratio);
      }

      // If there's an existing signature pad, need to recreate it after resize
      if (signaturePadRef.current) {
        const oldData = signaturePadRef.current.toData();
        signaturePadRef.current = new SignaturePad(canvas, {
          backgroundColor: "rgb(255, 255, 255)",
        });
        signaturePadRef.current.fromData(oldData);
      } else {
        signaturePadRef.current = new SignaturePad(canvas, {
          backgroundColor: "rgb(255, 255, 255)",
        });
      }

      signaturePadRef.current.addEventListener("endStroke", () => {
        setIsEmpty(signaturePadRef.current?.isEmpty() ?? true);
      });
    };

    // Initial setup
    resizeCanvas();

    // Set up ResizeObserver instead of window resize event
    resizeObserverRef.current = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserverRef.current.observe(canvas.parentElement);
    }

    return () => {
      signaturePadRef.current?.off();
      resizeObserverRef.current?.disconnect();
    };
  }, []);

  const handleSave = () => {
    if (signaturePadRef.current) {
      if (signaturePadRef.current.isEmpty()) {
        alert("Please provide a signature before saving!");
        return;
      }
      const dataUrl = signaturePadRef.current.toDataURL();
      console.log("Signature Data URL:", dataUrl);
      // Here you can implement further logic to save or process the signature
    }
  };

  const handleClear = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setIsEmpty(true);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="border border-gray-300 rounded-md w-full max-w-md aspect-[2/1]">
        <canvas ref={canvasRef} className="w-full h-full touch-none" />
      </div>
      <div className="flex space-x-4">
        <Button onClick={handleSave} disabled={isEmpty}>
          Save Signature
        </Button>
        <Button onClick={handleClear} variant="outline">
          Clear
        </Button>
      </div>
    </div>
  );
};

const SignaturePadPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Open Signature Pad</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Signature Pad</DialogTitle>
        </DialogHeader>
        <SignaturePadComponent />
      </DialogContent>
    </Dialog>
  );
};

export default SignaturePadPopup;
