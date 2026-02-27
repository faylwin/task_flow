'use strict';

class Tarea {
  constructor({ descripcion, prioridad = 'media', fechaLimite = null }) {
    this.id = Date.now();
    this.descripcion = descripcion;
    this.prioridad = prioridad;
    this.estado = 'pendiente';
    this.fechaLimite = fechaLimite;
    this.fechaCreacion = new Date().toLocaleTimeString();
  }

  cambiarEstado() {
    this.estado = this.estado === 'pendiente' ? 'completada' : 'pendiente';
  }
}

class GestorTareas {
  constructor() {
    this.tareas = [];
    this.filtroActual = 'todas';
    this._intervalos = {};
  }

  agregar(datos) {
    const btn = document.getElementById('btnAgregar');
    const label = document.getElementById('btnTexto');
    
    btn.disabled = true;
    label.textContent = 'Procesando...';

    setTimeout(() => {
      const nueva = new Tarea(datos);
      this.tareas.push(nueva);
      btn.disabled = false;
      label.textContent = '＋ Agregar Tarea';
      this.renderizar();
      this.notificar("Registro guardado exitosamente");
      
      if (nueva.fechaLimite) this.iniciarCuentaRegresiva(nueva.id);
    }, 1500);
  }

  eliminar(id) {
    if(this._intervalos[id]) clearInterval(this._intervalos[id]);
    this.tareas = this.tareas.filter(t => t.id !== id);
    this.renderizar();
  }

  toggleEstado(id) {
    const t = this.tareas.find(t => t.id === id);
    if (t) t.cambiarEstado();
    this.renderizar();
  }

  renderizar() {
    const lista = document.getElementById('listaTareas');
    const filtradas = this.tareas.filter(t => 
      this.filtroActual === 'todas' || t.estado === this.filtroActual
    );

    lista.innerHTML = filtradas.map(t => `
      <li class="tarea-card prioridad-${t.prioridad} ${t.estado === 'completada' ? 'completada' : ''}">
        <input type="checkbox" ${t.estado === 'completada' ? 'checked' : ''} onclick="gestor.toggleEstado(${t.id})">
        <div style="flex:1">
          <p class="tarea-desc">${t.descripcion}</p>
          <div style="margin-top:8px">
            <span class="badge">${t.prioridad.toUpperCase()}</span>
            <span class="badge">ID: ${t.id}</span>
            ${t.fechaLimite ? `<span class="badge" id="countdown-${t.id}">Calculando...</span>` : ''}
          </div>
        </div>
        <button class="btn-api-danger" onclick="gestor.eliminar(${t.id})" style="border:none; background:none; color:var(--rojo); cursor:pointer">✕</button>
      </li>
    `).join('');

    this.actualizarMetricas();
    filtradas.forEach(t => { if(t.fechaLimite && t.estado !== 'completada') this.iniciarCuentaRegresiva(t.id); });
  }

  actualizarMetricas() {
    document.getElementById('statTotal').textContent = this.tareas.length;
    document.getElementById('statCompletadas').textContent = this.tareas.filter(t => t.estado === 'completada').length;
  }

  iniciarCuentaRegresiva(id) {
    if (this._intervalos[id]) clearInterval(this._intervalos[id]);
    const t = this.tareas.find(x => x.id === id);
    
    this._intervalos[id] = setInterval(() => {
      const badge = document.getElementById(`countdown-${id}`);
      if (!badge) { clearInterval(this._intervalos[id]); return; }
      
      const diff = new Date(t.fechaLimite + 'T23:59:59') - new Date();
      if (diff <= 0) { badge.textContent = 'VENCIDA'; clearInterval(this._intervalos[id]); return; }
      
      const d = Math.floor(diff / 864e5), h = Math.floor((diff % 864e5) / 36e5), m = Math.floor((diff % 36e5) / 6e4);
      badge.textContent = `⏱ ${d}d ${h}h ${m}m`;
    }, 1000);
  }

  async cargarDesdeAPI() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=3');
      const data = await res.json();
      data.forEach(item => this.tareas.push(new Tarea({ descripcion: item.title, prioridad: 'baja' })));
      this.renderizar();
      this.notificar("Sincronización API completada");
    } catch (e) { console.error(e); }
  }

  notificar(msg) {
    const n = document.getElementById('notificacion');
    n.textContent = msg; n.classList.remove('hidden');
    setTimeout(() => n.classList.add('hidden'), 3000);
  }

  saveLocal() {
    localStorage.setItem('taskflow_db', JSON.stringify(this.tareas));
    this.notificar("Backup local creado");
  }
}

const gestor = new GestorTareas();

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formTarea').addEventListener('submit', (e) => {
    e.preventDefault();
    gestor.agregar({
      descripcion: document.getElementById('inputDescripcion').value,
      prioridad: document.getElementById('selectPrioridad').value,
      fechaLimite: document.getElementById('inputFecha').value
    });
    e.target.reset();
  });

  setInterval(() => {
    document.getElementById('reloj').textContent = new Date().toLocaleTimeString();
  }, 1000);
});