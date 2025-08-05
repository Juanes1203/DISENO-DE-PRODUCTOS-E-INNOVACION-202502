const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf(htmlFile, outputPdf) {
    const browser = await puppeteer.launch({
        headless: "new" // Use new headless mode to avoid deprecation warnings
    });
    const page = await browser.newPage();
    
    // Set viewport for better rendering
    await page.setViewport({
        width: 1200,
        height: 800
    });
    
    // Load the HTML file
    const filePath = `file://${path.resolve(htmlFile)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Inject CSS to improve PDF layout
    await page.addStyleTag({
        content: `
            @media print {
                body {
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: none !important;
                    margin: 0 !important;
                    padding: 0 !important;
                }
                .team-member, .info-item, .objective-item {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                .header, .team-section, .course-info, .navigation, .footer {
                    page-break-inside: avoid;
                    break-inside: avoid;
                }
                .team-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) !important;
                    gap: 20px !important;
                }
                .info-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
                    gap: 15px !important;
                }
                .objectives-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
                    gap: 10px !important;
                }
            }
        `
    });
    
    // Wait a bit more for any dynamic content to load
    await page.waitForTimeout(2000);
    
    // Generate PDF with better settings
    await page.pdf({
        path: outputPdf,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: '15mm',
            right: '15mm',
            bottom: '15mm',
            left: '15mm'
        },
        displayHeaderFooter: false,
        scale: 0.8 // Slightly reduce scale to fit content better
    });
    
    await browser.close();
    console.log(`✅ Converted ${htmlFile} to ${outputPdf}`);
}

async function convertAllFiles() {
    const files = [
        { html: 'index.html', pdf: 'ISIS2007-Pagina-Principal.pdf' },
        { html: 'team.html', pdf: 'ISIS2007-Equipo-Docente.pdf' },
        { html: 'schedule.html', pdf: 'ISIS2007-Cronograma.pdf' }
    ];
    
    for (const file of files) {
        try {
            await convertHtmlToPdf(file.html, file.pdf);
        } catch (error) {
            console.error(`❌ Error converting ${file.html}:`, error.message);
        }
    }
    
    console.log('\n🎉 All conversions completed!');
}

// Check if Puppeteer is installed
try {
    require('puppeteer');
    convertAllFiles();
} catch (error) {
    console.log('📦 Installing Puppeteer...');
    const { execSync } = require('child_process');
    try {
        execSync('npm install puppeteer', { stdio: 'inherit' });
        console.log('✅ Puppeteer installed successfully!');
        convertAllFiles();
    } catch (installError) {
        console.error('❌ Failed to install Puppeteer:', installError.message);
        console.log('\n💡 Alternative: Open each HTML file in your browser and use Cmd+P (Mac) or Ctrl+P (Windows) to save as PDF');
    }
} 