// Servicio para interactuar con Airtable
// Incluye todas las funciones necesarias para CRUD de asistencia

class AirtableService {
    constructor() {
        this.config = AIRTABLE_CONFIG;
        this.baseURL = getAirtableURL();
        this.headers = getHeaders();
    }

    // Función para verificar conexión con Airtable
    async testConnection() {
        try {
            const response = await fetch(`${this.baseURL}?maxRecords=1`, {
                method: 'GET',
                headers: this.headers
            });
            
            if (response.ok) {
                console.log('✅ Conexión con Airtable exitosa');
                return true;
            } else {
                console.error('❌ Error de conexión con Airtable:', response.status);
                return false;
            }
        } catch (error) {
            console.error('❌ Error de conexión:', error);
            return false;
        }
    }

    // Función para guardar un registro de asistencia
    async saveAttendance(student, status, date, user, role) {
        try {
            const record = createAttendanceRecord(student, status, date, user, role);
            
            console.log('🔍 Debug: Enviando registro a Airtable:', JSON.stringify(record, null, 2));
            
            const response = await fetch(this.baseURL, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    records: [record]
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Asistencia guardada en Airtable:', result);
                return result;
            } else {
                const errorText = await response.text();
                console.error('❌ Error al guardar en Airtable:', response.status);
                console.error('❌ Detalles del error:', errorText);
                console.error('❌ URL:', this.baseURL);
                console.error('❌ Headers:', this.headers);
                console.error('❌ Data enviada:', JSON.stringify(record, null, 2));
                return null;
            }
        } catch (error) {
            console.error('❌ Error al guardar asistencia:', error);
            console.error('❌ URL:', this.baseURL);
            console.error('❌ Headers:', this.headers);
            return null;
        }
    }

