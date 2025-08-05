// 🔐 CONFIGURACIÓN SEGURA - CREDENCIALES
// Configuración que funciona en navegador (GitHub Pages)

const CONFIG = {
    // Credenciales de usuarios - SEGURAS Y FUNCIONALES
    USERS: {
        'prof.arturo.gomez': { 
            password: 'Arturo2025#Uniandes$Profesor!', 
            role: 'Profesor Principal' 
        },
        'monitor.juanes.rodriguez': { 
            password: 'Juanes2025#Monitor$Uniandes!', 
            role: 'Monitor' 
        },
        'monitor.catalina.martinez': { 
            password: 'Catalina2025#Monitor$Uniandes!', 
            role: 'Monitor' 
        }
    },
    
    // Configuración de Airtable
    AIRTABLE: {
        API_KEY: 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
        BASE_ID: 'appYourBaseID',
        TABLE_NAME: 'Asistencia'
    },
    
    // Configuración de STRAICO AI
    STRAICO: {
        API_KEY: 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7'
    }
};

// Exportar configuración para navegador
window.CONFIG = CONFIG;

// ⚠️ NOTA: Para mayor seguridad en producción, considerar:
// 1. Usar un backend con autenticación
// 2. Implementar JWT tokens
// 3. Usar servicios de autenticación externos 