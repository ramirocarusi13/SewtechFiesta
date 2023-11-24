import express from 'express';
import multer from 'multer';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos SQL (SQLite en este caso)
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // Puedes cambiar el nombre según tus preferencias
});

// Definición del modelo de la base de datos
const Archivo = sequelize.define('Archivo', {
  tipo: {
    type: DataTypes.STRING,
  },
  ruta: {
    type: DataTypes.STRING,
  },
});

// Configuración de multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
  });
  

const upload = multer({ storage: storage });

// Rutas
app.use(express.static('public'));

app.post('/cargarfoto', upload.single('foto'), async (req, res) => {
  try {
    const nuevaFoto = await Archivo.create({ tipo: 'foto', ruta: req.file.filename });
    res.send('Foto cargada correctamente.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/cargarvideo', upload.single('video'), async (req, res) => {
  try {
    const nuevoVideo = await Archivo.create({ tipo: 'video', ruta: req.file.filename });
    res.send('Video cargado correctamente.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// Sincronizar el modelo con la base de datos
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });
});
