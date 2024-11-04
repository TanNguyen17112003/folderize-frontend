import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';
import pptx2json from 'pptx2json';
import { arrayBuffer } from 'stream/consumers';

interface PowerPointViewerProps {
  documentUrl: string;
}

const PowerPointViewer: React.FC<PowerPointViewerProps> = ({ documentUrl }) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchPowerPointData = async () => {
      try {
        const response = await fetch(documentUrl);
        const arrayBuffer = await response.arrayBuffer();
        const zip = await JSZip.loadAsync(arrayBuffer);
        const pptx = await pptx2json(zip);
        setSlides(pptx.slides);
        setSlides(pptx.slides);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPowerPointData();
  }, [documentUrl]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div>
      {slides.length > 0 ? (
        <div>
          <div>
            <button onClick={prevSlide} disabled={currentSlide === 0}>
              Previous
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
              Next
            </button>
          </div>
          <div>
            <img src={slides[currentSlide].data} alt={`Slide ${currentSlide + 1}`} />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PowerPointViewer;
