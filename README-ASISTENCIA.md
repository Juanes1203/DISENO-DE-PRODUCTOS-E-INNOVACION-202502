# 📊 Sistema de Asistencia ISIS2007 - Documentación

## 🔐 **Autenticación y Seguridad**

### **Credenciales de Acceso:**
- **Profesor Principal:** `arturo` / `Arturo2025#Uniandes$Profesor!`
- **Monitor Juanes:** `juanes` / `Juanes2025#Monitor$Uniandes!`
- **Monitor Catalina:** `catalina` / `Catalina2025#Monitor$Uniandes!`

### **Características de Seguridad:**
- ✅ Contraseñas fuertes con mayúsculas, números y símbolos
- ✅ Acceso restringido solo a profesores y monitores
- ✅ Registro de quién tomó la asistencia
- ✅ Sesiones con logout automático

---

## 💾 **Almacenamiento de Datos**

### **¿Cómo se guardan los datos?**

1. **localStorage del Navegador:**
   ```javascript
   // Los datos se guardan automáticamente en el navegador
   localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
   ```

2. **Estructura de Datos:**
   ```json
   {
     "2025-08-06": {
       "Alcala Gonzalez, Sofia": "present",
       "Aristizabal Garcia, Gabriel": "absent",
       "_session": {
         "user": "arturo",
         "role": "Profesor Principal",
         "timestamp": "2025-08-06T10:30:00.000Z"
       }
     },
     "2025-08-13": {
       // ... más datos de asistencia
     }
   }
   ```

3. **Persistencia de Datos:**
   - ✅ Los datos **NO se pierden** al cerrar el navegador
   - ✅ Se mantienen hasta que se borre el caché del navegador
   - ✅ Funciona offline (sin internet)
   - ✅ Cada navegador tiene sus propios datos

### **Ventajas del localStorage:**
- 🚀 **Rápido** - No necesita servidor
- 💾 **Persistente** - Los datos se mantienen
- 🔒 **Privado** - Solo en el navegador del usuario
- 📱 **Offline** - Funciona sin internet

### **Limitaciones:**
- ⚠️ Los datos están solo en el navegador local
- ⚠️ Si se borra el caché, se pierden los datos
- ⚠️ No se sincroniza entre diferentes computadoras

---

## 🧭 **Sistema de Navegación**

### **Páginas Disponibles:**
1. **🏠 Inicio (index.html)** - Menú principal
2. **👥 Equipo (team.html)** - Información del equipo docente
3. **📅 Cronograma (schedule.html)** - Cronograma del curso
4. **🎯 Ruleta (ruleta-estudiantes.html)** - Selección aleatoria
5. **📊 Asistencia (asistencia.html)** - Sistema de asistencia

### **Navegación Consistente:**
- ✅ Barra de navegación fija en todas las páginas
- ✅ Enlaces directos entre todas las secciones
- ✅ Indicador de página activa
- ✅ Botón "Inicio" prominente
- ✅ Diseño responsive para móviles

---

## 🎯 **Cómo Usar el Sistema**

### **1. Acceder al Sistema:**
```bash
# Abrir el archivo principal
open index.html
```

### **2. Navegar entre Páginas:**
- Usar la barra de navegación superior
- Clic en las tarjetas del menú principal
- Botón "🏠 Inicio" para volver al menú

### **3. Tomar Asistencia:**
1. Ir a "📊 Sistema de Asistencia"
2. Iniciar sesión con credenciales
3. Seleccionar fecha de la clase
4. Clic en tarjetas de estudiantes
5. Clic en "💾 Guardar Asistencia"

### **4. Ver Estadísticas:**
- Estadísticas en tiempo real
- Historial de todas las clases
- Exportar datos en JSON

---

## 🔧 **Funcionalidades Técnicas**

### **Almacenamiento Automático:**
```javascript
// Cada vez que se cambia el estado de un estudiante
function toggleAttendance(student, card) {
    // ... lógica de cambio de estado
    
    // Guardar automáticamente en localStorage
    localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
}
```

### **Carga de Datos:**
```javascript
// Al cargar la página
function loadAttendanceData() {
    const saved = localStorage.getItem('attendanceData');
    if (saved) {
        attendanceData = JSON.parse(saved);
    }
}
```

### **Exportación de Datos:**
```javascript
// Exportar todos los datos
function exportData() {
    const data = {
        course: 'ISIS2007 - Diseño de Productos e Innovación en TI',
        semester: '2025-2',
        students: students,
        attendance: attendanceData,
        exportDate: new Date().toISOString()
    };
    
    // Crear archivo descargable
    const blob = new Blob([JSON.stringify(data, null, 2)]);
    // ... descargar archivo
}
```

---

## 🚀 **Próximas Mejoras**

### **Funcionalidades Futuras:**
- 📊 Gráficos de asistencia
- 📧 Notificaciones automáticas
- 🔄 Sincronización con servidor
- 📱 Aplicación móvil
- 📋 Reportes automáticos

### **Seguridad Mejorada:**
- 🔐 Autenticación con servidor
- 🔑 Encriptación de datos
- 👥 Roles y permisos avanzados
- 📝 Logs de auditoría

---

## 📞 **Soporte Técnico**

Para problemas técnicos o preguntas sobre el sistema:
- **Profesor Principal:** Arturo Henao
- **Monitores:** Juanes y Catalina
- **Desarrollo:** Equipo ISIS2007

---

**Universidad de los Andes**  
Departamento de Ingeniería de Sistemas y Computación  
Semestre 2025-2 