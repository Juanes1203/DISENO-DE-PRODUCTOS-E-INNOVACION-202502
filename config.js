// 🔐 CONFIGURACIÓN SEGURA - CREDENCIALES
// Este archivo debe ser agregado al .gitignore para mantener las credenciales seguras

const CONFIG = {
    // Variables de entorno para credenciales
    USERS: {
        'prof.arturo.gomez': { 
            password: process.env.ARTURO_PASSWORD || 'Arturo2025#Uniandes$Profesor!', 
            role: 'Profesor Principal' 
        },
        'monitor.juanes.rodriguez': { 
            password: process.env.JUANES_PASSWORD || 'Juanes2025#Monitor$Uniandes!', 
            role: 'Monitor' 
        },
        'monitor.catalina.martinez': { 
            password: process.env.CATALINA_PASSWORD || 'Catalina2025#Monitor$Uniandes!', 
            role: 'Monitor' 
        }
    },
    
    // Configuración de Airtable
    AIRTABLE: {
        API_KEY: process.env.AIRTABLE_API_KEY || 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
        BASE_ID: process.env.AIRTABLE_BASE_ID || 'appYourBaseID',
        TABLE_NAME: process.env.AIRTABLE_TABLE_NAME || 'Asistencia'
    },
    
    // Configuración de STRAICO AI
    STRAICO: {
        API_KEY: process.env.STRAICO_API_KEY || 'Cf-Pv8Guv2e04tpPbfPWDZ9779KKfjkRMEhQQbkYw7gIo1Dhtb7'
    }
};

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    // Para uso en navegador
    window.CONFIG = CONFIG;
} 