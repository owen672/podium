document.addEventListener('DOMContentLoaded', () => {
  fetch('clubes.json')
    .then(res => res.json())
    .then(data => mostrarTabla(data));
});

function mostrarTabla(clubes) {
  const tbody = document.querySelector('#tablaClubes tbody');
  tbody.innerHTML = '';
  clubes.forEach((club, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td><input type="text" value="${club.Club}" disabled></td>
      <td><input type="number" value="${club.Oro}" disabled></td>
      <td><input type="number" value="${club.Plata}" disabled></td>
      <td><input type="number" value="${club.Bronce}" disabled></td>
    `;
    tbody.appendChild(row);
  });
}
