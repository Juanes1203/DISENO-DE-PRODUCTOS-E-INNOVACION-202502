// 🔐 SERVICIO STRAICO AI - Generación de Preguntas Inteligentes
// Configuración para preguntas más complejas y basadas en el cronograma

class StraicoService {
    constructor() {
        this.API_KEY = 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7';
        this.BASE_URL = 'https://api.straico.com/v1/chat/completions';
        
        // Cronograma del curso ISIS2007 por semana
        this.COURSE_SCHEDULE = {
            1: {
                topic: "Presentación del curso, canvas, modelo de negocio y tips para ideas de producto",
                activities: "Introducción al curso, metodologías de innovación y conformación de grupos",
                key_concepts: ["Canvas de modelo de negocio", "Metodologías de innovación", "Ideas de producto", "Lean Startup"]
            },
            2: {
                topic: "Lean canvas, Generative AI 101, conformación de grupos",
                activities: "Fundamentos de lean canvas, introducción a IA generativa y formación de equipos",
                key_concepts: ["Lean Canvas", "Generative AI", "Formación de equipos", "MVP"]
            },
            3: {
                topic: "Modelos de monetización, análisis de ejemplos de empresas de tecnología y mesa redonda discusión de ideas de proyecto",
                activities: "Estrategias de monetización, casos de estudio y discusión de proyectos",
                key_concepts: ["Modelos de monetización", "Casos de estudio", "Estrategias de negocio", "Validación"]
            },
            4: {
                topic: "Presentación de pitch de problema a solucionar",
                activities: "Presentación del pitch del problema a solucionar",
                key_concepts: ["Pitch", "Problema-solución", "Presentación", "Storytelling"]
            },
            5: {
                topic: "Lean canvas - análisis de ejemplos en empresas de tecnología, Running Lean Part 1",
                activities: "Análisis de ejemplos en empresas de tecnología, Running Lean Part 1",
                key_concepts: ["Running Lean", "Análisis de casos", "Validación de hipótesis", "Customer Development"]
            },
            6: {
                topic: "MVP and UI/UX, Agentic design",
                activities: "Desarrollo de MVP, diseño de interfaz de usuario y diseño agéntico",
                key_concepts: ["MVP", "UI/UX Design", "Agentic Design", "Prototipado"]
            },
            7: {
                topic: "Presentaciones de prueba",
                activities: "Pruebas de presentación y feedback",
                key_concepts: ["Presentaciones", "Feedback", "Iteración", "Mejora continua"]
            },
            8: {
                topic: "Primera entrega del proyecto + Calificación jurados",
                activities: "Presentación lean canvas, primera validación con expertos, entrevistas del problema, MVP semi funcional",
                key_concepts: ["Lean Canvas", "Validación con expertos", "Entrevistas", "MVP funcional"]
            },
            9: {
                topic: "Buenas prácticas para un gran pitch y VC funding vs bootstrapping",
                activities: "Técnicas de presentación, financiamiento y estrategias de crecimiento",
                key_concepts: ["Pitch", "VC Funding", "Bootstrapping", "Financiamiento"]
            },
            10: {
                topic: "Propiedad intelectual, registro de software",
                activities: "Protección de propiedad intelectual y registro de software",
                key_concepts: ["Propiedad intelectual", "Registro de software", "Patentes", "Derechos de autor"]
            },
            11: {
                topic: "Landing pages y tracción + trabajo en landing pages",
                activities: "Desarrollo de landing pages y estrategias de tracción",
                key_concepts: ["Landing Pages", "Tracción", "Conversión", "Marketing digital"]
            },
            12: {
                topic: "SEO, SEM y funeles de conversión",
                activities: "Optimización para motores de búsqueda, marketing digital y conversión",
                key_concepts: ["SEO", "SEM", "Funnels de conversión", "Marketing digital"]
            },
            13: {
                topic: "Trabajo grupal en proyectos y entrega landing page",
                activities: "Trabajo grupal en proyectos y entrega landing page",
                key_concepts: ["Trabajo grupal", "Landing page", "Colaboración", "Entrega"]
            },
            14: {
                topic: "Herramientas de análisis e indicadores + análisis feedback a la fecha",
                activities: "Análisis de datos, métricas y feedback de usuarios",
                key_concepts: ["Análisis de datos", "Métricas", "Feedback", "KPIs"]
            },
            15: {
                topic: "Semana de innovación",
                activities: "Presentación en la semana de innovación: Landing page, recolección de datos de interés, MVP funcional, video del MVP",
                key_concepts: ["Semana de innovación", "MVP funcional", "Video pitch", "Presentación final"]
            },
            16: {
                topic: "Segunda Entrega Proyecto + Calificación jurados",
                activities: "Pitch final, MVP funcional, resultados recolección de datos y feedback de usuarios",
                key_concepts: ["Pitch final", "MVP funcional", "Resultados", "Evaluación final"]
            }
        };
    }

