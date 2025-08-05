# 🚀 ISIS2007 - PDF Export Tool

Este proyecto permite exportar todas las páginas HTML del curso ISIS2007 (index, schedule, team) en un solo PDF perfecto con imágenes incluidas.

## 📋 Características

- ✅ **Exportación completa**: Combina index, schedule y team en un solo PDF
- ✅ **Imágenes integradas**: Las fotos del equipo se incluyen automáticamente
- ✅ **Estilos optimizados**: Diseño perfecto para impresión
- ✅ **Saltos de página**: Organización automática del contenido
- ✅ **Colores preservados**: Gradientes y estilos visuales mantenidos
- ✅ **Tablas formateadas**: Cronograma perfectamente estructurado

## 🛠️ Instalación

```bash
npm install
```

## 🚀 Uso

### Exportar todo el contenido a PDF

```bash
npm run export-all
```

O directamente:

```bash
node export-all-to-pdf.js
```

### Exportar solo una página específica

```bash
npm run convert
```

## 📄 Archivos generados

- `ISIS2007-Documento-Completo-Perfecto.pdf` - PDF completo con todas las páginas

## 📁 Estructura del proyecto

```
├── index.html              # Página principal
├── schedule.html           # Página del cronograma
├── team.html              # Página del equipo
├── documento-completo.html # Versión combinada
├── export-all-to-pdf.js   # Script principal de exportación
├── FotoArturo.jpeg        # Foto del profesor
├── FotoJuanes.jpeg        # Foto del monitor
├── FotoCatalina.jpeg      # Foto del monitor
└── package.json           # Configuración del proyecto
```

## 🎨 Características del PDF generado

### Página 1: Información del Curso
- Descripción del curso ISIS2007
- Objetivos de aprendizaje
- Información académica (créditos, horario, sección)
- Enfoque en Lean Startup y Generative AI

### Página 2: Equipo Docente
- Fotos de todos los miembros del equipo
- Información de contacto
- Enlaces a LinkedIn
- Roles y responsabilidades

### Página 3: Cronograma Completo
- Información del semestre
- Sistema de evaluación detallado
- Cronograma semanal completo
- Fechas y actividades específicas

## 🔧 Configuración técnica

- **Formato**: A4
- **Márgenes**: 20mm en todos los lados
- **Fondo**: Incluido para preservar colores
- **Imágenes**: Integradas en base64
- **Fuentes**: Segoe UI (sistema)

## 🐛 Solución de problemas

### Error: "Cannot find module 'puppeteer'"
```bash
npm install
```

### Error: "Cannot find image files"
Asegúrate de que los archivos de imagen estén en el directorio raíz:
- `FotoArturo.jpeg`
- `FotoJuanes.jpeg`
- `FotoCatalina.jpeg`

### PDF no se genera
Verifica que tienes permisos de escritura en el directorio actual.

## 📞 Soporte

Para problemas técnicos, contacta al equipo de ISIS2007.

---

**Universidad de los Andes**  
Departamento de Ingeniería de Sistemas y Computación  
Semestre 2025-2
