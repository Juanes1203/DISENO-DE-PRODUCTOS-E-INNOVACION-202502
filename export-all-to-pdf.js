const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generateCompletePDF() {
    console.log('🚀 Starting PDF generation for all ISIS2007 content...');
    
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport for better rendering
    await page.setViewport({ width: 1200, height: 800 });
    
    // Create the complete HTML content with optimized layout
    const completeHTML = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ISIS2007 - Documento Completo</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: white;
            margin: 0;
            padding: 0;
        }

        .page {
            background: white;
            padding: 25px;
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .page-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            padding: 15px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
        }

        .header h1 {
            font-size: 2.2rem;
            margin-bottom: 8px;
            font-weight: 700;
        }

        .header h2 {
            font-size: 1.1rem;
            font-weight: 400;
            opacity: 0.9;
        }

        .section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .section h3 {
            color: #2c3e50;
            font-size: 1.6rem;
            margin-bottom: 15px;
            text-align: center;
        }

        .team-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }

        .team-member {
            background: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            border: 1px solid #e9ecef;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .member-photo {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 15px;
            object-fit: cover;
            border: 3px solid #667eea;
        }

        .member-name {
            color: #2c3e50;
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .role-badge {
            background: #667eea;
            color: white;
            padding: 6px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
            display: inline-block;
            margin-bottom: 10px;
        }

        .member-email {
            color: #7f8c8d;
            font-size: 0.9rem;
            margin-bottom: 10px;
        }

        .linkedin-link {
            display: inline-flex;
            align-items: center;
            background: #0077b5;
            color: white;
            padding: 8px 16px;
            border-radius: 15px;
            text-decoration: none;
            font-size: 0.8rem;
            font-weight: 500;
            margin-top: 8px;
        }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .info-item {
            background: white;
            padding: 12px;
            border-radius: 8px;
            border-left: 3px solid #667eea;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .info-item h4 {
            color: #2c3e50;
            margin-bottom: 6px;
            font-size: 1rem;
        }

        .info-item p {
            color: #555;
            font-size: 0.85rem;
        }

        .objectives-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 10px;
            margin-top: 12px;
        }

        .objective-item {
            background: white;
            padding: 10px;
            border-radius: 6px;
            border-left: 3px solid #667eea;
            display: flex;
            align-items: flex-start;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .objective-number {
            background: #667eea;
            color: white;
            padding: 3px 6px;
            border-radius: 50%;
            font-size: 0.8rem;
            font-weight: bold;
            margin-right: 6px;
            flex-shrink: 0;
        }

        .objective-item p {
            color: #333;
            font-size: 0.85rem;
            margin-bottom: 0;
        }

        .footer {
            text-align: center;
            background: #f8f9fa;
            padding: 12px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
            margin-top: 15px;
        }

        .footer p {
            color: #7f8c8d;
            margin-bottom: 3px;
            font-size: 0.8rem;
        }

        .page-break {
            page-break-before: always;
            break-before: page;
        }

        .schedule-table {
            overflow-x: auto;
            margin-top: 15px;
        }

        .schedule-table table {
            width: 100%;
            border-collapse: collapse;
            background: white;
            font-size: 0.75rem;
            border: 1px solid #dee2e6;
        }

        .schedule-table th {
            background: #f8f9fa;
            padding: 8px;
            text-align: left;
            border: 1px solid #dee2e6;
            color: #2c3e50;
            font-weight: 600;
        }

        .schedule-table td {
            padding: 8px;
            border: 1px solid #dee2e6;
        }

        .week-number {
            background: #667eea;
            color: white;
            font-weight: bold;
            padding: 3px 6px;
            border-radius: 3px;
        }

        .recess-week {
            background: #fff3cd;
        }

        .recess-week .week-number {
            background: #ffc107;
            color: #333;
        }

        .welcome-message {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            text-align: center;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .welcome-message h3 {
            color: #2c3e50;
            font-size: 1.6rem;
            margin-bottom: 15px;
        }

        .welcome-message p {
            color: #555;
            font-size: 1rem;
            line-height: 1.6;
            margin-bottom: 15px;
        }

        .course-info {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .course-info h3 {
            color: #2c3e50;
            font-size: 1.6rem;
            margin-bottom: 15px;
            text-align: center;
        }

        .evaluation-section {
            background: white;
            padding: 20px;
            border-radius: 12px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .evaluation-section h3 {
            color: #2c3e50;
            margin-bottom: 12px;
            font-size: 1.3rem;
        }

        .evaluation-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .evaluation-item {
            background: #f8f9fa;
            padding: 12px;
            border-radius: 6px;
            border-left: 3px solid #667eea;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .evaluation-item h4 {
            color: #2c3e50;
            margin-bottom: 6px;
        }

        .semester-info {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            border: 1px solid #e9ecef;
            page-break-inside: avoid;
            break-inside: avoid;
        }

        .semester-info h3 {
            color: #2c3e50;
            margin-bottom: 10px;
            font-size: 1.3rem;
        }

        .semester-info p {
            color: #555;
            margin-bottom: 6px;
        }

        /* Optimized print styles */
        @media print {
            * {
                -webkit-print-color-adjust: exact !important;
                color-adjust: exact !important;
                print-color-adjust: exact !important;
            }
            
            body {
                background: white !important;
                margin: 0 !important;
                padding: 0 !important;
            }
            
            .page {
                background: white !important;
                margin: 0 !important;
                padding: 15px !important;
                page-break-after: always;
                break-after: page;
                min-height: 100vh !important;
            }
            
            .page:last-child {
                page-break-after: avoid;
                break-after: avoid;
            }

            .section, .welcome-message, .course-info, .evaluation-section, .semester-info {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
                margin-bottom: 12px !important;
            }

            .team-member, .info-item, .objective-item, .evaluation-item {
                page-break-inside: avoid !important;
                break-inside: avoid !important;
            }

            .header {
                margin-bottom: 15px !important;
                padding: 12px !important;
            }

            .header h1 {
                font-size: 2rem !important;
            }

            .header h2 {
                font-size: 1rem !important;
            }

            .section h3, .welcome-message h3, .course-info h3 {
                font-size: 1.4rem !important;
                margin-bottom: 12px !important;
            }

            .member-photo {
                width: 100px !important;
                height: 100px !important;
            }

            .member-name {
                font-size: 1.1rem !important;
            }

            .schedule-table {
                font-size: 0.7rem !important;
            }

            .schedule-table th, .schedule-table td {
                padding: 6px !important;
            }
        }
    </style>
</head>
<body>
    <!-- Página Principal -->
    <div class="page">
        <div class="page-content">
            <div class="header">
                <h1>🚀 ISIS2007</h1>
                <h2>Diseño de Productos e Innovación en Tecnologías de Información</h2>
                <p>Semestre 2025-2 - Universidad de los Andes</p>
            </div>

            <div class="welcome-message">
                <h3>🎯 ¿Qué aprenderás en este curso?</h3>
                <p>
                    Este curso se encuentra situado en la línea de formación en proyectos e innovación en el programa de Ingeniería en la Universidad de los Andes. 
                    Después de la experiencia en primer semestre para el desarrollo de proyectos con ExpoAndes, durante un semestre los estudiantes van a trabajar 
                    en la definición y desarrollo de proyectos de innovación con tecnología informática. Estos proyectos tienen la ambición de ser sostenibles 
                    en el tiempo y competitivos a nivel internacional.
                </p>
                <p>
                    <strong>Nos orientamos mucho en aplicar la metodología Lean Startup</strong>, que nos permite desarrollar productos de manera iterativa y 
                    basada en evidencia, validando hipótesis con usuarios reales desde las primeras etapas del desarrollo. Esta metodología nos ayuda a 
                    minimizar el riesgo y maximizar las posibilidades de éxito de nuestros proyectos.
                </p>
                <p>
                    <strong>Los proyectos tienen que usar Generative AI sí o sí</strong>, ya que consideramos que la inteligencia artificial generativa es 
                    una herramienta fundamental para la innovación en la actualidad. Los estudiantes aprenderán a integrar estas tecnologías de manera 
                    ética y efectiva en sus proyectos, explorando nuevas posibilidades de creación de valor.
                </p>
            </div>

            <div class="section">
                <h3>🎯 Objetivos del Curso</h3>
                <div class="objectives-grid">
                    <div class="objective-item">
                        <span class="objective-number">1</span>
                        <p>Desarrollar capacidades en la conformación y organización de equipos de trabajo</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">2</span>
                        <p>Desarrollar competencias en el desarrollo de proyectos de innovación</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">3</span>
                        <p>Desarrollar competencias de comunicación oral y escrita alrededor del desarrollo de proyectos</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">4</span>
                        <p>Reforzar los procesos de aprendizaje autónomo</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">5</span>
                        <p>Buscar una exposición nacional e internacional de los resultados</p>
                    </div>
                </div>
                <p style="text-align: center; margin-top: 15px; font-style: italic; color: #667eea;">
                    <strong>🤖 Con un enfoque innovador apoyado de la inteligencia artificial</strong>
                </p>
            </div>

            <div class="section">
                <h3>📚 Información del Curso</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>📅 Horario</h4>
                        <p>Miércoles - 15 semanas</p>
                        <p>Inicio: 6 de agosto de 2025</p>
                    </div>
                    <div class="info-item">
                        <h4>🎓 Créditos</h4>
                        <p>3 créditos</p>
                        <p>Modalidad: Presencial</p>
                    </div>
                    <div class="info-item">
                        <h4>👥 Sección</h4>
                        <p>Sección 2</p>
                        <p>Departamento de Ingeniería de Sistemas</p>
                    </div>
                    <div class="info-item">
                        <h4>📊 Evaluación</h4>
                        <p>Proyectos: 60%</p>
                        <p>Actividades: 40%</p>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p><strong>Universidad de los Andes</strong></p>
                <p>Departamento de Ingeniería de Sistemas y Computación</p>
                <p>Semestre 2025-2</p>
            </div>
        </div>
    </div>

    <!-- Página del Equipo -->
    <div class="page page-break">
        <div class="page-content">
            <div class="header">
                <h1>👥 Equipo Docente</h1>
                <h2>ISIS2007 - Diseño de Productos e Innovación en TI</h2>
            </div>

            <div class="section">
                <h3>🎓 Nuestro Equipo</h3>
                <div class="team-grid">
                    <div class="team-member">
                        <img src="data:image/jpeg;base64,${fs.readFileSync('FotoArturo.jpeg').toString('base64')}" alt="Arturo Henao Chaparro" class="member-photo">
                        <div class="member-name">Arturo Henao Chaparro</div>
                        <div class="role-badge">Profesor Principal</div>
                        <div class="member-email">📧 a.henao59@uniandes.edu.co</div>
                        <a href="https://www.linkedin.com/in/arturohenaochaparro/" target="_blank" class="linkedin-link">
                            <span>🔗</span> LinkedIn
                        </a>
                    </div>

                    <div class="team-member">
                        <img src="data:image/jpeg;base64,${fs.readFileSync('FotoJuanes.jpeg').toString('base64')}" alt="Juan Esteban Jiménez Benavides" class="member-photo">
                        <div class="member-name">Juan Esteban Jiménez Benavides</div>
                        <div class="role-badge">Monitor</div>
                        <div class="member-email">📧 j.jimenezb@uniandes.edu.co</div>
                        <a href="https://www.linkedin.com/in/juan-esteban-jimenez-benavides-526b29191" target="_blank" class="linkedin-link">
                            <span>🔗</span> LinkedIn
                        </a>
                    </div>

                    <div class="team-member">
                        <img src="data:image/jpeg;base64,${fs.readFileSync('FotoCatalina.jpeg').toString('base64')}" alt="Catalina Álvarez Latorre" class="member-photo">
                        <div class="member-name">Catalina Álvarez Latorre</div>
                        <div class="role-badge">Monitor</div>
                        <div class="member-email">📧 c.alvarezl2@uniandes.edu.co</div>
                        <a href="https://www.linkedin.com/in/catalina-alvarez-bb06a0350/" target="_blank" class="linkedin-link">
                            <span>🔗</span> LinkedIn
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer">
                <p><strong>Universidad de los Andes</strong></p>
                <p>Departamento de Ingeniería de Sistemas y Computación</p>
                <p>Semestre 2025-2</p>
            </div>
        </div>
    </div>

    <!-- Página del Cronograma -->
    <div class="page page-break">
        <div class="page-content">
            <div class="header">
                <h1>📅 Cronograma del Curso</h1>
                <h2>ISIS2007 - Diseño de Productos e Innovación en TI</h2>
            </div>

            <div class="section">
                <h3>📅 Información del Semestre</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>📚 Materia</h4>
                        <p>ISIS2007 - Diseño de Productos e Innovación en TI</p>
                    </div>
                    <div class="info-item">
                        <h4>👥 Sección</h4>
                        <p>Sección 2</p>
                    </div>
                    <div class="info-item">
                        <h4>⏰ Horario</h4>
                        <p>Miércoles</p>
                    </div>
                    <div class="info-item">
                        <h4>📅 Inicio</h4>
                        <p>6 de agosto de 2025</p>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3>📊 Sistema de Evaluación</h3>
                <div class="objectives-grid">
                    <div class="objective-item">
                        <span class="objective-number">30%</span>
                        <p><strong>Primera Entrega del Proyecto + Calificación Jurados</strong><br>
                        Primera entrega completa del proyecto con evaluación de jurados</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">30%</span>
                        <p><strong>Segunda Entrega del Proyecto + Calificación Jurados</strong><br>
                        Entrega final del proyecto con evaluación de jurados</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">10%</span>
                        <p><strong>Presentación de Pitch de Problema a Solucionar</strong><br>
                        Presentación del pitch del problema a solucionar</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">10%</span>
                        <p><strong>Lean Canvas - Análisis de Ejemplos</strong><br>
                        Análisis de ejemplos en empresas de tecnología, Running Lean Part 1</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">10%</span>
                        <p><strong>Trabajo Grupal en Proyectos</strong><br>
                        Trabajo grupal en proyectos y entrega landing page</p>
                    </div>
                    <div class="objective-item">
                        <span class="objective-number">10%</span>
                        <p><strong>Semana de Innovación</strong><br>
                        Actividades especiales durante la semana de innovación</p>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3>📋 Cronograma Detallado</h3>
                <div style="background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 6px; padding: 10px; margin: 15px 0; color: #856404; font-size: 0.9rem;">
                    <strong>⚠️ Nota Importante:</strong> Todas las clases se realizan los miércoles a partir del 6 de agosto de 2025. 
                    Este cronograma está organizado semanalmente para facilitar el seguimiento del curso.
                </div>
                
                <div class="schedule-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Semana</th>
                                <th>Fecha</th>
                                <th>Tema/Actividad</th>
                                <th>Descripción</th>
                                <th>Evaluación</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span class="week-number">1</span></td>
                                <td>6 de agosto, 2025</td>
                                <td>Presentación del curso, canvas, modelo de negocio y tips para ideas de producto</td>
                                <td>Introducción al curso, metodologías de innovación y conformación de grupos</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">2</span></td>
                                <td>13 de agosto, 2025</td>
                                <td>Lean canvas, Generative AI 101, conformación de grupos</td>
                                <td>Fundamentos de lean canvas, introducción a IA generativa y formación de equipos</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">3</span></td>
                                <td>20 de agosto, 2025</td>
                                <td>Modelos de monetización, análisis de ejemplos de empresas de tecnología y mesa redonda discusión de ideas de proyecto</td>
                                <td>Estrategias de monetización, casos de estudio y discusión de proyectos</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">4</span></td>
                                <td>27 de agosto, 2025</td>
                                <td>Presentación de pitch de problema a solucionar</td>
                                <td>Presentación del pitch del problema a solucionar</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">10%</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">5</span></td>
                                <td>3 de septiembre, 2025</td>
                                <td>Lean canvas - análisis de ejemplos en empresas de tecnología, Running Lean Part 1</td>
                                <td>Análisis de ejemplos en empresas de tecnología, Running Lean Part 1</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">10%</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">6</span></td>
                                <td>10 de septiembre, 2025</td>
                                <td>MVP and UI/UX, Agentic design</td>
                                <td>Desarrollo de MVP, diseño de interfaz de usuario y diseño agéntico</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">7</span></td>
                                <td>17 de septiembre, 2025</td>
                                <td>Presentaciones de prueba</td>
                                <td>Pruebas de presentación y feedback</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">8</span></td>
                                <td>24 de septiembre, 2025</td>
                                <td>Primera entrega del proyecto + Calificación jurados</td>
                                <td>Presentación lean canvas, primera validación con expertos, entrevistas del problema, MVP semi funcional</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">30%</td>
                            </tr>
                            <tr class="recess-week">
                                <td><span class="week-number">R</span></td>
                                <td>29 de septiembre - 4 de octubre, 2025</td>
                                <td>Semana de Receso</td>
                                <td>Semana Santa - No hay clases</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">9</span></td>
                                <td>8 de octubre, 2025</td>
                                <td>Buenas prácticas para un gran pitch y VC funding vs bootstrapping</td>
                                <td>Técnicas de presentación, financiamiento y estrategias de crecimiento</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">10</span></td>
                                <td>15 de octubre, 2025</td>
                                <td>Propiedad intelectual, registro de software</td>
                                <td>Protección de propiedad intelectual y registro de software</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">11</span></td>
                                <td>22 de octubre, 2025</td>
                                <td>Landing pages y tracción + trabajo en landing pages</td>
                                <td>Desarrollo de landing pages y estrategias de tracción</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">12</span></td>
                                <td>29 de octubre, 2025</td>
                                <td>SEO, SEM y funeles de conversión</td>
                                <td>Optimización para motores de búsqueda, marketing digital y conversión</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">13</span></td>
                                <td>5 de noviembre, 2025</td>
                                <td>Trabajo grupal en proyectos y entrega landing page</td>
                                <td>Trabajo grupal en proyectos y entrega landing page</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">10%</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">14</span></td>
                                <td>12 de noviembre, 2025</td>
                                <td>Herramientas de análisis e indicadores + análisis feedback a la fecha</td>
                                <td>Análisis de datos, métricas y feedback de usuarios</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">-</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">15</span></td>
                                <td>19 de noviembre, 2025</td>
                                <td>Semana de innovación</td>
                                <td>Presentación en la semana de innovación: Landing page, recolección de datos de interés, MVP funcional, video del MVP</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">10%</td>
                            </tr>
                            <tr>
                                <td><span class="week-number">16</span></td>
                                <td>26 de noviembre, 2025</td>
                                <td>Segunda Entrega Proyecto + Calificación jurados</td>
                                <td>Pitch final, MVP funcional, resultados recolección de datos y feedback de usuarios</td>
                                <td style="text-align: center; font-weight: bold; color: #667eea;">30%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="footer">
                <p><strong>Universidad de los Andes</strong></p>
                <p>Departamento de Ingeniería de Sistemas y Computación</p>
                <p>Semestre 2025-2</p>
            </div>
        </div>
    </div>
</body>
</html>`;

    // Set the HTML content
    await page.setContent(completeHTML, { waitUntil: 'networkidle0' });

    // Wait for images to load
    await page.waitForTimeout(2000);

    // Generate PDF with optimized settings for better page distribution
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '15mm',
            right: '15mm',
            bottom: '15mm',
            left: '15mm'
        },
        displayHeaderFooter: false,
        preferCSSPageSize: true
    });

    // Save the PDF
    const outputPath = 'ISIS2007-Documento-Completo-Optimizado.pdf';
    fs.writeFileSync(outputPath, pdfBuffer);
    
    console.log(`✅ PDF optimizado generado exitosamente: ${outputPath}`);
    console.log(`📄 Mejoras implementadas:`);
    console.log(`   - Mejor distribución del contenido en las páginas`);
    console.log(`   - Reducción de espacios en blanco excesivos`);
    console.log(`   - Prevención de cortes de contenido`);
    console.log(`   - Tamaños de fuente optimizados`);
    console.log(`   - Espaciado mejorado entre elementos`);
    console.log(`   - Márgenes reducidos para aprovechar mejor el espacio`);

    await browser.close();
}

// Run the script
generateCompletePDF().catch(console.error); 