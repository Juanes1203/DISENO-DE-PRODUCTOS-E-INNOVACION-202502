// Configuración para integración con Airtable
// Reemplaza estos valores con tu información real de Airtable

const AIRTABLE_CONFIG = {
    // Tu API Key de Airtable
    API_KEY: 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
    
    // ID de tu base de datos en Airtable
    BASE_ID: 'appvW207EbN1h8xhG',
    
    // Nombre de la tabla donde se guardarán los datos de asistencia
    TABLE_NAME: 'Asistencia',
    
    // URLs de la API
    BASE_URL: 'https://api.airtable.com/v0',
    
    // Configuración de la tabla - adaptada a tu estructura actual
    FIELDS: {
        NOMBRE: 'Nombre', // Campo existente con nombres de estudiantes
        FECHA: 'Fecha',
        ESTADO: 'Estado', // 'present' o 'absent'
        USUARIO_REGISTRO: 'Usuario Registro',
        ROL_USUARIO: 'Rol Usuario',
        TIMESTAMP: 'Timestamp',
        CURSO: 'Curso'
    }
};

// Función para obtener la URL completa de la API
function getAirtableURL() {
    return `${AIRTABLE_CONFIG.BASE_URL}/${AIRTABLE_CONFIG.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG.TABLE_NAME)}`;
}

// Función para crear headers de autenticación
function getHeaders() {
    return {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
    };
}

// Función para crear un registro de asistencia
function createAttendanceRecord(student, status, date, user, role) {
    return {
        fields: {
            [AIRTABLE_CONFIG.FIELDS.NOMBRE]: student,
            [AIRTABLE_CONFIG.FIELDS.FECHA]: date,
            [AIRTABLE_CONFIG.FIELDS.ESTADO]: status,
            [AIRTABLE_CONFIG.FIELDS.USUARIO_REGISTRO]: user,
            [AIRTABLE_CONFIG.FIELDS.ROL_USUARIO]: role,
            [AIRTABLE_CONFIG.FIELDS.TIMESTAMP]: new Date().toISOString().replace('Z', ''),
            [AIRTABLE_CONFIG.FIELDS.CURSO]: 'ISIS2007 - Diseño de Productos e Innovación en TI'
        }
    };
}

// Función para buscar registros existentes
function createSearchRecord(date, student) {
    return {
        filterByFormula: `AND({${AIRTABLE_CONFIG.FIELDS.FECHA}} = '${date}', {${AIRTABLE_CONFIG.FIELDS.NOMBRE}} = '${student}')`
    };
}

// Función para buscar registros por nombre del estudiante (nombres pre-cargados)
function createSearchRecordByStudent(student) {
    return {
        filterByFormula: `{${AIRTABLE_CONFIG.FIELDS.NOMBRE}} = '${student}'`
    };
}

// Exportar configuración
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AIRTABLE_CONFIG,
        getAirtableURL,
        getHeaders,
        createAttendanceRecord,
        createSearchRecord,
        createSearchRecordByStudent
    };
} 