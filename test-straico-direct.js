// 🧪 TEST DIRECTO - Servicio STRAICO
// Script para probar el funcionamiento del módulo de preguntas

console.log('🧪 Iniciando test directo del servicio STRAICO...');

// Simular el entorno del navegador
if (typeof window === 'undefined') {
    global.window = {};
}

// Cargar el servicio STRAICO
const fs = require('fs');
const straicoServiceCode = fs.readFileSync('straico-service.js', 'utf8');
eval(straicoServiceCode);

// Función de prueba
async function runTests() {
    console.log('\n🔍 === TEST 1: Verificar servicio cargado ===');
    console.log('straicoService:', typeof straicoService);
    console.log('getCurrentWeek:', typeof straicoService.getCurrentWeek);
    
    console.log('\n🔍 === TEST 2: Semana actual ===');
    const currentWeek = straicoService.getCurrentWeek();
    console.log('Semana actual:', currentWeek);
    console.log('Datos de la semana:', straicoService.COURSE_SCHEDULE[currentWeek]);
    
    console.log('\n🔍 === TEST 3: Test conexión STRAICO ===');
    try {
        const response = await fetch('https://api.straico.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7',
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
        
        console.log('Status:', response.status);
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Conexión exitosa:', data.choices[0].message.content);
        } else {
            console.log('❌ Error de conexión:', response.statusText);
        }
    } catch (error) {
        console.log('❌ Error en conexión:', error.message);
    }
    
    console.log('\n🔍 === TEST 4: Test preguntas generales ===');
    try {
        const result = await straicoService.generateGeneralKnowledgeQuestions('Test Student');
        console.log('✅ Preguntas generales generadas:', result.success);
        if (result.questions) {
            console.log('Número de preguntas:', result.questions.length);
            console.log('Primera pregunta:', result.questions[0].pregunta.substring(0, 100) + '...');
        }
    } catch (error) {
        console.log('❌ Error en preguntas generales:', error.message);
    }
    
    console.log('\n🔍 === TEST 5: Test preguntas de clase ===');
    try {
        const result = await straicoService.generateClassTopicQuestions('Test Student');
        console.log('✅ Preguntas de clase generadas:', result.success);
        if (result.questions) {
            console.log('Número de preguntas:', result.questions.length);
            console.log('Semana:', result.semana);
        }
    } catch (error) {
        console.log('❌ Error en preguntas de clase:', error.message);
    }
    
    console.log('\n🔍 === TEST 6: Test preguntas específicas ===');
    try {
        const result = await straicoService.generateSpecificTopicQuestions('Test Student', 'Machine Learning');
        console.log('✅ Preguntas específicas generadas:', result.success);
        if (result.questions) {
            console.log('Número de preguntas:', result.questions.length);
            console.log('Tema:', result.tema);
        }
    } catch (error) {
        console.log('❌ Error en preguntas específicas:', error.message);
    }
    
    console.log('\n🧪 === RESULTADO FINAL ===');
    console.log('✅ Test completado. Revisa los resultados arriba.');
}

// Ejecutar tests
runTests().catch(console.error); 