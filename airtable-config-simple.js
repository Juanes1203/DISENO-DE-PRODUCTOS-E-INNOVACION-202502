// Configuración simplificada para integración con Airtable
// Tabla nueva con solo campos esenciales

const AIRTABLE_CONFIG_SIMPLE = {
    // Tu API Key de Airtable
    API_KEY: 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
    
    // ID de tu base de datos en Airtable
    BASE_ID: 'appvW207EbN1h8xhG',
    
    // Nombre de la nueva tabla simplificada
    TABLE_NAME: 'Asistencia_Simple',
    
    // URLs de la API
    BASE_URL: 'https://api.airtable.com/v0',
    
    // Configuración de la tabla - estructura simplificada
    FIELDS: {
        NOMBRE: 'Nombre',
        FECHA: 'Fecha',
        ASISTIO: 'Asistió' // 'Sí' o 'No'
    }
};

// Lista completa de estudiantes
const ESTUDIANTES = [
    'Alcala Gonzalez, Sofia',
    'Aristizabal Garcia, Gabriel',
    'Avila Nivia, Juan Sebastian',
    'Benavides Rocha, Diego Juan Vicente',
    'Botero Ruiz, Andres',
    'Briceño Estupiñan, David Alejandro',
    'Briceño Toro, Juan Eduardo',
    'Carrillo, Maria Alejandra',
    'Castellanos Ribero, Pablo',
    'Castro, Anais Maria',
    'Cespedes Cortes, Yefran David',
    'Cuervo Ortiz, Juan David',
    'Davila Betancourt, Andrea',
    'Diez Leal, Samuel',
    'Escobar Pineda, Samuel Alejandro',
    'Franco Pardo, Yhojan Alejandro',
    'Garrido Arroyo, Esteban',
    'Gonzalez Bermudez, Julian David',
    'Guiza Melo, Laura Valentina',
    'Hernandez Paez, Juan Felipe',
    'Jimenez Tovar, Laura Valentina',
    'Leschhorn, Martin',
    'Maldonado Manrique, Juan Sebastian',
    'Muñoz Estevez, Laura Valentina',
    'Niño Mendez, Joel David',
    'Ochoa Bejarano, Juan Felipe',
    'Pereira Avila, Andres Felipe',
    'Perez Diaz, Juan David',
    'Pineda Cano, Jeronimo Arnulfo',
    'Pinto, Julian Rafael',
    'Polania Arias, Angie Katherine',
    'Quiroz Pintor, Santiago Alberto',
    'Ramirez Aleman, Julian Roberto',
    'Reyes Romero, Juan Pablo',
    'Rodriguez Pinto, Gabriel Enrique',
    'Roncancio Camacho, Juan David',
    'Ross Aguirre, Joshua John',
    'Sanabria Salazar, Maria Alejandra',
    'Sanmiguel Losada, Felipe',
    'Sarmiento Gutierrez, Laura Sofia',
    'Serrano Arango, Amelia',
    'Velasquez Delgado, Tomas Emilio',
    'Vides Vivero, Alejandro Enrique',
    'Zambrano Burbano, Mateo'
];

// Función para obtener la URL completa de la API
function getAirtableURLSimple() {
    return `${AIRTABLE_CONFIG_SIMPLE.BASE_URL}/${AIRTABLE_CONFIG_SIMPLE.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG_SIMPLE.TABLE_NAME)}`;
}

// Función para crear headers de autenticación
function getHeadersSimple() {
    return {
        'Authorization': `Bearer ${AIRTABLE_CONFIG_SIMPLE.API_KEY}`,
        'Content-Type': 'application/json'
    };
}

// Función para crear un registro de asistencia simplificado
function createSimpleAttendanceRecord(student, date, asistio) {
    return {
        fields: {
            [AIRTABLE_CONFIG_SIMPLE.FIELDS.NOMBRE]: student,
            [AIRTABLE_CONFIG_SIMPLE.FIELDS.FECHA]: date,
            [AIRTABLE_CONFIG_SIMPLE.FIELDS.ASISTIO]: asistio ? 'Sí' : 'No'
        }
    };
}

// Función para buscar registros existentes
function createSearchRecordSimple(date, student) {
    return {
        filterByFormula: `AND({${AIRTABLE_CONFIG_SIMPLE.FIELDS.FECHA}} = '${date}', {${AIRTABLE_CONFIG_SIMPLE.FIELDS.NOMBRE}} = '${student}')`
    };
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRTABLE_CONFIG_SIMPLE,
        ESTUDIANTES,
        getAirtableURLSimple,
        getHeadersSimple,
        createSimpleAttendanceRecord,
        createSearchRecordSimple
    };
} 