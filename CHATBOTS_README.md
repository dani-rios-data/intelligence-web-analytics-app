# TBWA Intelligence - GWI Chatbots Suite

Esta carpeta contiene **3 chatbots especializados** desarrollados para TBWA Intelligence, cada uno con su propia especialización y funcionalidad independiente.

## 🤖 **Chatbots Disponibles**

### 1. **GWI_CORE**
- **Especialización**: Asistente general y análisis de datos core
- **Puerto**: 5173 (por defecto)
- **Descripción**: Chatbot principal para consultas generales de inteligencia de datos

### 2. **GWI_TRAVEL** 
- **Especialización**: Turismo y viajes
- **Puerto**: 5174 (configurar manualmente)
- **Descripción**: Especializado en insights de turismo, destinos y análisis de viajes

### 3. **GWI_USA**
- **Especialización**: Mercado estadounidense
- **Puerto**: 5175 (configurar manualmente)
- **Descripción**: Enfocado en tendencias del mercado americano y comportamiento del consumidor

## 🎨 **Diseño y Características**

### ✨ **Características Compartidas:**
- **Fuentes TBWA**: TBWAGrotesk completa (Regular, Medium, SemiBold, Bold, Black)
- **Paleta de colores**: Negro, amarillo TBWA (#FFFF00), grises
- **Robot 3D**: Asistente virtual con imágenes `3D_AI_front_view.png` y `3D_AI_Half_view.png`
- **Footer consistente**: "© 2025 TBWA Intelligence" + "DISRUPTION"
- **Tailwind CSS**: Para estilos coherentes y responsivos

### 🎯 **Funcionalidades:**
- Chat en tiempo real con interfaz moderna
- Mensajes con timestamps
- Avatares personalizados (usuario y bot)
- Diseño responsivo y profesional
- Animaciones suaves y transiciones
- Placeholder responses (listos para integrar APIs)

## 🚀 **Instrucciones de Uso**

### **Iniciar un chatbot individual:**

```bash
# Para GWI_CORE
cd GWI_CORE
npm install
npm run dev

# Para GWI_TRAVEL  
cd GWI_TRAVEL
npm install
npm run dev

# Para GWI_USA
cd GWI_USA
npm install
npm run dev
```

### **Ejecutar múltiples chatbots simultáneamente:**

```bash
# Terminal 1
cd GWI_CORE && npm run dev

# Terminal 2  
cd GWI_TRAVEL && npm run dev -- --port 5174

# Terminal 3
cd GWI_USA && npm run dev -- --port 5175
```

## 📁 **Estructura de Archivos**

Cada chatbot tiene la estructura idéntica:

```
GWI_[NOMBRE]/
├── public/
│   ├── fonts/           # Fuentes TBWA completas
│   └── images/          # Robot 3D assets
├── src/
│   ├── styles/
│   │   └── fonts.css    # Configuración fuentes TBWA
│   ├── App.tsx          # Componente principal del chat
│   └── index.css        # Tailwind + configuración base
├── tailwind.config.js   # Configuración Tailwind
├── postcss.config.js    # PostCSS config
└── package.json         # Dependencias
```

## 🛠 **Tecnologías**

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (estilos)
- **Lucide React** (iconos)
- **Fuentes TBWA** (brand consistency)
- **Assets 3D** del robot asistente

## 📋 **Próximos Pasos**

1. **Integrar APIs reales** para cada chatbot
2. **Crear repositorios separados** para cada proyecto
3. **Desplegar en Vercel** individualmente
4. **Personalizar respuestas** según especialización
5. **Implementar logging** y analytics
6. **Agregar funcionalidades** específicas por dominio

## 🎯 **URLs de Desarrollo**

- **GWI_CORE**: http://localhost:5173
- **GWI_TRAVEL**: http://localhost:5174  
- **GWI_USA**: http://localhost:5175

---

**Desarrollado para TBWA Intelligence** | Enero 2025 