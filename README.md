# TBWA Intelligence - Simple React App

Una aplicación React simple y limpia para la plataforma de inteligencia TBWA.

## 🚀 Stack Tecnológico

- **React 18** - Framework principal
- **Vite** - Build tool y desarrollo  
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Router** - Navegación
- **Lucide React** - Iconografía

## 🔐 Autenticación

Sistema de autenticación simple basado en contraseña:

- **Contraseña**: `TBWAIntelligence2024!`
- **Seguridad**: 5 intentos máximos, bloqueo de 5 minutos
- **Sesión**: 1 hora de duración automática

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── SignIn.tsx          # Página de login
│   ├── Services.tsx        # Dashboard principal
│   └── ProtectedRoute.tsx  # Wrapper de rutas protegidas
├── utils/
│   └── auth.ts            # Lógica de autenticación
├── App.tsx                # Componente principal
├── main.tsx              # Punto de entrada
└── index.css             # Estilos globales
```

## 🛠️ Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview de producción
npm run preview
```

## 🎨 Diseño

- **Tema**: Fondo negro con acentos dorados
- **Responsive**: Adaptable a móviles y escritorio
- **Animaciones**: Transiciones suaves y micro-interacciones
- **Iconografía**: Lucide React icons

## 📄 Rutas

- `/` - Redirige a signin
- `/signin` - Página de autenticación  
- `/services` - Dashboard principal (protegida)

## 🔧 Configuración

El archivo `tailwind.config.js` incluye los colores personalizados:
- Yellow: `#FFD700` (color principal)
- Black: `#000000` (fondo)

## 📦 Dependencias Principales

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.8.1",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.3.0"
}
```

---

**Proyecto simplificado**: React + Vite + Tailwind para máxima eficiencia y facilidad de mantenimiento. 