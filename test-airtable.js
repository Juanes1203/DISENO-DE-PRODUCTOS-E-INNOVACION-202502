// Script de prueba para verificar la integración con Airtable
const AIRTABLE_TOKEN = 'patLHsooZ8NZ5iREL.d4df11c0c687acbaefb084cae8fc10e04b5c51a52e80b73cce0a38900890b8da';
const BASE_ID = 'appvW207EbN1h8xhG';
const TABLE_NAME = 'Asistencia';

async function testAirtableConnection() {
    try {
        console.log('🧪 Probando conexión con Airtable...');
        
        // 1. Probar conexión básica
        const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}?maxRecords=1`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log('✅ Conexión exitosa con Airtable');
            
            // 2. Probar crear un registro de prueba
            const testRecord = {
                records: [{
                    fields: {
                        'Nombre': 'Estudiante de Prueba',
                        'Fecha': '2025-08-06',
                        'Estado': 'present',
                        'Usuario Registro': 'arturo',
                        'Rol Usuario': 'Profesor Principal',
                        'Timestamp': new Date().toISOString(),
                        'Curso': 'ISIS2007 - Diseño de Productos e Innovación en TI'
                    }
                }]
            };
            
            const createResponse = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(testRecord)
            });
            
            if (createResponse.ok) {
                const result = await createResponse.json();
                console.log('✅ Registro de prueba creado exitosamente');
                console.log('📋 ID del registro:', result.records[0].id);
                
                // 3. Probar leer el registro creado
                const readResponse = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${result.records[0].id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (readResponse.ok) {
                    const readResult = await readResponse.json();
                    console.log('✅ Lectura de registro exitosa');
                    console.log('📊 Datos del registro:', readResult.fields);
                } else {
                    console.log('❌ Error al leer registro');
                }
                
                // 4. Eliminar el registro de prueba
                const deleteResponse = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}/${result.records[0].id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (deleteResponse.ok) {
                    console.log('✅ Registro de prueba eliminado');
                } else {
                    console.log('⚠️ No se pudo eliminar el registro de prueba');
                }
                
            } else {
                const error = await createResponse.text();
                console.error('❌ Error al crear registro de prueba:', createResponse.status, error);
            }
            
        } else {
            console.error('❌ Error de conexión:', response.status);
        }
        
    } catch (error) {
        console.error('❌ Error de conexión:', error);
    }
}

// Ejecutar prueba
testAirtableConnection().then(() => {
    console.log('🎉 Prueba completada');
}).catch(console.error); 