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
                console.error('❌ Error al guardar en Airtable:', response.status);
                return null;
            }
        } catch (error) {
            console.error('❌ Error al guardar asistencia:', error);
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

    // Función para buscar registros existentes por fecha y estudiante
    async findExistingRecord(date, student) {
        try {
            const searchParams = createSearchRecord(date, student);
            const queryString = new URLSearchParams({
                filterByFormula: searchParams.filterByFormula
            }).toString();

            const response = await fetch(`${this.baseURL}?${queryString}`, {
                method: 'GET',
                headers: this.headers
            });

            if (response.ok) {
                const result = await response.json();
                return result.records.length > 0 ? result.records[0] : null;
            } else {
                console.error('❌ Error al buscar registro:', response.status);
                return null;
            }
        } catch (error) {
            console.error('❌ Error al buscar registro:', error);
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

        for (const [date, attendance] of Object.entries(localData)) {
            for (const [student, status] of Object.entries(attendance)) {
                if (student === '_session') continue; // Saltar metadatos

                try {
                    // Buscar si ya existe el registro
                    const existingRecord = await this.findExistingRecord(date, student);
                    
                    if (existingRecord) {
                        // Actualizar registro existente
                        const result = await this.updateAttendance(
                            existingRecord.id, 
                            student, 
                            status, 
                            date, 
                            attendance._session?.user || 'unknown',
                            attendance._session?.role || 'unknown'
                        );
                        
                        if (result) {
                            syncResults.success++;
                            syncResults.details.push(`✅ ${student} - ${date} actualizado`);
                        } else {
                            syncResults.errors++;
                            syncResults.details.push(`❌ ${student} - ${date} error al actualizar`);
                        }
                    } else {
                        // Crear nuevo registro
                        const result = await this.saveAttendance(
                            student, 
                            status, 
                            date, 
                            attendance._session?.user || 'unknown',
                            attendance._session?.role || 'unknown'
                        );
                        
                        if (result) {
                            syncResults.success++;
                            syncResults.details.push(`✅ ${student} - ${date} creado`);
                        } else {
                            syncResults.errors++;
                            syncResults.details.push(`❌ ${student} - ${date} error al crear`);
                        }
                    }
                } catch (error) {
                    syncResults.errors++;
                    syncResults.details.push(`❌ ${student} - ${date} error: ${error.message}`);
                }
            }
        }

        return syncResults;
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