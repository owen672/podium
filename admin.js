function enableEditing() {
  const pass = document.getElementById("adminPass").value;
  if (pass !== "copatintal2025") {
    alert("Contraseña incorrecta");
    return;
  }
  document.querySelectorAll("input").forEach(i => i.disabled = false);
}

function guardarDatos() {
  const filas = document.querySelectorAll("#tablaClubes tbody tr");
  const datos = [];
  filas.forEach(fila => {
    const inputs = fila.querySelectorAll("input");
    datos.push({
      Club: inputs[0].value,
      Oro: parseInt(inputs[1].value),
      Plata: parseInt(inputs[2].value),
      Bronce: parseInt(inputs[3].value)
    });
  });
  fetch("/.netlify/functions/guardarClubes", {
    method: "POST",
    body: JSON.stringify({ data: datos })
  })
  .then(res => res.text())
  .then(res => alert(res))
  .catch(err => alert("Error al guardar"));
}
