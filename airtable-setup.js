// Script para configurar automáticamente la tabla de Airtable
// Este script creará la tabla "Asistencia" con todos los campos necesarios

const AIRTABLE_CONFIG = {
    API_KEY: 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
    BASE_ID: 'appvW207EbN1h8xhG',
    TABLE_NAME: 'Asistencia',
    BASE_URL: 'https://api.airtable.com/v0'
};

// Función para obtener headers de autenticación
function getHeaders() {
    return {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
    };
}

// Función para crear la tabla de asistencia
async function createAttendanceTable() {
    try {
        console.log('🔄 Creando tabla de asistencia en Airtable...');
        
        const tableSchema = {
            name: AIRTABLE_CONFIG.TABLE_NAME,
            description: 'Tabla para registrar asistencia de estudiantes',
            fields: [
                {
                    name: 'Nombre',
                    type: 'singleLineText',
                    description: 'Nombre completo del estudiante'
                },
                {
                    name: 'Fecha',
                    type: 'date',
                    description: 'Fecha de la clase'
                },
                {
                    name: 'Estado',
                    type: 'singleSelect',
                    options: {
                        choices: [
                            { name: 'present' },
                            { name: 'absent' }
                        ]
                    },
                    description: 'Estado de asistencia del estudiante'
                },
                {
                    name: 'Usuario Registro',
                    type: 'singleLineText',
                    description: 'Usuario que registró la asistencia'
                },
                {
                    name: 'Rol Usuario',
                    type: 'singleLineText',
                    description: 'Rol del usuario que registró'
                },
                {
                    name: 'Timestamp',
                    type: 'dateTime',
                    description: 'Fecha y hora del registro'
                },
                {
                    name: 'Curso',
                    type: 'singleLineText',
                    description: 'Nombre del curso'
                }
            ]
        };

        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_CONFIG.BASE_ID}/tables`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(tableSchema)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Tabla creada exitosamente:', result);
            return result;
        } else {
            const errorText = await response.text();
            console.error('❌ Error al crear tabla:', response.status, errorText);
            
            // Si la tabla ya existe, intentar obtener su información
            if (response.status === 422) {
                console.log('🔄 La tabla ya existe, obteniendo información...');
                return await getTableInfo();
            }
            
            return null;
        }
    } catch (error) {
        console.error('❌ Error al crear tabla:', error);
        return null;
    }
}

// Función para obtener información de la tabla existente
async function getTableInfo() {
    try {
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_CONFIG.BASE_ID}/tables`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const result = await response.json();
            const attendanceTable = result.tables.find(table => table.name === AIRTABLE_CONFIG.TABLE_NAME);
            
            if (attendanceTable) {
                console.log('✅ Tabla encontrada:', attendanceTable);
                return attendanceTable;
            } else {
                console.log('❌ Tabla no encontrada');
                return null;
            }
        } else {
            console.error('❌ Error al obtener información de tablas:', response.status);
            return null;
        }
    } catch (error) {
        console.error('❌ Error al obtener información de tablas:', error);
        return null;
    }
}

// Función para verificar y corregir la estructura de la tabla
async function verifyAndFixTableStructure() {
    try {
        console.log('🔍 Verificando estructura de la tabla...');
        
        const tableInfo = await getTableInfo();
        if (!tableInfo) {
            console.log('🔄 Creando tabla...');
            return await createAttendanceTable();
        }

        // Verificar que todos los campos necesarios existan
        const requiredFields = [
            'Nombre', 'Fecha', 'Estado', 'Usuario Registro', 
            'Rol Usuario', 'Timestamp', 'Curso'
        ];

        const existingFields = tableInfo.fields.map(field => field.name);
        const missingFields = requiredFields.filter(field => !existingFields.includes(field));

        if (missingFields.length > 0) {
            console.log('⚠️ Campos faltantes:', missingFields);
            console.log('🔄 Agregando campos faltantes...');
            
            // Agregar campos faltantes
            for (const fieldName of missingFields) {
                await addFieldToTable(fieldName);
            }
        } else {
            console.log('✅ Estructura de tabla correcta');
        }

        return tableInfo;
    } catch (error) {
        console.error('❌ Error al verificar estructura:', error);
        return null;
    }
}

// Función para agregar un campo a la tabla
async function addFieldToTable(fieldName) {
    try {
        const fieldSchema = {
            name: fieldName,
            type: 'singleLineText'
        };

        // Ajustar tipo según el campo
        if (fieldName === 'Fecha') {
            fieldSchema.type = 'date';
        } else if (fieldName === 'Estado') {
            fieldSchema.type = 'singleSelect';
            fieldSchema.options = {
                choices: [
                    { name: 'present' },
                    { name: 'absent' }
                ]
            };
        } else if (fieldName === 'Timestamp') {
            fieldSchema.type = 'dateTime';
        }

        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_CONFIG.BASE_ID}/tables/${AIRTABLE_CONFIG.TABLE_NAME}/fields`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(fieldSchema)
        });

        if (response.ok) {
            console.log(`✅ Campo "${fieldName}" agregado exitosamente`);
            return true;
        } else {
            console.error(`❌ Error al agregar campo "${fieldName}":`, response.status);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error al agregar campo "${fieldName}":`, error);
        return false;
    }
}

// Función principal para configurar todo
async function setupAirtableTable() {
    console.log('🚀 Iniciando configuración de Airtable...');
    
    try {
        // Verificar conexión
        const connectionTest = await fetch(`https://api.airtable.com/v0/meta/bases/${AIRTABLE_CONFIG.BASE_ID}`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (!connectionTest.ok) {
            console.error('❌ Error de conexión con Airtable. Verifica tu API key y Base ID.');
            return false;
        }

        console.log('✅ Conexión con Airtable exitosa');

        // Verificar y configurar tabla
        const tableResult = await verifyAndFixTableStructure();
        
        if (tableResult) {
            console.log('✅ Configuración completada exitosamente');
            return true;
        } else {
            console.error('❌ Error en la configuración');
            return false;
        }
    } catch (error) {
        console.error('❌ Error durante la configuración:', error);
        return false;
    }
}

// Exportar funciones si se ejecuta en Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupAirtableTable,
        createAttendanceTable,
        verifyAndFixTableStructure,
        getTableInfo
    };
}

// Si se ejecuta en el navegador, agregar al objeto global
if (typeof window !== 'undefined') {
    window.AirtableSetup = {
        setupAirtableTable,
        createAttendanceTable,
        verifyAndFixTableStructure,
        getTableInfo
    };
} 