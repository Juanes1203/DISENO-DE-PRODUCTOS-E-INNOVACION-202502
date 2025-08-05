// 🔐 SERVICIO STRAICO AI - Generación de Preguntas Inteligentes
// Configuración para preguntas dinámicas y complejas usando IA real
// Basado en la documentación oficial: https://documenter.getpostman.com/view/5900072/2s9YyzddrR

class StraicoService {
    constructor() {
        this.API_KEY = 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7';
        // URL correcta según la documentación oficial de STRAICO
        this.BASE_URL = 'https://api.straico.com/v1/prompt/completion';
        
        // Historial de preguntas para evitar repeticiones
        this.questionHistory = new Set();

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

    // Generar ID único para pregunta
    generateQuestionId(pregunta) {
        return btoa(pregunta.substring(0, 50)).replace(/[^a-zA-Z0-9]/g, '');
    }

    // Verificar si pregunta ya existe
    isQuestionRepeated(pregunta) {
        const questionId = this.generateQuestionId(pregunta);
        return this.questionHistory.has(questionId);
    }

    // Agregar pregunta al historial
    addToHistory(pregunta) {
        const questionId = this.generateQuestionId(pregunta);
        this.questionHistory.add(questionId);
    }

    // Generar preguntas de conocimiento general (nivel básico-intermedio)
    async generateGeneralKnowledgeQuestions(student) {
        const prompt = `Genera 5 preguntas básicas sobre innovación y emprendimiento para el estudiante ${student}.

INSTRUCCIONES:
- Preguntas de nivel básico a intermedio
- Conceptos fundamentales de innovación y emprendimiento
- Respuestas cortas y directas
- Dificultad: BÁSICA-INTERMEDIA
- Usa preguntas como "¿Qué es un MVP?" o "¿Cuál es la diferencia entre startup y empresa tradicional?"
- IMPORTANTE: Cada pregunta debe ser ÚNICA

RESPONDE SOLO CON JSON VÁLIDO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta básica aquí",
      "respuesta_correcta": "Respuesta corta y directa",
      "explicacion": "Explicación breve",
      "dificultad": "BÁSICA"
    }
  ],
  "category": "general"
}`;

        return await this.callStraicoAPI(prompt, 'general');
    }

    // Generar preguntas basadas en el cronograma del curso
    async generateClassTopicQuestions(student) {
        const currentWeek = this.getCurrentWeek();
        const weekData = this.COURSE_SCHEDULE[currentWeek];
        
        const prompt = `Genera 5 preguntas básicas sobre los temas de la SEMANA ${currentWeek} del curso ISIS2007 para el estudiante ${student}.

SEMANA ${currentWeek}:
- Tema: ${weekData.topic}
- Conceptos clave: ${weekData.key_concepts.join(', ')}

INSTRUCCIONES:
- Preguntas básicas sobre los conceptos de esta semana
- Nivel de dificultad: BÁSICO
- Respuestas cortas y directas
- NO uses preguntas complejas, usa conceptos fundamentales
- IMPORTANTE: Cada pregunta debe ser ÚNICA

RESPONDE SOLO CON JSON VÁLIDO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta básica de la semana ${currentWeek}",
      "respuesta_correcta": "Respuesta corta",
      "explicacion": "Explicación breve",
      "semana": ${currentWeek},
      "dificultad": "BÁSICA"
    }
  ],
  "category": "class",
  "semana": ${currentWeek}
}`;

        return await this.callStraicoAPI(prompt, 'class');
    }

    // Generar preguntas sobre tema específico (nivel básico)
    async generateSpecificTopicQuestions(student, topic) {
        const prompt = `Genera 5 preguntas básicas sobre "${topic}" para el estudiante ${student}.

INSTRUCCIONES:
- Preguntas básicas sobre el tema específico
- Conceptos fundamentales
- Respuestas cortas y directas
- Dificultad: BÁSICA
- Usa preguntas simples y directas
- IMPORTANTE: Cada pregunta debe ser ÚNICA

RESPONDE SOLO CON JSON VÁLIDO:
{
  "success": true,
  "questions": [
    {
      "pregunta": "Pregunta básica sobre ${topic}",
      "respuesta_correcta": "Respuesta corta",
      "explicacion": "Explicación breve",
      "tema": "${topic}",
      "dificultad": "BÁSICA"
    }
  ],
  "category": "specific",
  "tema": "${topic}"
}`;

        return await this.callStraicoAPI(prompt, 'specific');
    }

    // Llamada a la API de STRAICO mejorada con formato correcto
    async callStraicoAPI(prompt, category) {
        console.log(`🔍 Debug: Llamando a STRAICO API para categoría: ${category}`);
        
        try {
            // Formato correcto basado en el ejemplo que funciona
            const requestBody = {
                models: ["anthropic/claude-3.7-sonnet:thinking"],
                message: prompt,
                temperature: 0.7,
                max_tokens: 1000
            };

            console.log(`🔍 Debug: Request body:`, JSON.stringify(requestBody, null, 2));

            const response = await fetch(this.BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            console.log(`🔍 Debug: Status de respuesta:`, response.status);
            console.log(`🔍 Debug: Headers de respuesta:`, Object.fromEntries(response.headers.entries()));

            if (response.ok) {
                const data = await response.json();
                console.log(`🔍 Debug: Respuesta exitosa:`, data);
                
                // Extraer el contenido de la respuesta según el formato de STRAICO
                const firstModelKey = Object.keys(data.data.completions)[0];
                const completion = data.data.completions[firstModelKey].completion;
                
                if (!completion.choices?.[0]?.message?.content) {
                    console.error('Invalid response format:', data);
                    throw new Error('Invalid response format from STRAICO API');
                }

                const content = completion.choices[0].message.content;
                console.log(`🔍 Debug: Contenido de respuesta:`, content);
                
                try {
                    // Limpiar el contenido para obtener solo el JSON
                    const cleanContent = content
                        .replace(/```json\n?|\n?```/g, '') // Remove markdown code blocks
                        .replace(/^[\s\n]+|[\s\n]+$/g, '') // Trim whitespace and newlines
                        .replace(/[\u2018\u2019]/g, "'") // Replace smart quotes with regular quotes
                        .replace(/[\u201C\u201D]/g, '"') // Replace smart quotes with regular quotes
                        .replace(/^[^{]*({[\s\S]*})[^}]*$/, '$1'); // Extract only the JSON object
                    
                    console.log('Cleaned content:', cleanContent);
                    
                    const parsed = JSON.parse(cleanContent);
                    
                    // Filtrar preguntas repetidas
                    if (parsed.questions) {
                        const uniqueQuestions = [];
                        for (const question of parsed.questions) {
                            if (!this.isQuestionRepeated(question.pregunta)) {
                                this.addToHistory(question.pregunta);
                                uniqueQuestions.push(question);
                            } else {
                                console.log(`🔍 Debug: Pregunta repetida filtrada: ${question.pregunta.substring(0, 50)}...`);
                            }
                        }
                        parsed.questions = uniqueQuestions;
                    }
                    
                    console.log(`🔍 Debug: JSON parseado exitosamente con ${parsed.questions ? parsed.questions.length : 0} preguntas únicas`);
                    return parsed;
                } catch (parseError) {
                    console.error(`🔍 Debug: Error al parsear JSON:`, parseError);
                    console.log(`🔍 Debug: Contenido que falló:`, content);
                }
            } else {
                const errorText = await response.text();
                console.log(`🔍 Debug: Error ${response.status}: ${response.statusText}`);
                console.log(`🔍 Debug: Error response:`, errorText);
            }
        } catch (error) {
            console.error(`🔍 Debug: Error en STRAICO API:`, error.message);
        }

        // Si la API falla, usar preguntas dinámicas por defecto
        console.log('🔍 Debug: Usando preguntas dinámicas por defecto');
        return this.createDynamicFallbackQuestions(category);
    }

    // Crear preguntas dinámicas por defecto (más básicas)
    createDynamicFallbackQuestions(category) {
        const currentWeek = this.getCurrentWeek();
        const weekData = this.COURSE_SCHEDULE[currentWeek];
        const timestamp = Date.now();
        
        // Preguntas básicas por categoría
        const categoryQuestions = {
            'general': [
                {
                    pregunta: `¿Qué es un MVP? (${timestamp})`,
                    respuesta_correcta: `Un MVP (Minimum Viable Product) es la versión más simple de un producto que permite validar una hipótesis de negocio con el mínimo esfuerzo y recursos.`,
                    explicacion: `El MVP es fundamental en metodologías ágiles para validar ideas rápidamente.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Cuál es la diferencia entre startup y empresa tradicional? (${timestamp})`,
                    respuesta_correcta: `Una startup busca un modelo de negocio escalable y repetible, mientras que una empresa tradicional ya tiene un modelo establecido. Las startups se enfocan en crecimiento rápido e innovación.`,
                    explicacion: `Las startups se caracterizan por su capacidad de escalar rápidamente.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Qué es el Design Thinking? (${timestamp})`,
                    respuesta_correcta: `Design Thinking es una metodología de innovación centrada en el usuario que incluye empatía, definición, ideación, prototipado y testing.`,
                    explicacion: `Es un proceso iterativo para resolver problemas complejos.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Qué es el Lean Startup? (${timestamp})`,
                    respuesta_correcta: `Lean Startup es una metodología que busca crear productos de manera eficiente mediante experimentos, iteraciones rápidas y validación de hipótesis.`,
                    explicacion: `Se basa en el ciclo Build-Measure-Learn.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Qué es el Customer Development? (${timestamp})`,
                    respuesta_correcta: `Customer Development es un proceso para validar hipótesis de negocio mediante entrevistas con clientes potenciales y experimentos.`,
                    explicacion: `Fue desarrollado por Steve Blank para startups.`,
                    dificultad: "BÁSICA"
                }
            ],
            'class': [
                {
                    pregunta: `¿Qué es el Canvas de modelo de negocio? (${timestamp})`,
                    respuesta_correcta: `El Canvas es una herramienta visual que describe los elementos clave de un modelo de negocio en 9 bloques: propuesta de valor, segmentos de clientes, canales, relaciones, ingresos, recursos, actividades, socios y costos.`,
                    explicacion: `Es una herramienta fundamental para planificar negocios.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué es la IA Generativa? (${timestamp})`,
                    respuesta_correcta: `La IA Generativa es un tipo de inteligencia artificial que puede crear contenido nuevo como texto, imágenes, música o código basándose en patrones aprendidos de datos existentes.`,
                    explicacion: `Ejemplos incluyen ChatGPT, DALL-E y GitHub Copilot.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué son los modelos de monetización? (${timestamp})`,
                    respuesta_correcta: `Los modelos de monetización son las estrategias que usa una empresa para generar ingresos, como suscripciones, publicidad, marketplace fees, freemium o venta directa.`,
                    explicacion: `Son fundamentales para la sostenibilidad del negocio.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué es un pitch? (${timestamp})`,
                    respuesta_correcta: `Un pitch es una presentación breve y persuasiva que explica una idea de negocio, producto o proyecto de manera clara y atractiva.`,
                    explicacion: `Es esencial para conseguir inversión o apoyo.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Qué es el Running Lean? (${timestamp})`,
                    respuesta_correcta: `Running Lean es una metodología desarrollada por Ash Maurya que adapta el Lean Startup para crear productos de manera más eficiente, enfocándose en validación rápida.`,
                    explicacion: `Es una evolución del Lean Startup más práctica.`,
                    dificultad: "BÁSICA"
                }
            ],
            'specific': [
                {
                    pregunta: `¿Qué es la validación de hipótesis? (${timestamp})`,
                    respuesta_correcta: `La validación de hipótesis es el proceso de probar si las suposiciones sobre un negocio o producto son correctas mediante experimentos y datos reales.`,
                    explicacion: `Es fundamental para evitar construir productos que nadie quiere.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué son las métricas clave? (${timestamp})`,
                    respuesta_correcta: `Las métricas clave son indicadores medibles que muestran el progreso y éxito de un negocio, como engagement, conversión, retención y crecimiento.`,
                    explicacion: `Ayudan a tomar decisiones basadas en datos.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué es el prototipado? (${timestamp})`,
                    respuesta_correcta: `El prototipado es crear versiones rápidas y simples de un producto para probar ideas y obtener feedback antes de desarrollar la versión final.`,
                    explicacion: `Permite iterar rápidamente y mejorar el producto.`,
                    dificultad: "BÁSICA",
                    semana: currentWeek
                },
                {
                    pregunta: `¿Qué es el feedback del usuario? (${timestamp})`,
                    respuesta_correcta: `El feedback del usuario son las opiniones, sugerencias y comentarios que los usuarios dan sobre un producto o servicio para ayudar a mejorarlo.`,
                    explicacion: `Es esencial para crear productos que resuelvan problemas reales.`,
                    dificultad: "BÁSICA"
                },
                {
                    pregunta: `¿Qué es la iteración? (${timestamp})`,
                    respuesta_correcta: `La iteración es el proceso de mejorar un producto mediante ciclos repetidos de desarrollo, prueba y refinamiento basado en feedback.`,
                    explicacion: `Es fundamental en metodologías ágiles.`,
                    dificultad: "BÁSICA"
                }
            ]
        };

        // Obtener preguntas específicas de la categoría
        const fallbackQuestions = categoryQuestions[category] || categoryQuestions['general'];

        // Agregar al historial para evitar repeticiones
        fallbackQuestions.forEach(q => this.addToHistory(q.pregunta));

        return {
            success: true,
            questions: fallbackQuestions,
            category: category,
            semana: currentWeek,
            fallback: true
        };
    }
}

// Exportar servicio
window.straicoService = new StraicoService(); 