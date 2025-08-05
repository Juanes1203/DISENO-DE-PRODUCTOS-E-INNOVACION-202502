// Servicio simplificado para interactuar con Airtable
// Tabla: Asistencia_Simple - Solo campos esenciales

class AirtableServiceSimple {
    constructor() {
        this.config = AIRTABLE_CONFIG_SIMPLE;
        this.baseURL = getAirtableURLSimple();
        this.headers = getHeadersSimple();
    }

    // Probar conexión con Airtable
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}?maxRecords=1`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                console.log('✅ Conexión exitosa con Airtable');
                return true;
            } else {
                console.error('❌ Error de conexión:', response.status);
                return false;
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error);
            return false;
        }
    }

    // Guardar asistencia de un estudiante
    async saveAttendance(student, asistio, date) {
        try {
            console.log(`📝 Guardando asistencia: ${student} - ${asistio ? 'Sí' : 'No'} - ${date}`);

            // Crear registro
            const record = createSimpleAttendanceRecord(student, date, asistio);
            
            console.log('🔍 Debug: Registro a crear:', JSON.stringify(record, null, 2));

            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    records: [record]
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Asistencia guardada exitosamente');
                console.log('📝 ID:', result.records[0].id);
                return result.records[0];
            } else {
                const errorText = await response.text();
                console.error('❌ Error al guardar asistencia:', response.status);
                console.error('❌ Detalles:', errorText);
                return null;
            }
        } catch (error) {
            console.error('❌ Error al guardar asistencia:', error);
            return null;
        }
    }

    // Buscar registro existente
    async findExistingRecord(date, student) {
        try {
            const searchParams = createSearchRecordSimple(date, student);
            const url = `${this.baseURL}?${new URLSearchParams(searchParams)}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`🔍 Buscando estudiante "${student}": ${result.records.length} registros encontrados`);
                
                if (result.records.length > 0) {
                    console.log(`✅ Estudiante "${student}" encontrado con ID: ${result.records[0].id}`);
                    return result.records[0];
                }
            }
            
            return null;
        } catch (error) {
            console.error('❌ Error al buscar registro:', error);
            return null;
        }
    }

    // Actualizar asistencia existente
    async updateAttendance(recordId, student, asistio, date) {
        try {
            const updateData = {
                fields: {
                    [this.config.FIELDS.ASISTIO]: asistio ? 'Sí' : 'No'
                }
            };

            console.log('🔍 Debug: Actualizando asistencia:', JSON.stringify(updateData, null, 2));
            
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Asistencia actualizada exitosamente');
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

    // Guardar o actualizar asistencia
    async saveOrUpdateAttendance(student, asistio, date) {
        try {
            // Buscar registro existente
            const existingRecord = await this.findExistingRecord(date, student);
            
            if (existingRecord) {
                // Actualizar registro existente
                return await this.updateAttendance(existingRecord.id, student, asistio, date);
            } else {
                // Crear nuevo registro
                return await this.saveAttendance(student, asistio, date);
            }
        } catch (error) {
            console.error('❌ Error en saveOrUpdateAttendance:', error);
            return null;
        }
    }

    // Sincronizar datos locales con Airtable
    async syncWithAirtable(localData) {
        try {
            console.log('🔄 Iniciando sincronización con Airtable...');
            console.log(`📊 Datos locales a sincronizar: ${Object.keys(localData).length} fechas`);
            
            let successCount = 0;
            let errorCount = 0;

            for (const [date, dateData] of Object.entries(localData)) {
                if (date === '_session') continue;
                
                console.log(`📅 Procesando fecha: ${date}`);
                
                if (dateData.students) {
                    for (const [student, status] of Object.entries(dateData.students)) {
                        const asistio = status === 'present';
                        console.log(`👤 Procesando estudiante: ${student} - Estado: ${asistio ? 'Sí' : 'No'}`);
                        
                        const result = await this.saveOrUpdateAttendance(student, asistio, date);
                        
                        if (result) {
                            successCount++;
                        } else {
                            errorCount++;
                            console.log(`❌ Error al actualizar ${student}`);
                        }
                    }
                }
            }

            console.log(`✅ Sincronización completada: ${successCount} exitosos, ${errorCount} errores`);
            return { success: successCount, errors: errorCount };
        } catch (error) {
            console.error('❌ Error en sincronización:', error);
            return { success: 0, errors: 1 };
        }
    }

    // Cargar datos desde Airtable
    async loadFromAirtable() {
        try {
            const response = await fetch(`${this.baseURL}?maxRecords=1000`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                const airtableData = {};

                // Convertir registros de Airtable al formato local
                result.records.forEach(record => {
                    const date = record.fields[this.config.FIELDS.FECHA];
                    const student = record.fields[this.config.FIELDS.NOMBRE];
                    const asistio = record.fields[this.config.FIELDS.ASISTIO] === 'Sí';

                    if (!airtableData[date]) {
                        airtableData[date] = { students: {} };
                    }

                    airtableData[date].students[student] = asistio ? 'present' : 'absent';
                });

                return airtableData;
            } else {
                console.error('❌ Error al cargar desde Airtable:', response.status);
                return {};
            }
        } catch (error) {
            console.error('❌ Error al cargar desde Airtable:', error);
            return {};
        }
    }
}

// Crear instancia global del servicio
const airtableServiceSimple = new AirtableServiceSimple(); 