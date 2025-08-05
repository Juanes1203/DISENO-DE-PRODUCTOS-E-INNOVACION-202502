// Script para crear la tabla de asistencia en Airtable
const AIRTABLE_TOKEN = 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da';
const BASE_ID = 'appvW207EbN1h8xhG';

async function createAttendanceTable() {
    try {
        console.log('🚀 Creando tabla de asistencia...');
        
        const tableConfig = {
            name: 'Asistencia',
            description: 'Registro de asistencia para ISIS2007',
            fields: [
                {
                    name: 'Nombre',
                    type: 'singleLineText',
                    description: 'Nombre completo del estudiante'
                },
                {
                    name: 'Fecha',
                    type: 'date',
                    description: 'Fecha de la clase',
                    options: {
                        dateFormat: {
                            name: 'local'
                        }
                    }
                },
                {
                    name: 'Estado',
                    type: 'singleSelect',
                    description: 'Estado de asistencia',
                    options: {
                        choices: [
                            { name: 'present' },
                            { name: 'absent' }
                        ]
                    }
                },
                {
                    name: 'Usuario Registro',
                    type: 'singleLineText',
                    description: 'Quién tomó la asistencia'
                },
                {
                    name: 'Rol Usuario',
                    type: 'singleLineText',
                    description: 'Rol del usuario (Profesor, Monitor)'
                },
                {
                    name: 'Timestamp',
                    type: 'dateTime',
                    description: 'Fecha y hora del registro',
                    options: {
                        dateFormat: {
                            name: 'local'
                        },
                        timeFormat: {
                            name: '24hour'
                        },
                        timeZone: 'America/Bogota'
                    }
                },
                {
                    name: 'Curso',
                    type: 'singleLineText',
                    description: 'Nombre del curso'
                }
            ]
        };
        
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tableConfig)
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log('✅ Tabla creada exitosamente:', result);
            console.log('📋 ID de la tabla:', result.id);
            return result;
        } else {
            const error = await response.text();
            console.error('❌ Error al crear tabla:', response.status, error);
            return null;
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return null;
    }
}

// Ejecutar la creación
createAttendanceTable().then(result => {
    if (result) {
        console.log('🎉 Configuración completada!');
        console.log('📝 La tabla "Asistencia" está lista para usar');
    } else {
        console.log('❌ Error en la configuración');
    }
}); 