    // Función para actualizar un registro existente
    async updateAttendance(recordId, student, status, date, user, role) {
        try {
            const record = createAttendanceRecord(student, status, date, user, role);
            
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify({
                    fields: record.fields
                })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Asistencia actualizada en Airtable:', result);
                return result;
            } else {
                console.error('❌ Error al actualizar en Airtable:', response.status);
                return null;
            }
        } catch (error) {
            console.error('❌ Error al actualizar asistencia:', error);
            return null;
        }
    }

    // Función para buscar registros existentes por estudiante (nombres ya pre-cargados)
    async findExistingRecord(date, student) {
        try {
            // Buscar por nombre del estudiante (sin fecha, ya que los nombres están pre-cargados)
            const searchParams = createSearchRecordByStudent(student);
            const queryString = new URLSearchParams({
                filterByFormula: searchParams.filterByFormula
            }).toString();

            const response = await fetch(`${this.baseURL}?${queryString}`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                console.log(`🔍 Buscando estudiante "${student}": ${result.records.length} registros encontrados`);
                
                if (result.records.length > 0) {
                    const existingRecord = result.records[0];
                    console.log(`✅ Estudiante "${student}" encontrado con ID: ${existingRecord.id}`);
                    return existingRecord;
                } else {
                    console.log(`❌ Estudiante "${student}" no encontrado en Airtable`);
                    return null;
                }
            } else {
                console.error('❌ Error al buscar registro del estudiante:', response.status);
                return null;
            }
        } catch (error) {
            console.error('❌ Error al buscar registro del estudiante:', error);
            return null;
        }
    }

    // Función para obtener todos los registros de una fecha
    async getAttendanceByDate(date) {
        try {
            const queryString = new URLSearchParams({
                filterByFormula: `{${this.config.FIELDS.FECHA}} = '${date}'`
            }).toString();

            const response = await fetch(`${this.baseURL}?${queryString}`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                return result.records;
            } else {
                console.error('❌ Error al obtener registros:', response.status);
                return [];
            }
        } catch (error) {
            console.error('❌ Error al obtener registros:', error);
            return [];
        }
    }

    // Función para obtener todos los registros de un estudiante
    async getAttendanceByStudent(student) {
        try {
            const queryString = new URLSearchParams({
                filterByFormula: `{${this.config.FIELDS.NOMBRE}} = '${student}'`
            }).toString();

            const response = await fetch(`${this.baseURL}?${queryString}`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                return result.records;
            } else {
                console.error('❌ Error al obtener registros del estudiante:', response.status);
                return [];
            }
        } catch (error) {
            console.error('❌ Error al obtener registros del estudiante:', error);
            return [];
        }
    }

    // Función para sincronizar datos locales con Airtable
    async syncWithAirtable(localData) {
        const syncResults = {
            success: 0,
            errors: 0,
            details: []
        };

        console.log('🔄 Iniciando sincronización con Airtable...');
        console.log('📊 Datos locales a sincronizar:', Object.keys(localData).length, 'fechas');

        for (const [date, attendance] of Object.entries(localData)) {
            if (date === '_session') continue; // Saltar metadatos
            
            console.log(`📅 Procesando fecha: ${date}`);
            
            for (const [student, status] of Object.entries(attendance)) {
                if (student === '_session') continue; // Saltar metadatos

                console.log(`👤 Procesando estudiante: ${student} - Estado: ${status}`);

                try {
                    // Buscar si ya existe el registro del estudiante (nombres pre-cargados)
                    const existingRecord = await this.findExistingRecord(date, student);
                    
                    if (existingRecord) {
                        console.log(`✅ Estudiante "${student}" encontrado en Airtable`);
                        
                        // Actualizar el registro existente con la información de asistencia
                        const updateResult = await this.updateAttendanceForDate(
                            existingRecord.id, 
                            date,
                            status, 
                            attendance._session?.user || 'unknown',
                            attendance._session?.role || 'unknown'
                        );
                        
                        if (updateResult) {
                            syncResults.success++;
                            syncResults.details.push(`✅ ${student} - ${date} actualizado`);
                            console.log(`✅ ${student} actualizado exitosamente`);
                        } else {
                            syncResults.errors++;
                            syncResults.details.push(`❌ ${student} - ${date} error al actualizar`);
                            console.log(`❌ Error al actualizar ${student}`);
                        }
                    } else {
                        console.log(`❌ Estudiante "${student}" no encontrado en Airtable. Verifica que el nombre esté correctamente escrito.`);
                        syncResults.errors++;
                        syncResults.details.push(`❌ ${student} - ${date} estudiante no encontrado en Airtable`);
                    }
                } catch (error) {
                    syncResults.errors++;
                    syncResults.details.push(`❌ ${student} - ${date} error: ${error.message}`);
                    console.error(`❌ Error procesando ${student}:`, error);
                }
            }
        }

        console.log('📊 Resumen de sincronización:', syncResults);
        return syncResults;
    }

    // Nueva función para actualizar asistencia para una fecha específica
    async updateAttendanceForDate(recordId, date, status, user, role) {
        try {
            const updateData = {
                fields: {
                    [this.config.FIELDS.FECHA]: date,
                    [this.config.FIELDS.ESTADO]: status,
                    [this.config.FIELDS.USUARIO_REGISTRO]: user,
                    [this.config.FIELDS.ROL_USUARIO]: role,
                    [this.config.FIELDS.TIMESTAMP]: new Date().toISOString(),
                    [this.config.FIELDS.CURSO]: 'ISIS2007 - Diseño de Productos e Innovación en TI'
                }
            };

            console.log('🔍 Debug: Actualizando asistencia para fecha:', JSON.stringify(updateData, null, 2));
            
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Asistencia actualizada en Airtable:', result);
                return result;
            } else {
                const errorText = await response.text();
                console.error('❌ Error al actualizar asistencia en Airtable:', response.status);
                console.error('❌ Detalles del error:', errorText);
                console.error('❌ URL:', `${this.baseURL}/${recordId}`);
                console.error('❌ Data enviada:', JSON.stringify(updateData, null, 2));
                return null;
            }
        } catch (error) {
            console.error('❌ Error al actualizar asistencia:', error);
            return null;
        }
    }

    // Función para actualizar solo el estado de asistencia (mantener para compatibilidad)
    async updateAttendanceStatus(recordId, status, user, role) {
        try {
            const updateData = {
                fields: {
                    [this.config.FIELDS.ESTADO]: status,
                    [this.config.FIELDS.USUARIO_REGISTRO]: user,
                    [this.config.FIELDS.ROL_USUARIO]: role,
                    [this.config.FIELDS.TIMESTAMP]: new Date().toISOString()
                }
            };

            console.log('🔍 Debug: Actualizando estado:', JSON.stringify(updateData, null, 2));
            
            const response = await fetch(`${this.baseURL}/${recordId}`, {
                method: 'PATCH',
                headers: this.headers,
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Estado de asistencia actualizado en Airtable:', result);
                return result;
            } else {
                const errorText = await response.text();
                console.error('❌ Error al actualizar estado en Airtable:', response.status);
                console.error('❌ Detalles del error:', errorText);
                console.error('❌ URL:', `${this.baseURL}/${recordId}`);
                console.error('❌ Data enviada:', JSON.stringify(updateData, null, 2));
                return null;
            }
        } catch (error) {
            console.error('❌ Error al actualizar estado de asistencia:', error);
            return null;
        }
    }

    // Función para cargar datos desde Airtable
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
                    const status = record.fields[this.config.FIELDS.ESTADO];

                    if (!airtableData[date]) {
                        airtableData[date] = {};
                    }

                    airtableData[date][student] = status;
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
const airtableService = new AirtableService(); 