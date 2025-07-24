
let isAdmin = false;
const password = "Copstintal2025";

document.getElementById("admin-btn").addEventListener("click", () => {
  const userPassword = prompt("Ingrese la contraseña:");
  if (userPassword === password) {
    isAdmin = true;
    document.querySelectorAll(".editable").forEach(el => el.contentEditable = true);
    document.getElementById("guardar-btn").style.display = "inline-block";
    document.getElementById("resetear-btn").style.display = "inline-block";
  } else {
    alert("Contraseña incorrecta.");
  }
});

document.getElementById("guardar-btn").addEventListener("click", async () => {
  const podio1 = [];
  document.querySelectorAll("#podio1 .puesto").forEach((el, i) => {
    podio1.push({ puesto: i + 1, nombre: el.innerText });
  });
  const podio2 = [];
  document.querySelectorAll("#podio2 .puesto").forEach((el, i) => {
    podio2.push({ puesto: i + 1, nombre: el.innerText });
  });
  await guardarJSON("podio1.json", podio1);
  await guardarJSON("podio2.json", podio2);
  actualizarTablaPosiciones(podio1);
});

document.getElementById("resetear-btn").addEventListener("click", () => {
  location.reload();
});

async function guardarJSON(nombre, data) {
  try {
    await fetch(`/.netlify/functions/guardar-json?file=${nombre}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    alert(`Guardado: ${nombre}`);
  } catch (err) {
    alert("Error al guardar: " + err.message);
  }
}

async function actualizarTablaPosiciones(podio1) {
  const posiciones = await cargarJSON("posiciones.json");
  podio1.forEach((item, index) => {
    const club = posiciones.find(c => c.club === item.nombre);
    if (club) {
      if (index === 0) club.oro++;
      else if (index === 1) club.plata++;
      else if (index === 2) club.bronce++;
    }
  });
  posiciones.sort((a, b) => b.oro - a.oro || b.plata - a.plata || b.bronce - a.bronce);
  await guardarJSON("posiciones.json", posiciones);
  mostrarTabla(posiciones);
}

async function cargarJSON(file) {
  const res = await fetch(file);
  return await res.json();
}

function mostrarTabla(posiciones) {
  const tabla = document.getElementById("tabla-posiciones");
  tabla.innerHTML = "";
  posiciones.forEach((club, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${i + 1}</td><td>${club.club}</td><td>${club.oro}</td><td>${club.plata}</td><td>${club.bronce}</td>`;
    tabla.appendChild(row);
  });
}

// Inicializar tabla al cargar
cargarJSON("posiciones.json").then(mostrarTabla);
