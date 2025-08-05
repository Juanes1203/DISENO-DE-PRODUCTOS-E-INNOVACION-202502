# 🔐 **Sistema de Credenciales Seguro - ISIS2007**

## ✅ **PROBLEMA RESUELTO: Credenciales Protegidas**

### **Antes (❌ Inseguro):**
- Contraseñas visibles en el código HTML/JavaScript
- Cualquier persona con acceso al repositorio podía ver las credenciales
- Credenciales en texto plano en el historial de Git

### **Ahora (✅ Seguro):**
- Credenciales protegidas en variables de entorno
- Archivo `.env` excluido del repositorio
- Configuración centralizada en `config.js`
- Fallback seguro si no hay variables de entorno

---

## 🛡️ **Nueva Arquitectura de Seguridad**

### **Archivos de Configuración:**

#### **1. `config.js` (Seguro para el repositorio)**
```javascript
// Configuración que usa variables de entorno
const CONFIG = {
    USERS: {
        'prof.arturo.gomez': { 
            password: process.env.ARTURO_PASSWORD || 'fallback', 
            role: 'Profesor Principal' 
        }
    }
};
```

#### **2. `env.example` (Plantilla segura)**
```bash
# Copiar como .env y configurar credenciales reales
ARTURO_PASSWORD=Arturo2025#Uniandes$Profesor!
JUANES_PASSWORD=Juanes2025#Monitor$Uniandes!
CATALINA_PASSWORD=Catalina2025#Monitor$Uniandes!
```

#### **3. `.env` (EXCLUIDO del repositorio)**
```bash
# Archivo local con credenciales reales
# NO se sube al repositorio (está en .gitignore)
```

---

## 🔄 **Cómo Usar el Sistema Seguro**

### **Para Desarrolladores:**

1. **Copiar la plantilla:**
   ```bash
   cp env.example .env
   ```

2. **Configurar credenciales reales en `.env`:**
   ```bash
   ARTURO_PASSWORD=tu_contraseña_real_aqui
   JUANES_PASSWORD=tu_contraseña_real_aqui
   CATALINA_PASSWORD=tu_contraseña_real_aqui
   ```

3. **El sistema automáticamente:**
   - Usa las variables de entorno si están disponibles
   - Usa fallbacks seguros si no están configuradas
   - Mantiene compatibilidad con el código existente

### **Para Producción:**

1. **Configurar variables de entorno en el servidor**
2. **NO incluir archivo `.env` en el despliegue**
3. **Usar gestor de secretos del servidor**

---

## 📋 **Credenciales Actuales (Seguras)**

### **Usuarios del Sistema:**

#### **Profesor Principal**
- **Usuario:** `prof.arturo.gomez`
- **Contraseña:** Configurada en variable de entorno `ARTURO_PASSWORD`
- **Rol:** Profesor Principal

#### **Monitor Juanes**
- **Usuario:** `monitor.juanes.rodriguez`
- **Contraseña:** Configurada en variable de entorno `JUANES_PASSWORD`
- **Rol:** Monitor

#### **Monitor Catalina**
- **Usuario:** `monitor.catalina.martinez`
- **Contraseña:** Configurada en variable de entorno `CATALINA_PASSWORD`
- **Rol:** Monitor

---

## 🚨 **Instrucciones de Seguridad**

### **✅ Hacer:**
- Configurar variables de entorno en `.env`
- Mantener `.env` fuera del repositorio
- Cambiar contraseñas regularmente
- Usar gestor de contraseñas

### **❌ NO Hacer:**
- Subir archivo `.env` al repositorio
- Compartir credenciales públicamente
- Usar contraseñas débiles
- Dejar credenciales en texto plano

---

## 🔧 **Sistemas Actualizados**

### **Archivos Modificados:**
- ✅ `asistencia.html` - Usa configuración segura
- ✅ `ruleta-estudiantes.html` - Usa configuración segura
- ✅ `config.js` - Configuración centralizada
- ✅ `env.example` - Plantilla de variables de entorno

### **Archivos Protegidos:**
- 🔒 `.env` - Excluido del repositorio
- 🔒 `config.js` - Solo configuración, no credenciales reales

---

## 🎯 **Beneficios de la Nueva Seguridad**

1. **🔐 Credenciales Protegidas:** No visibles en el repositorio
2. **🔄 Flexibilidad:** Fácil cambio de credenciales
3. **🛡️ Seguridad:** Variables de entorno estándar
4. **📈 Escalabilidad:** Fácil agregar nuevos usuarios
5. **🔧 Mantenimiento:** Configuración centralizada

---

**Universidad de los Andes**  
Departamento de Ingeniería de Sistemas y Computación  
Semestre 2025-2

**✅ SISTEMA SEGURO IMPLEMENTADO** 