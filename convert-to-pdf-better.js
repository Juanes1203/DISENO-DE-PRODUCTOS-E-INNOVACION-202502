const puppeteer = require('puppeteer');
const path = require('path');

async function convertHtmlToPdf(htmlFile, outputPdf) {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Set a larger viewport for better rendering
    await page.setViewport({
        width: 1920,
        height: 1080
    });
    
    // Load the HTML file
    const filePath = `file://${path.resolve(htmlFile)}`;
    await page.goto(filePath, { waitUntil: 'networkidle0' });
    
    // Inject comprehensive CSS for better PDF layout
    await page.addStyleTag({
        content: `
            @media print {
                * {
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    font-size: 12pt !important;
                    line-height: 1.4 !important;
                }
                
                .container {
                    max-width: none !important;
                    margin: 0 !important;
                    padding: 20px !important;
                }
                
                .header {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    margin-bottom: 20px !important;
                }
                
                .team-member {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    margin-bottom: 15px !important;
                }
                
                .info-item, .objective-item {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    margin-bottom: 10px !important;
                }
                
                .team-section, .course-info, .navigation, .footer {
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                    margin-bottom: 20px !important;
                }
                
                .team-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
                    gap: 15px !important;
                }
                
                .info-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
                    gap: 12px !important;
                }
                
                .objectives-grid {
                    display: grid !important;
                    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
                    gap: 8px !important;
                }
                
                .nav-buttons {
                    display: flex !important;
                    justify-content: center !important;
                    gap: 15px !important;
                    flex-wrap: wrap !important;
                }
                
                .nav-button {
                    display: inline-block !important;
                    padding: 10px 20px !important;
                    margin: 5px !important;
                }
                
                /* Ensure images don't break across pages */
                img {
                    max-width: 100% !important;
                    height: auto !important;
                    page-break-inside: avoid !important;
                    break-inside: avoid !important;
                }
                
                /* Better text handling */
                h1, h2, h3, h4 {
                    page-break-after: avoid !important;
                    break-after: avoid !important;
                }
                
                p {
                    orphans: 3 !important;
                    widows: 3 !important;
                }
            }
        `
    });
    
    // Wait for content to fully load
    await page.waitForTimeout(3000);
    
    // Generate PDF with optimized settings
    await page.pdf({
        path: outputPdf,
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: false,
        margin: {
            top: '20mm',
            right: '20mm',
            bottom: '20mm',
            left: '20mm'
        },
        displayHeaderFooter: false,
        scale: 0.9
    });
    
    await browser.close();
    console.log(`✅ Converted ${htmlFile} to ${outputPdf}`);
}

async function convertAllFiles() {
    const files = [
        { html: 'index.html', pdf: 'ISIS2007-Pagina-Principal-v2.pdf' },
        { html: 'team.html', pdf: 'ISIS2007-Equipo-Docente-v2.pdf' },
        { html: 'schedule.html', pdf: 'ISIS2007-Cronograma-v2.pdf' }
    ];
    
    for (const file of files) {
        try {
            await convertHtmlToPdf(file.html, file.pdf);
        } catch (error) {
            console.error(`❌ Error converting ${file.html}:`, error.message);
        }
    }
    
    console.log('\n🎉 All conversions completed with improved layout!');
}

convertAllFiles(); 