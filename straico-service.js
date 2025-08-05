// Servicio para interactuar con STRAICO AI
// Genera preguntas inteligentes basadas en categorías

class StraicoService {
    constructor() {
        this.API_KEY = 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7';
        this.BASE_URL = 'https://api.straico.com/v1/chat/completions';
    }

    // Función para generar preguntas de conocimiento general
    async generateGeneralKnowledgeQuestions(studentName) {
        const prompt = `Genera 3 preguntas interesantes de conocimiento general que sean apropiadas para un estudiante universitario. 
        Las preguntas deben ser variadas y cubrir diferentes áreas como historia, ciencia, cultura, tecnología, etc.
        Formato de respuesta: JSON con array de objetos con "pregunta" y "respuesta_correcta".
        Ejemplo: [{"pregunta": "¿Cuál es la capital de Japón?", "respuesta_correcta": "Tokio"}]`;

        return await this.generateQuestions(prompt, studentName);
    }

    // Función para generar preguntas sobre temas de la clase
    async generateClassTopicQuestions(studentName) {
        const prompt = `Genera 3 preguntas sobre temas relacionados con "Diseño de Productos e Innovación en TI" 
        que sean apropiadas para un curso universitario. Las preguntas deben cubrir conceptos como:
        - Diseño de productos digitales
        - Innovación tecnológica
        - UX/UI Design
        - Metodologías de diseño
        - Tecnologías emergentes
        - Emprendimiento tecnológico
        
        Formato de respuesta: JSON con array de objetos con "pregunta" y "respuesta_correcta".
        Las preguntas deben ser desafiantes pero accesibles para estudiantes.`;

        return await this.generateQuestions(prompt, studentName);
    }

    // Función para generar preguntas sobre un tema específico
    async generateSpecificTopicQuestions(studentName, specificTopic) {
        const prompt = `Genera 3 preguntas específicas sobre el tema: "${specificTopic}"
        que sean apropiadas para un estudiante universitario. Las preguntas deben ser:
        - Relevantes al tema especificado
        - Desafiantes pero accesibles
        - Variadas en dificultad
        - Interesantes y educativas
        
        Formato de respuesta: JSON con array de objetos con "pregunta" y "respuesta_correcta".
        Asegúrate de que las preguntas estén directamente relacionadas con "${specificTopic}".`;

        return await this.generateQuestions(prompt, studentName, specificTopic);
    }

    // Función principal para generar preguntas
    async generateQuestions(prompt, studentName, specificTopic = null) {
        try {
            const fullPrompt = specificTopic 
                ? `${prompt}\n\nEstudiante seleccionado: ${studentName}\nTema específico: ${specificTopic}`
                : `${prompt}\n\nEstudiante seleccionado: ${studentName}`;

            const response = await fetch(this.BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'system',
                            content: 'Eres un profesor universitario experto en crear preguntas educativas y desafiantes. Siempre responde en formato JSON válido.'
                        },
                        {
                            role: 'user',
                            content: fullPrompt
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 1000
                })
            });

            if (response.ok) {
                const data = await response.json();
                const content = data.choices[0].message.content;
                
                // Intentar parsear el JSON de la respuesta
                try {
                    const questions = JSON.parse(content);
                    return {
                        success: true,
                        questions: questions,
                        category: specificTopic || 'general'
                    };
                } catch (parseError) {
                    console.error('Error al parsear JSON:', parseError);
                    // Si no es JSON válido, crear preguntas por defecto
                    return this.createDefaultQuestions(studentName, specificTopic);
                }
            } else {
                console.error('Error en la API de STRAICO:', response.status);
                return this.createDefaultQuestions(studentName, specificTopic);
            }
        } catch (error) {
            console.error('Error al generar preguntas:', error);
            return this.createDefaultQuestions(studentName, specificTopic);
        }
    }

    // Función para crear preguntas por defecto si la API falla
    createDefaultQuestions(studentName, specificTopic = null) {
        const generalQuestions = [
            {
                pregunta: "¿Cuál es la capital de Francia?",
                respuesta_correcta: "París"
            },
            {
                pregunta: "¿En qué año comenzó la Primera Guerra Mundial?",
                respuesta_correcta: "1914"
            },
            {
                pregunta: "¿Cuál es el planeta más grande del sistema solar?",
                respuesta_correcta: "Júpiter"
            }
        ];

        const classQuestions = [
            {
                pregunta: "¿Qué significa UX en diseño de productos?",
                respuesta_correcta: "User Experience (Experiencia de Usuario)"
            },
            {
                pregunta: "¿Cuál es una metodología popular para innovación?",
                respuesta_correcta: "Design Thinking"
            },
            {
                pregunta: "¿Qué es un MVP en desarrollo de productos?",
                respuesta_correcta: "Minimum Viable Product (Producto Mínimo Viable)"
            }
        ];

        const specificQuestions = [
            {
                pregunta: `¿Qué sabes sobre ${specificTopic || 'este tema'}?`,
                respuesta_correcta: "Respuesta específica al tema"
            },
            {
                pregunta: `¿Cómo se aplica ${specificTopic || 'este concepto'} en la práctica?`,
                respuesta_correcta: "Aplicación práctica del tema"
            },
            {
                pregunta: `¿Cuáles son las tendencias actuales en ${specificTopic || 'este campo'}?`,
                respuesta_correcta: "Tendencias del tema específico"
            }
        ];

        const questions = specificTopic ? specificQuestions : 
                         (specificTopic === 'class' ? classQuestions : generalQuestions);

        return {
            success: true,
            questions: questions,
            category: specificTopic || 'general',
            fallback: true
        };
    }

    // Función para validar la API key
    async testConnection() {
        try {
            const response = await fetch(this.BASE_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [
                        {
                            role: 'user',
                            content: 'Responde solo con "OK" si puedes leer este mensaje.'
                        }
                    ],
                    max_tokens: 10
                })
            });

            return response.ok;
        } catch (error) {
            console.error('Error al probar conexión con STRAICO:', error);
            return false;
        }
    }
}

// Crear instancia global del servicio
const straicoService = new StraicoService(); 