    // Obtener semana actual basada en la fecha
    getCurrentWeek() {
        const today = new Date();
        const courseStart = new Date('2025-08-06'); // 6 de agosto, 2025
        const weeksDiff = Math.floor((today - courseStart) / (7 * 24 * 60 * 60 * 1000));
        return Math.max(1, Math.min(16, weeksDiff + 1));
    }

    // Generar preguntas de conocimiento general (alta complejidad)
    async generateGeneralKnowledgeQuestions(student) {
        const prompt = `Genera 5 preguntas de ALTA COMPLEJIDAD sobre innovación, emprendimiento y tecnología para el estudiante ${student}. 

REQUISITOS:
- Preguntas de nivel universitario avanzado
- Incluir conceptos de metodologías ágiles, lean startup, design thinking
- Preguntas que requieran análisis crítico y aplicación práctica
- Respuestas detalladas y fundamentadas
- Dificultad: EXPERTA

FORMATO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta compleja aquí",
      "respuesta_correcta": "Respuesta detallada y fundamentada",
      "explicacion": "Explicación adicional del concepto",
      "dificultad": "ALTA"
    }
  ],
  "category": "general"
}`;

        return await this.callStraicoAPI(prompt);
    }

    // Generar preguntas basadas en el cronograma del curso
    async generateClassTopicQuestions(student) {
        const currentWeek = this.getCurrentWeek();
        const weekData = this.COURSE_SCHEDULE[currentWeek];
        
        const prompt = `Genera 5 preguntas de ALTA COMPLEJIDAD sobre los temas de la SEMANA ${currentWeek} del curso ISIS2007 para el estudiante ${student}.

SEMANA ${currentWeek}:
- Tema: ${weekData.topic}
- Actividades: ${weekData.activities}
- Conceptos clave: ${weekData.key_concepts.join(', ')}

REQUISITOS:
- Preguntas específicas sobre los conceptos de esta semana
- Nivel de dificultad: EXPERTA
- Incluir análisis crítico y aplicación práctica
- Relacionar con casos reales de empresas tecnológicas
- Respuestas detalladas con ejemplos

FORMATO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta específica de la semana ${currentWeek}",
      "respuesta_correcta": "Respuesta detallada con ejemplos",
      "explicacion": "Contexto adicional del tema",
      "semana": ${currentWeek},
      "dificultad": "ALTA"
    }
  ],
  "category": "class",
  "semana": ${currentWeek}
}`;

        return await this.callStraicoAPI(prompt);
    }

    // Generar preguntas sobre tema específico (alta complejidad)
    async generateSpecificTopicQuestions(student, topic) {
        const prompt = `Genera 5 preguntas de ALTA COMPLEJIDAD sobre "${topic}" para el estudiante ${student}.

REQUISITOS:
- Preguntas de nivel experto sobre el tema específico
- Incluir análisis crítico, casos de estudio y aplicaciones prácticas
- Relacionar con innovación, emprendimiento y tecnología
- Respuestas detalladas con fundamentos teóricos y ejemplos
- Dificultad: EXPERTA

FORMATO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta compleja sobre ${topic}",
      "respuesta_correcta": "Respuesta detallada y fundamentada",
      "explicacion": "Contexto y explicación adicional",
      "tema": "${topic}",
      "dificultad": "ALTA"
    }
  ],
  "category": "specific",
  "tema": "${topic}"
}`;

        return await this.callStraicoAPI(prompt);
    }

    // Llamada a la API de STRAICO
    async callStraicoAPI(prompt) {
        try {
            const response = await fetch(this.BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'Eres un experto en innovación, emprendimiento y tecnología. Genera preguntas de ALTA COMPLEJIDAD para estudiantes universitarios avanzados.'
                        },
                        {
                            role: 'user',
                            content: prompt
                        }
                    ],
                    max_tokens: 2000,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const content = data.choices[0].message.content;
                
                try {
                    // Intentar parsear como JSON
                    const parsed = JSON.parse(content);
                    return parsed;
                } catch (parseError) {
                    // Si no es JSON válido, crear estructura por defecto
                    return {
                        success: true,
                        questions: [
                            {
                                pregunta: "¿Cuál es la diferencia fundamental entre un MVP y un prototipo en el contexto de lean startup?",
                                respuesta_correcta: "Un MVP (Minimum Viable Product) es una versión del producto que permite validar hipótesis de negocio con clientes reales, mientras que un prototipo es una representación visual o funcional para demostrar conceptos. El MVP debe generar valor medible y feedback de usuarios reales.",
                                explicacion: "El MVP es clave en la metodología lean startup para validar hipótesis de manera rápida y económica.",
                                dificultad: "ALTA"
                            }
                        ],
                        category: "fallback"
                    };
                }
            } else {
                throw new Error('Respuesta inválida de la API');
            }
        } catch (error) {
            console.error('Error en STRAICO API:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }
}

// Exportar servicio
window.straicoService = new StraicoService(); 