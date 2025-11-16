import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = (elementId, filename) => {
    const element = document.getElementById(elementId);

    html2canvas(element, {
        scale: 2,
        logging: false,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(filename);
    });
};