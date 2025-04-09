
const datosEntidad = {
  "Ministerio de Agricultura y Desarrollo Rural": {
    "2024": {
      "CONTROL": {
        "Modalidad Marco Nacional": [10, 12, 14, 16, 18],
        "Modalidad Marco Internacional": [8, 9, 10, 11, 13]
      },
      "VIGILANCIA": {
        "Modalidad Marco Nacional": [15, 14, 13, 12, 11],
        "Modalidad Marco Internacional": [7, 6, 8, 9, 10]
      }
    }
  }
};

let grafico;

function actualizarGrafico(entidad, anio, tipo, modalidad) {
  let datos = [0, 0, 0, 0, 0];
  try {
    datos = datosEntidad[entidad]?.[anio]?.[tipo]?.[modalidad] || datos;
  } catch (err) {
    console.warn("Datos no encontrados para la selección.");
  }

  grafico.data.datasets[0].data = datos;
  grafico.data.datasets[0].label = `${tipo} - ${modalidad}`;
  grafico.update();

  const titulo = `Procesos de ${tipo} - ${entidad} - ${anio} - ${modalidad}`;
  document.querySelector('#contenido h3').textContent = titulo;
}

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('graficoEjemplo').getContext('2d');
  grafico = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['2020', '2021', '2022', '2023', '2024'],
      datasets: [{
        label: 'Procesos de Vigilancia',
        data: [12, 19, 10, 14, 22],
        backgroundColor: '#0077CC'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'Procesos por Año' }
      }
    }
  });

  const mainMenu = document.getElementById("main-menu");

  const liSectoriales = document.createElement("li");
  const aSectoriales = document.createElement("a");
  aSectoriales.href = "#";
  aSectoriales.innerHTML = `<i class="fas fa-layer-group"></i> Contralorías Delegadas Sectoriales`;
  aSectoriales.addEventListener("click", function(e) {
    e.preventDefault();
    toggleMenu(this);
  });

  const submenuSectoriales = document.createElement("ul");
  submenuSectoriales.className = "submenu";

  const entidades = ["Ministerio de Agricultura y Desarrollo Rural"];

  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = "#";
  a.innerHTML = `<i class="fas fa-seedling"></i> CD Agropecuario`;
  a.addEventListener("click", function(e) {
    e.preventDefault();
    toggleMenu(this);
  });

  const entidadMenu = document.createElement("ul");
  entidadMenu.className = "sub-submenu";

  entidades.forEach(entidad => {
    const liEnt = document.createElement("li");
    const aEnt = document.createElement("a");
    aEnt.href = "#";
    aEnt.innerHTML = `<i class='fas fa-building'></i> ${entidad}`;
    aEnt.addEventListener("click", function(e) {
      e.preventDefault();
      liEnt.classList.toggle("show");
    });

    const yearMenu = document.createElement("ul");
    yearMenu.className = "sub-yearmenu";

    ["2023", "2024"].forEach(anio => {
      const liYear = document.createElement("li");
      const aYear = document.createElement("a");
      aYear.href = "#";
      aYear.innerHTML = `<i class='fas fa-calendar'></i> ${anio}`;
      aYear.addEventListener("click", function(e) {
        e.preventDefault();
        liYear.classList.toggle("show");
      });

      const controlMenu = document.createElement("ul");
      controlMenu.className = "sub-controlmenu";

      ["CONTROL", "VIGILANCIA"].forEach(tipo => {
        const liTipo = document.createElement("li");
        const aTipo = document.createElement("a");
        aTipo.href = "#";
        aTipo.innerHTML = `<i class='fas fa-circle'></i> ${tipo}`;
        aTipo.addEventListener("click", function(e) {
          e.preventDefault();
          liTipo.classList.toggle("show");
        });

        const modalidadMenu = document.createElement("ul");
        modalidadMenu.className = "sub-controlmenu";

        ["Modalidad Marco Nacional", "Modalidad Marco Internacional"].forEach(mod => {
          const liMod = document.createElement("li");
          const aMod = document.createElement("a");
          aMod.href = "#";
          aMod.innerHTML = `<i class='fas fa-angle-right'></i> ${mod}`;
          aMod.addEventListener("click", function(e) {
            e.preventDefault();
            actualizarGrafico(entidad, anio, tipo, mod);
          });
          liMod.appendChild(aMod);
          modalidadMenu.appendChild(liMod);
        });

        liTipo.appendChild(aTipo);
        liTipo.appendChild(modalidadMenu);
        controlMenu.appendChild(liTipo);
      });

      liYear.appendChild(aYear);
      liYear.appendChild(controlMenu);
      yearMenu.appendChild(liYear);
    });

    liEnt.appendChild(aEnt);
    liEnt.appendChild(yearMenu);
    entidadMenu.appendChild(liEnt);
  });

  li.appendChild(a);
  li.appendChild(entidadMenu);
  submenuSectoriales.appendChild(li);

  liSectoriales.appendChild(aSectoriales);
  liSectoriales.appendChild(submenuSectoriales);
  mainMenu.appendChild(liSectoriales);
});

function toggleMenu(el) {
  const parent = el.closest("li");
  parent.classList.toggle("show");
  const siblings = parent.parentElement.querySelectorAll(":scope > li");
  siblings.forEach(li => { if (li !== parent) li.classList.remove("show"); });
}
