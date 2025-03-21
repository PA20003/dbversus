import pruebas from "../pruebas.json";

// Insertar nuevas categorías
async function categoriasInsertar(total: number): Promise<number> {
  console.log("Iniciando inserción de categorías...");
  let start = new Date().getTime();
  for (let i = 1; i <= total; i++) {
    const ldata = {
      id: i,
      nombre: "Categoria " + i,
    };
    await $fetch("http://localhost:3000/api/oracle/categoria", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ldata),
      onRequestError({ error }) {
        return -1;
      },
    });
  }
  let end = new Date().getTime();
  return end - start;
}

// Consultar todas las categorías
async function categoriasConsultar(): Promise<number> {
  let start = new Date().getTime();
  await $fetch("http://localhost:3000/api/oracle/categorias", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    onRequestError({ error }) {
      return -1;
    },
  });
  let end = new Date().getTime();
  return end - start;
}

// Consultar categorías al azar
async function categoriasConsultarAzar(total: number): Promise<number> {
  let start = new Date().getTime();
  for (let i = 1; i <= total; i++) {
    let id = Math.floor(Math.random() * pruebas.categorias.insertar) + 1;
    await $fetch(`http://localhost:3000/api/oracle/categoria/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      onRequestError({ error }) {
        return -1;
      },
    });
  }
  let end = new Date().getTime();
  return end - start;
}

// Actualizar categorías
async function categoriasActualizar(total: number): Promise<number> {
  let start = new Date().getTime();
  for (let i = 1; i <= total; i++) {
    const ldata = {
      id: i,
      nombre: "Categoria " + i + " Actualizada",
    };
    await $fetch(`http://localhost:3000/api/oracle/categoria/${i}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ldata),
      onRequestError({ error }) {
        return -1;
      },
    });
  }
  let end = new Date().getTime();
  return end - start;
}

// Eliminar categorías
async function categoriasEliminar(total: number): Promise<number> {
  let start = new Date().getTime();
  for (let i = 1; i <= total; i++) {
    await $fetch(`http://localhost:3000/api/oracle/categoria/${i}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: i }),
      onRequestError({ error }) {
        return -1;
      },
    });
  }
  let end = new Date().getTime();
  return end - start;
}

export {
  categoriasInsertar,
  categoriasConsultar,
  categoriasConsultarAzar,
  categoriasActualizar,
  categoriasEliminar,
};
