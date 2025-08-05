const XLSX = require('xlsx');
const fs = require('fs');

function extractStudentNames() {
    try {
        // Leer el archivo Excel
        const workbook = XLSX.readFile('Listado Estudiantes .xlsx');
        
        // Obtener la primera hoja
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        
        // Convertir a JSON
        const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        
        console.log('📊 Contenido del archivo Excel:');
        console.log('================================');
        
        // Mostrar las primeras filas para entender la estructura
        data.slice(0, 10).forEach((row, index) => {
            console.log(`Fila ${index + 1}:`, row);
        });
        
        // Extraer nombres de estudiantes (asumiendo que están en la primera columna)
        const students = [];
        data.forEach((row, index) => {
            if (row && row[0] && typeof row[0] === 'string' && row[0].trim()) {
                // Filtrar encabezados y filas vacías
                const name = row[0].trim();
                if (name && !name.toLowerCase().includes('nombre') && !name.toLowerCase().includes('estudiante')) {
                    students.push(name);
                }
            }
        });
        
        console.log('\n🎯 Estudiantes extraídos:');
        console.log('========================');
        students.forEach((student, index) => {
            console.log(`${index + 1}. ${student}`);
        });
        
        console.log(`\n📈 Total de estudiantes: ${students.length}`);
        
        // Generar el código JavaScript para la ruleta
        const jsCode = `const students = [\n    '${students.join("',\n    '")}'\n];`;
        
        console.log('\n📝 Código JavaScript generado:');
        console.log('==============================');
        console.log(jsCode);
        
        return students;
        
    } catch (error) {
        console.error('❌ Error al leer el archivo Excel:', error.message);
        return [];
    }
}

// Ejecutar la extracción
extractStudentNames(); 