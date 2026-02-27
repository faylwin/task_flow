# ⚡ TaskFlow Pro — Gestión de Tareas

**TaskFlow Pro** es una aplicación web interactiva desarrollada como proyecto final para el **Módulo #4 de Alkemy**. El objetivo principal es demostrar el dominio de JavaScript moderno (ES6+), la programación orientada a objetos (POO), el manejo del DOM y la integración de procesos asíncronos mediante APIs.

---

## 🚀 Características Principales

- **Gestión CRUD**: Creación y eliminación de tareas en tiempo real.
- **Priorización Dinámica**: Clasificación de tareas por niveles (Alta, Media, Baja) con indicadores visuales.
- **Persistencia Local**: Uso de `localStorage` para mantener los datos tras recargar la página.
- **Sincronización API**: Integración con [JSONPlaceholder](https://jsonplaceholder.typicode.com/) para importar datos externos.
- **Diseño Premium**: Interfaz oscura con estética *Slate & Amber*, totalmente responsiva.

---

## 🛠️ Requerimientos Técnicos Implementados

El proyecto cumple con los siguientes pilares de la evaluación:

### 1. Orientación a Objetos (POO)
Se utilizaron clases de ES6 (`class Tarea` y `class GestorTareas`) para encapsular la lógica de negocio y los datos, permitiendo un código escalable y organizado.

### 2. JavaScript Moderno (ES6+)
- Uso de `const` y `let` para el control de scope.
- **Arrow functions** para simplificar callbacks y mantener el contexto de `this`.
- **Template Literals** para la generación dinámica de HTML.
- **Destructuring** de objetos y parámetros.

### 3. Manipulación del DOM y Eventos
- Uso de `addEventListener` para capturar acciones del usuario (submit, click, change).
- Renderizado dinámico de la lista de tareas basado en el estado del objeto gestor.

### 4. Asincronía (Promises & Async/Await)
- **Procesamiento Simulado**: Implementación de `setTimeout` para emular tiempos de respuesta de servidor al guardar tareas.
- **Reloj en Tiempo Real**: Uso de `setInterval` para un HUD dinámico.
- **Consumo de API**: Implementación de `fetch` con `async/await` y manejo de errores mediante bloques `try/catch`.

---

## 📦 Instalación y Uso

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/faylwin/task_flow.git](https://github.com/faylwin/task_flow.git)
