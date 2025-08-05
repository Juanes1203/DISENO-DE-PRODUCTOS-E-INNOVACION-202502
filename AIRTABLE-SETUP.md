# 🚀 Configuración de Airtable para Sistema de Asistencia

## 📋 **Pasos para Configurar Airtable**

### **1. Crear Base de Datos en Airtable**

1. **Ir a [airtable.com](https://airtable.com)**
2. **Crear una nueva base de datos**
3. **Renombrar la tabla principal a "Asistencia ISIS2007"**

### **2. Configurar Campos de la Tabla**

Crear los siguientes campos en tu tabla:

| Nombre del Campo | Tipo | Descripción |
|------------------|------|-------------|
| `Fecha` | Date | Fecha de la clase |
| `Estudiante` | Single line text | Nombre completo del estudiante |
| `Estado` | Single select | Opciones: "present", "absent" |
| `Usuario Registro` | Single line text | Quién tomó la asistencia |
| `Rol Usuario` | Single line text | Rol del usuario (Profesor, Monitor) |
| `Timestamp` | Date | Fecha y hora del registro |
| `Curso` | Single line text | "ISIS2007 - Diseño de Productos e Innovación en TI" |

### **3. Obtener Credenciales de Airtable**

#### **API Key:**
1. Ir a [airtable.com/account](https://airtable.com/account)
2. En la sección "API", hacer clic en "Generate API key"
3. Copiar la API key generada

#### **Base ID:**
1. En tu base de datos, ir a "Help" → "API Documentation"
2. Copiar el "Base ID" (algo como `appXXXXXXXXXXXXXX`)

### **4. Configurar el Archivo de Configuración**

Editar el archivo `airtable-config.js`:

```javascript
const AIRTABLE_CONFIG = {
    // Reemplazar con tu API Key real
    API_KEY: 'tu_api_key_aqui',
    
    // Reemplazar con tu Base ID real
    BASE_ID: 'tu_base_id_aqui',
    
    // El nombre de tu tabla (debe coincidir exactamente)
    TABLE_NAME: 'Asistencia ISIS2007',
    
    // URLs de la API (no cambiar)
    BASE_URL: 'https://api.airtable.com/v0',
    
    // Configuración de campos (debe coincidir con Airtable)
    FIELDS: {
        FECHA: 'Fecha',
        ESTUDIANTE: 'Estudiante',
        ESTADO: 'Estado',
        USUARIO_REGISTRO: 'Usuario Registro',
        ROL_USUARIO: 'Rol Usuario',
        TIMESTAMP: 'Timestamp',
        CURSO: 'Curso'
    }
};
```

---

## 🔧 **Funcionalidades de Sincronización**

### **Sincronización Automática:**
- ✅ **Guardado automático** en Airtable al guardar asistencia
- ✅ **Actualización de registros** existentes
- ✅ **Creación de nuevos registros** si no existen
- ✅ **Mensajes de estado** en tiempo real

### **Sincronización Manual:**
- 🔄 **Botón "Sincronizar Airtable"** para sincronización manual
- 🔗 **Botón "Probar Conexión"** para verificar configuración
- 📊 **Reportes detallados** de sincronización

### **Gestión de Datos:**
- 💾 **Backup local** en localStorage
- ☁️ **Sincronización en la nube** con Airtable
- 📈 **Historial completo** de asistencia
- 📥 **Exportación de datos** en JSON

---

## 🎯 **Cómo Usar la Integración**

### **1. Configuración Inicial:**
```bash
# 1. Editar airtable-config.js con tus credenciales
# 2. Abrir asistencia.html
# 3. Hacer clic en "🔗 Probar Conexión"
# 4. Verificar que la conexión sea exitosa
```

### **2. Uso Diario:**
```bash
# 1. Tomar asistencia normalmente
# 2. Hacer clic en "💾 Guardar Asistencia"
# 3. Los datos se sincronizan automáticamente
# 4. Verificar en Airtable que los datos lleguen
```

### **3. Sincronización Manual:**
```bash
# Si necesitas sincronizar datos existentes:
# 1. Hacer clic en "🔄 Sincronizar Airtable"
# 2. Esperar el mensaje de confirmación
# 3. Verificar en Airtable
```

---

## 📊 **Estructura de Datos en Airtable**

### **Ejemplo de Registro:**
```json
{
  "id": "recXXXXXXXXXXXXXX",
  "fields": {
    "Fecha": "2025-08-06",
    "Estudiante": "Alcala Gonzalez, Sofia",
    "Estado": "present",
    "Usuario Registro": "arturo",
    "Rol Usuario": "Profesor Principal",
    "Timestamp": "2025-08-06T10:30:00.000Z",
    "Curso": "ISIS2007 - Diseño de Productos e Innovación en TI"
  }
}
```

### **Ventajas de Airtable:**
- 📱 **Acceso desde cualquier dispositivo**
- 📊 **Vistas y filtros avanzados**
- 🔄 **Sincronización en tiempo real**
- 📈 **Reportes y análisis**
- 👥 **Colaboración en equipo**
- 🔒 **Seguridad empresarial**

---

## 🚨 **Solución de Problemas**

### **Error: "Configura Airtable primero"**
```bash
# Solución: Editar airtable-config.js
API_KEY: 'tu_api_key_real_aqui'
BASE_ID: 'tu_base_id_real_aqui'
```

### **Error: "Error de conexión con Airtable"**
```bash
# Verificar:
# 1. API Key correcta
# 2. Base ID correcto
# 3. Nombre de tabla exacto
# 4. Campos configurados correctamente
# 5. Conexión a internet
```

### **Error: "Error al sincronizar"**
```bash
# Verificar:
# 1. Permisos de escritura en la tabla
# 2. Campos requeridos completos
# 3. Formato de datos correcto
```

### **Datos no aparecen en Airtable:**
```bash
# Verificar:
# 1. Campos con nombres exactos
# 2. Tipos de datos correctos
# 3. Permisos de la tabla
# 4. Filtros activos en Airtable
```

---

## 🔐 **Seguridad y Privacidad**

### **Buenas Prácticas:**
- 🔑 **No compartir API keys** en código público
- 🔒 **Usar variables de entorno** en producción
- 📝 **Revisar permisos** de la tabla
- 🔄 **Hacer backups** regulares
- 👥 **Limitar acceso** solo a usuarios necesarios

### **Configuración Recomendada:**
```javascript
// En producción, usar variables de entorno
const AIRTABLE_CONFIG = {
    API_KEY: process.env.AIRTABLE_API_KEY,
    BASE_ID: process.env.AIRTABLE_BASE_ID,
    // ... resto de configuración
};
```

---

## 📈 **Ventajas de la Integración**

### **Para Profesores:**
- 📱 **Acceso desde cualquier lugar**
- 📊 **Reportes automáticos**
- 🔄 **Sincronización en tiempo real**
- 📈 **Análisis de tendencias**
- 👥 **Colaboración con monitores**

### **Para Monitores:**
- 📝 **Registro fácil de asistencia**
- 🔄 **Datos sincronizados automáticamente**
- 📊 **Vista de estadísticas**
- 📱 **Acceso móvil**

### **Para Estudiantes:**
- 📊 **Transparencia en asistencia**
- 📈 **Seguimiento de progreso**
- 🔔 **Notificaciones automáticas**

---

## 🚀 **Próximas Mejoras**

### **Funcionalidades Futuras:**
- 📧 **Notificaciones automáticas** por email
- 📱 **Aplicación móvil** nativa
- 📊 **Dashboard avanzado** con gráficos
- 🔄 **Sincronización bidireccional**
- 📋 **Reportes automáticos** semanales
- 🎯 **Alertas de asistencia** baja

### **Integraciones Adicionales:**
- 📧 **Integración con email**
- 📅 **Sincronización con calendario**
- 📊 **Integración con Google Sheets**
- 🔔 **Notificaciones push**

---

**Universidad de los Andes**  
Departamento de Ingeniería de Sistemas y Computación  
Semestre 2025-2 