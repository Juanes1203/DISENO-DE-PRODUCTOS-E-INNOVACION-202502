// Script para configurar automáticamente Airtable
// Este script detectará el Base ID y configurará los campos necesarios

const AIRTABLE_TOKEN = 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da';

// Función para obtener las bases de datos disponibles
async function getBases() {
    try {
        const response = await fetch('https://api.airtable.com/v0/meta/bases', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Bases de datos disponibles:', data);
            return data.bases;
        } else {
            console.error('❌ Error al obtener bases:', response.status);
            return [];
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return [];
    }
}

// Función para obtener las tablas de una base
async function getTables(baseId) {
    try {
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            console.log('✅ Tablas disponibles:', data);
            return data.tables;
        } else {
            console.error('❌ Error al obtener tablas:', response.status);
            return [];
        }
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        return [];
    }
}

// Función para configurar automáticamente la tabla de asistencia
async function setupAttendanceTable(baseId, tableName) {
    try {
        // Primero, obtener la estructura actual de la tabla
        const tables = await getTables(baseId);
        const attendanceTable = tables.find(table => table.name === tableName);
        
        if (!attendanceTable) {
            console.log('❌ No se encontró la tabla "Asistencia"');
            return false;
        }

        console.log('✅ Tabla encontrada:', attendanceTable);
        
        // Verificar si ya tiene los campos necesarios
        const existingFields = attendanceTable.fields.map(field => field.name);
        console.log('📋 Campos existentes:', existingFields);
        
        // Campos que necesitamos
        const requiredFields = [
            'Fecha',
            'Estado',
            'Usuario Registro',
            'Rol Usuario',
            'Timestamp',
            'Curso'
        ];
        
        // Verificar qué campos faltan
        const missingFields = requiredFields.filter(field => !existingFields.includes(field));
        
        if (missingFields.length === 0) {
            console.log('✅ Todos los campos necesarios ya existen');
            return true;
        }
        
        console.log('📝 Campos que faltan:', missingFields);
        
        // Crear los campos faltantes
        const fieldUpdates = missingFields.map(fieldName => {
            let fieldConfig = {
                name: fieldName,
                type: 'singleLineText'
            };
            
            // Configuraciones específicas por campo
            switch (fieldName) {
                case 'Fecha':
                    fieldConfig.type = 'date';
                    break;
                case 'Estado':
                    fieldConfig.type = 'singleSelect';
                    fieldConfig.options = {
                        choices: [
                            { name: 'present' },
                            { name: 'absent' }
                        ]
                    };
                    break;
                case 'Timestamp':
                    fieldConfig.type = 'dateTime';
                    break;
            }
            
            return fieldConfig;
        });
        
        console.log('🔧 Configurando campos:', fieldUpdates);
        
        // Actualizar la tabla con los nuevos campos
        const response = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables/${attendanceTable.id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                fields: fieldUpdates
            })
        });
        
        if (response.ok) {
            console.log('✅ Campos agregados exitosamente');
            return true;
        } else {
            console.error('❌ Error al agregar campos:', response.status);
            return false;
        }
        
    } catch (error) {
        console.error('❌ Error al configurar tabla:', error);
        return false;
    }
}

// Función principal para configurar todo
async function setupAirtable() {
    console.log('🚀 Iniciando configuración de Airtable...');
    
    // 1. Obtener bases de datos
    const bases = await getBases();
    
    if (bases.length === 0) {
        console.log('❌ No se encontraron bases de datos');
        return;
    }
    
    console.log('📋 Bases disponibles:');
    bases.forEach(base => {
        console.log(`- ${base.name} (ID: ${base.id})`);
    });
    
    // 2. Buscar la base que contiene la tabla de asistencia
    let targetBase = null;
    
    for (const base of bases) {
        const tables = await getTables(base.id);
        const hasAttendanceTable = tables.some(table => 
            table.name.toLowerCase().includes('asistencia') || 
            table.name.toLowerCase().includes('attendance')
        );
        
        if (hasAttendanceTable) {
            targetBase = base;
            console.log(`✅ Base encontrada: ${base.name} (${base.id})`);
            break;
        }
    }
    
    if (!targetBase) {
        console.log('❌ No se encontró una base con tabla de asistencia');
        console.log('💡 Crea una tabla llamada "Asistencia" en cualquiera de tus bases');
        return;
    }
    
    // 3. Configurar la tabla
    const success = await setupAttendanceTable(targetBase.id, 'Asistencia');
    
    if (success) {
        console.log('✅ Configuración completada exitosamente');
        console.log('📝 Actualiza airtable-config.js con:');
        console.log(`BASE_ID: '${targetBase.id}'`);
    } else {
        console.log('❌ Error en la configuración');
    }
}

// Ejecutar configuración si se llama directamente
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupAirtable,
        getBases,
        getTables,
        setupAttendanceTable
    };
} else {
    // Si se ejecuta en el navegador
    window.setupAirtable = setupAirtable;
} 