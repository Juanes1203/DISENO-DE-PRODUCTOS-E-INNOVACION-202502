const puppeteer = require('puppeteer');
const path = require('path');

async function generatePDF() {
    console.log('🚀 Iniciando generación del PDF...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--disable-gpu'
        ]
    });
    
    try {
        console.log('📄 Abriendo página...');
        const page = await browser.newPage();
        
        // Set viewport
        await page.setViewport({
            width: 1200,
            height: 800
        });
        
        // Load the HTML file
        const filePath = path.resolve('documento-completo.html');
        console.log('📂 Cargando archivo:', filePath);
        
        await page.goto(`file://${filePath}`, {
            waitUntil: 'networkidle0',
            timeout: 30000
        });
        
        console.log('⏳ Esperando que se carguen las imágenes...');
        await page.waitForTimeout(5000);
        
        console.log('🎨 Generando PDF...');
        await page.pdf({
            path: 'ISIS2007-Documento-Completo.pdf',
            format: 'A4',
            printBackground: true,
            preferCSSPageSize: false,
            margin: {
                top: '15mm',
                right: '15mm',
                bottom: '15mm',
                left: '15mm'
            },
            displayHeaderFooter: false,
            scale: 0.85
        });
        
        console.log('✅ PDF generado exitosamente: ISIS2007-Documento-Completo.pdf');
        
    } catch (error) {
        console.error('❌ Error generando PDF:', error.message);
    } finally {
        await browser.close();
        console.log('🔒 Navegador cerrado');
    }
}

generatePDF(); 