import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportToPDF = (elementId, filename, options = {}) => {
    const wrapper = document.getElementById(elementId);
    if (!wrapper) return;

    const source = wrapper.querySelector('.timetable-grid') || wrapper.querySelector('.timetable') || wrapper;
    const clone = source.cloneNode(true);
    const exportWidth = options.widthPx || 1500;
    const padding = options.paddingPx || 40;
    clone.style.width = `${exportWidth}px`;
    clone.style.maxWidth = 'none';
    clone.style.transform = 'none';
    clone.style.position = 'static';
    clone.style.padding = '0';
    clone.style.margin = '0';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.classList.add('export-fixed');

    const stage = document.createElement('div');
    stage.style.width = `${exportWidth + padding * 2}px`;
    stage.style.background = '#ffffff';
    stage.style.padding = `${padding}px`;
    stage.style.boxSizing = 'border-box';
    stage.style.position = 'fixed';
    stage.style.left = '-9999px';
    stage.style.top = '0';
    stage.style.zIndex = '-1';
    stage.style.textAlign = 'center';

    const title = options.title || '';
    const subtitle = options.subtitle || '';
    if (title) {
        const h = document.createElement('div');
        h.style.fontSize = '28px';
        h.style.fontWeight = '800';
        h.style.color = '#1e293b';
        h.style.marginBottom = '10px';
        h.textContent = title;
        stage.appendChild(h);
    }
    if (subtitle) {
        const s = document.createElement('div');
        s.style.fontSize = '14px';
        s.style.fontWeight = '700';
        s.style.color = '#64748b';
        s.style.marginBottom = '18px';
        s.textContent = subtitle;
        stage.appendChild(s);
    }

    stage.appendChild(clone);
    document.body.appendChild(stage);

    const opts = {
        scale: 3,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1920,
        windowHeight: 1080,
        scrollX: 0,
        scrollY: 0,
        ignoreElements: (el) => {
            const cls = el.classList;
            return !!(cls && (cls.contains('no-print') || cls.contains('no-export')));
        }
    };

    html2canvas(stage, opts).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save(filename);
    }).finally(() => {
        document.body.removeChild(stage);
    });
};