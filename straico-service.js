// 🔐 SERVICIO STRAICO AI - Generación de Preguntas Inteligentes
// Configuración para preguntas dinámicas y complejas usando IA real

class StraicoService {
    constructor() {
        this.API_KEY = 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7';
        // Probando diferentes URLs de STRAICO
        this.BASE_URL = 'https://api.straico.com/v1/chat/completions';
        this.ALTERNATIVE_URL = 'https://api.straico.com/chat/completions';
        this.OPENAI_URL = 'https://api.openai.com/v1/chat/completions';
        
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
        const prompt = `Actúa como un profesor experto en innovación y emprendimiento. Genera 5 preguntas de ALTA COMPLEJIDAD sobre innovación, emprendimiento y tecnología para el estudiante ${student}.

INSTRUCCIONES:
- Las preguntas deben ser de nivel universitario avanzado
- Incluir conceptos de metodologías ágiles, lean startup, design thinking
- Preguntas que requieran análisis crítico y aplicación práctica
- Respuestas detalladas y fundamentadas
- Dificultad: EXPERTA
- NO uses preguntas básicas como "¿Qué es un MVP?"
- Usa preguntas como "¿Cómo aplicarías el principio de pivot en un startup de IA?"

RESPONDE SOLO CON JSON VÁLIDO:
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
        
        const prompt = `Actúa como un profesor experto en innovación. Genera 5 preguntas de ALTA COMPLEJIDAD sobre los temas de la SEMANA ${currentWeek} del curso ISIS2007 para el estudiante ${student}.

SEMANA ${currentWeek}:
- Tema: ${weekData.topic}
- Actividades: ${weekData.activities}
- Conceptos clave: ${weekData.key_concepts.join(', ')}

INSTRUCCIONES:
- Preguntas ESPECÍFICAS sobre los conceptos de esta semana
- Nivel de dificultad: EXPERTA
- Incluir análisis crítico y aplicación práctica
- Relacionar con casos reales de empresas tecnológicas
- Respuestas detalladas con ejemplos
- NO uses preguntas genéricas, usa el contexto específico de la semana

RESPONDE SOLO CON JSON VÁLIDO:
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
        const prompt = `Actúa como un profesor experto en innovación y tecnología. Genera 5 preguntas de ALTA COMPLEJIDAD sobre "${topic}" para el estudiante ${student}.

INSTRUCCIONES:
- Preguntas de nivel experto sobre el tema específico
- Incluir análisis crítico, casos de estudio y aplicaciones prácticas
- Relacionar con innovación, emprendimiento y tecnología
- Respuestas detalladas con fundamentos teóricos y ejemplos
- Dificultad: EXPERTA
- NO uses preguntas básicas, usa preguntas que requieran análisis profundo

RESPONDE SOLO CON JSON VÁLIDO:
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

    // Llamada a la API de STRAICO mejorada con múltiples URLs
    async callStraicoAPI(prompt) {
        const urls = [
            this.BASE_URL,
            this.ALTERNATIVE_URL,
            this.OPENAI_URL
        ];

        for (let i = 0; i < urls.length; i++) {
            const url = urls[i];
            console.log(`🔍 Debug: Probando URL ${i + 1}: ${url}`);
            
            try {
                const response = await fetch(url, {
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
                                content: 'Eres un profesor universitario experto en innovación, emprendimiento y tecnología. Genera preguntas de ALTA COMPLEJIDAD para estudiantes universitarios avanzados. SIEMPRE responde en formato JSON válido.'
                            },
                            {
                                role: 'user',
                                content: prompt
                            }
                        ],
                        max_tokens: 3000,
                        temperature: 0.8
                    })
                });

                console.log(`🔍 Debug: Status de respuesta para ${url}:`, response.status);

                if (response.ok) {
                    const data = await response.json();
                    console.log(`🔍 Debug: Respuesta exitosa de ${url}:`, data);
                    
                    if (data.choices && data.choices[0] && data.choices[0].message) {
                        const content = data.choices[0].message.content;
                        console.log(`🔍 Debug: Contenido de respuesta de ${url}:`, content);
                        
                        try {
                            const parsed = JSON.parse(content);
                            console.log(`🔍 Debug: JSON parseado exitosamente de ${url}:`, parsed);
                            return parsed;
                        } catch (parseError) {
                            console.error(`🔍 Debug: Error al parsear JSON de ${url}:`, parseError);
                            console.log(`🔍 Debug: Contenido que falló de ${url}:`, content);
                        }
                    }
                } else {
                    console.log(`🔍 Debug: Error ${response.status} para ${url}: ${response.statusText}`);
                }
            } catch (error) {
                console.error(`🔍 Debug: Error en ${url}:`, error.message);
            }
        }

        // Si todas las URLs fallan, usar preguntas por defecto
        console.log('🔍 Debug: Todas las URLs fallaron, usando preguntas por defecto');
        return this.createDynamicFallbackQuestions();
    }

    // Crear preguntas dinámicas por defecto
    createDynamicFallbackQuestions() {
        const currentWeek = this.getCurrentWeek();
        const weekData = this.COURSE_SCHEDULE[currentWeek];
        
        return {
            success: true,
            questions: [
                {
                    pregunta: `¿Cómo aplicarías los principios de Customer Development de Steve Blank en la validación de un MVP para la semana ${currentWeek} del curso?`,
                    respuesta_correcta: `En la semana ${currentWeek}, se aplicaría Customer Development mediante entrevistas estructuradas con usuarios potenciales, validación de hipótesis de problema y solución, y medición de métricas clave como engagement y retención. El proceso incluiría iteraciones rápidas basadas en feedback real.`,
                    explicacion: `Customer Development es fundamental para validar hipótesis de negocio antes de invertir recursos significativos en desarrollo.`,
                    dificultad: "ALTA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué estrategias de monetización serían más efectivas para un startup de tecnología en la etapa actual del curso (semana ${currentWeek})?`,
                    respuesta_correcta: `Para la semana ${currentWeek}, las estrategias más efectivas incluirían freemium, suscripciones SaaS, marketplace fees, y data monetization. La elección dependería del modelo de negocio validado y la propuesta de valor única.`,
                    explicacion: `La monetización debe alinearse con el valor percibido por el usuario y la capacidad de ejecución del equipo.`,
                    dificultad: "ALTA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Cómo implementarías un sistema de métricas y KPIs para medir el éxito de un MVP en el contexto de ${weekData.topic}?`,
                    respuesta_correcta: `Implementaría métricas de engagement (DAU/MAU), conversión (funnel rates), retención (cohort analysis), y métricas de negocio (LTV, CAC). Para ${weekData.topic}, enfocaría en métricas específicas del dominio.`,
                    explicacion: `Las métricas deben ser accionables y alineadas con los objetivos de negocio y la etapa del producto.`,
                    dificultad: "ALTA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué técnicas de Design Thinking aplicarías para resolver problemas de UX/UI en el desarrollo de un producto digital innovador?`,
                    respuesta_correcta: `Aplicaría empatía (user research), definición (problem framing), ideación (brainstorming), prototipado (rapid prototyping), y testing (user validation). El proceso sería iterativo y centrado en el usuario.`,
                    explicacion: `Design Thinking es una metodología que combina creatividad y análisis para resolver problemas complejos.`,
                    dificultad: "ALTA"
                },
                {
                    pregunta: `¿Cómo evaluarías la viabilidad técnica y comercial de una idea de startup usando el framework de Ash Maurya?`,
                    respuesta_correcta: `Usaría el Lean Canvas para mapear el modelo de negocio, validaría hipótesis con experimentos, mediría métricas clave, y pivotearía basado en datos. El proceso incluiría entrevistas con usuarios y análisis de competencia.`,
                    explicacion: `El framework de Ash Maurya es una adaptación del Business Model Canvas específicamente diseñada para startups.`,
                    dificultad: "ALTA"
                }
            ],
            category: "fallback",
            semana: currentWeek
        };
    }
}

// Exportar servicio
window.straicoService = new StraicoService(); 