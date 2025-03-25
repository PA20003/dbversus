import { Sequelize, DataTypes } from "sequelize";

// Variable de entorno para la IP o nombre del servidor DB Oracle
let hostdb = process.env.HOST_DB || "localhost";

const sequelize = new Sequelize({
  dialect: 'oracle', // Especificamos que usamos Oracle
  host: 'localhost',
  port: 1521,
  username: 'CAFETERIA',
  password: 'oracle',
  database: 'FREE', // Nombre del servicio (en Oracle, esto es el "service name")
  dialectOptions: {
    connectString: 'localhost:1521/FREE', // Formato: host:port/service_name
  },
});

// Tabla Categorias
const categorias = sequelize.define(
  "CATEGORIAS",
  {
    ID: { // Usamos mayúsculas para coincidir con Oracle
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "ID", 
    },
    NOMBRE: {
      type: DataTypes.STRING(145), // VARCHAR2(145)
      allowNull: false,
      field: "NOMBRE",
    },
  },
  {
    timestamps: false,
    schema: "CAFETERIA",
    tableName: "CATEGORIAS",
  }
);

// Tabla Productos
const productos = sequelize.define(
  "productos",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
    idCategoria: { type: DataTypes.INTEGER, allowNull: false },
  },
  { timestamps: false }
);

// Tabla Ordenes
const ordenes = sequelize.define(
  "ordenes",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    fecha: { type: DataTypes.DATEONLY, allowNull: false },
    total: { type: DataTypes.FLOAT, allowNull: false },
  },
  { timestamps: false }
);

// Tabla DetalleOrdenes
const detalleordenes = sequelize.define(
  "detalleordenes",
  {
    idorden: { type: DataTypes.INTEGER, primaryKey: true },
    idproducto: { type: DataTypes.INTEGER, primaryKey: true },
    cantidad: { type: DataTypes.INTEGER, allowNull: false },
    precio: { type: DataTypes.FLOAT, allowNull: false },
  },
  { timestamps: false }
);

// Relaciones entre tablas
ordenes.hasMany(detalleordenes, { foreignKey: "idorden" });
detalleordenes.belongsTo(ordenes, { foreignKey: "idorden" });

productos.hasMany(detalleordenes, { foreignKey: "idproducto" });
detalleordenes.belongsTo(productos, { foreignKey: "idproducto" });

categorias.hasMany(productos, { foreignKey: "idCategoria" });
productos.belongsTo(categorias, { foreignKey: "idCategoria" });

const db = {
  sequelize,
  categorias,
  productos,
  ordenes,
  detalleordenes,
};

export { sequelize, categorias, productos, ordenes, detalleordenes };
