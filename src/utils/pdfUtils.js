import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = (elementId, filename) => {
    const element = document.getElementById(elementId);
    if (!element) {
        console.error('Element not found:', elementId);
        return;
    }

    html2canvas(element, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        
        // Use A4 landscape dimensions in pixels (at 96 DPI)
        const pdfWidth = 1123; // A4 landscape width
        const pdfHeight = 794;  // A4 landscape height
        
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [pdfWidth, pdfHeight]
        });

        // Calculate scaling to fit content
        const widthRatio = pdfWidth / imgWidth;
        const heightRatio = pdfHeight / imgHeight;
        const ratio = Math.min(widthRatio, heightRatio);
        
        const scaledWidth = imgWidth * ratio;
        const scaledHeight = imgHeight * ratio;
        
        // Center the image
        const xOffset = (pdfWidth - scaledWidth) / 2;
        const yOffset = (pdfHeight - scaledHeight) / 2;

        // If content fits on one page
        if (scaledHeight <= pdfHeight) {
            pdf.addImage(imgData, 'PNG', xOffset, yOffset, scaledWidth, scaledHeight);
        } else {
            // Multi-page support - split image across pages
            const pageHeight = pdfHeight;
            const pageWidth = pdfWidth;
            let heightLeft = scaledHeight;
            let position = 0;
            let pageNum = 1;

            while (heightLeft > 0) {
                if (pageNum > 1) {
                    pdf.addPage();
                }

                // Calculate how much of the image to show on this page
                const sourceY = position;
                const sourceHeight = Math.min(pageHeight, heightLeft);
                
                // Create a temporary canvas for this page slice
                const pageCanvas = document.createElement('canvas');
                pageCanvas.width = imgWidth;
                pageCanvas.height = (sourceHeight / ratio);
                const pageCtx = pageCanvas.getContext('2d');
                
                // Draw the portion of the image for this page
                const sourceYOriginal = (position / ratio);
                const sourceHeightOriginal = sourceHeight / ratio;
                pageCtx.drawImage(
                    canvas, 
                    0, sourceYOriginal, imgWidth, sourceHeightOriginal,
                    0, 0, imgWidth, sourceHeightOriginal
                );
                
                const pageImgData = pageCanvas.toDataURL('image/png');
                
                // Add to PDF
                pdf.addImage(pageImgData, 'PNG', xOffset, 0, scaledWidth, sourceHeight);
                
                heightLeft -= sourceHeight;
                position += sourceHeight;
                pageNum++;
            }
        }

        pdf.save(filename);
    }).catch(error => {
        console.error('Error generating PDF:', error);
    });
};