// Script para crear una nueva tabla de asistencia diaria
// Esta tabla será específica para registrar asistencia por día

const AIRTABLE_CONFIG = {
    API_KEY: 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da',
    BASE_ID: 'appvW207EbN1h8xhG',
    TABLE_NAME: 'Asistencia_Diaria',
    BASE_URL: 'https://api.airtable.com/v0'
};

// Función para obtener headers de autenticación
function getHeaders() {
    return {
        'Authorization': `Bearer ${AIRTABLE_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
    };
}

// Función para crear la tabla de asistencia diaria
async function createDailyAttendanceTable() {
    try {
        console.log('🔄 Creando tabla de asistencia diaria en Airtable...');
        
        const tableSchema = {
            name: AIRTABLE_CONFIG.TABLE_NAME,
            description: 'Tabla para registrar asistencia diaria de estudiantes',
            fields: [
                {
                    name: 'Estudiante',
                    type: 'singleLineText',
                    description: 'Nombre completo del estudiante'
                },
                {
                    name: 'Fecha',
                    type: 'date',
                    description: 'Fecha de la clase'
                },
                {
                    name: 'Asistio',
                    type: 'singleSelect',
                    options: {
                        choices: [
                            { name: 'Sí' },
                            { name: 'No' }
                        ]
                    },
                    description: '¿El estudiante asistió a clase?'
                },
                {
                    name: 'Registrado_Por',
                    type: 'singleLineText',
                    description: 'Usuario que registró la asistencia'
                },
                {
                    name: 'Timestamp',
                    type: 'dateTime',
                    description: 'Fecha y hora del registro'
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
            console.log('✅ Tabla de asistencia diaria creada exitosamente:', result);
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

// Función para registrar asistencia simple
async function registerAttendance(student, date, attended, user) {
    try {
        const record = {
            fields: {
                'Estudiante': student,
                'Fecha': date,
                'Asistio': attended ? 'Sí' : 'No',
                'Registrado_Por': user,
                'Timestamp': new Date().toISOString()
            }
        };

        console.log('📝 Registrando asistencia:', JSON.stringify(record, null, 2));
        
        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG.TABLE_NAME)}`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({
                records: [record]
            })
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Asistencia registrada exitosamente:', result);
            return result;
        } else {
            const errorText = await response.text();
            console.error('❌ Error al registrar asistencia:', response.status);
            console.error('❌ Detalles:', errorText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error al registrar asistencia:', error);
        return null;
    }
}

// Función para verificar si ya existe un registro para esa fecha y estudiante
async function checkExistingAttendance(student, date) {
    try {
        const filterFormula = `AND({Estudiante} = '${student}', {Fecha} = '${date}')`;
        const queryString = new URLSearchParams({
            filterByFormula: filterFormula
        }).toString();

        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG.TABLE_NAME)}?${queryString}`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const result = await response.json();
            return result.records.length > 0 ? result.records[0] : null;
        } else {
            console.error('❌ Error al verificar asistencia existente:', response.status);
            return null;
        }
    } catch (error) {
        console.error('❌ Error al verificar asistencia existente:', error);
        return null;
    }
}

// Función para actualizar asistencia existente
async function updateAttendance(recordId, attended, user) {
    try {
        const updateData = {
            fields: {
                'Asistio': attended ? 'Sí' : 'No',
                'Registrado_Por': user,
                'Timestamp': new Date().toISOString()
            }
        };

        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG.TABLE_NAME)}/${recordId}`, {
            method: 'PATCH',
            headers: getHeaders(),
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            const result = await response.json();
            console.log('✅ Asistencia actualizada exitosamente:', result);
            return result;
        } else {
            const errorText = await response.text();
            console.error('❌ Error al actualizar asistencia:', response.status);
            console.error('❌ Detalles:', errorText);
            return null;
        }
    } catch (error) {
        console.error('❌ Error al actualizar asistencia:', error);
        return null;
    }
}

// Función principal para registrar asistencia (crear o actualizar)
async function registerOrUpdateAttendance(student, date, attended, user) {
    try {
        console.log(`📝 Procesando asistencia: ${student} - ${date} - ${attended ? 'Presente' : 'Ausente'}`);
        
        // Verificar si ya existe un registro
        const existingRecord = await checkExistingAttendance(student, date);
        
        if (existingRecord) {
            console.log('✅ Registro existente encontrado, actualizando...');
            return await updateAttendance(existingRecord.id, attended, user);
        } else {
            console.log('🆕 Creando nuevo registro...');
            return await registerAttendance(student, date, attended, user);
        }
    } catch (error) {
        console.error('❌ Error al procesar asistencia:', error);
        return null;
    }
}

// Función para obtener asistencia por fecha
async function getAttendanceByDate(date) {
    try {
        const filterFormula = `{Fecha} = '${date}'`;
        const queryString = new URLSearchParams({
            filterByFormula: filterFormula
        }).toString();

        const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_CONFIG.BASE_ID}/${encodeURIComponent(AIRTABLE_CONFIG.TABLE_NAME)}?${queryString}`, {
            method: 'GET',
            headers: getHeaders()
        });

        if (response.ok) {
            const result = await response.json();
            console.log(`📊 Asistencia para ${date}: ${result.records.length} registros`);
            return result.records;
        } else {
            console.error('❌ Error al obtener asistencia:', response.status);
            return [];
        }
    } catch (error) {
        console.error('❌ Error al obtener asistencia:', error);
        return [];
    }
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        createDailyAttendanceTable,
        registerOrUpdateAttendance,
        getAttendanceByDate,
        checkExistingAttendance,
        registerAttendance,
        updateAttendance
    };
}

// Si se ejecuta en el navegador, agregar al objeto global
if (typeof window !== 'undefined') {
    window.DailyAttendanceService = {
        createDailyAttendanceTable,
        registerOrUpdateAttendance,
        getAttendanceByDate,
        checkExistingAttendance,
        registerAttendance,
        updateAttendance
    };
} 