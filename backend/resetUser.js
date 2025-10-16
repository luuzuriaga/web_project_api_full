// backend/resetUser.js
// Script temporal para resetear usuario
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const { MONGODB_URI } = process.env;

async function resetUser() {
  try {
    console.log('🔌 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Conectado a MongoDB');

    const email = 'laura@gmail.com';
    const newPassword = 'tupassword'; // Cambia esto por tu contraseña

    console.log(`🔍 Buscando usuario: ${email}`);
    
    // Buscar usuario
    let user = await User.findOne({ email });

    if (!user) {
      console.log('❌ Usuario no encontrado. Creando nuevo usuario...');
      
      // Crear nuevo usuario
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user = await User.create({
        name: 'Laura',
        about: 'Exploradora',
        avatar: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
        email: email,
        password: hashedPassword
      });
      
      console.log('✅ Usuario creado:', user._id);
    } else {
      console.log('👤 Usuario encontrado:', user._id);
      console.log('🔄 Actualizando contraseña...');
      
      // Actualizar contraseña
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      await user.save();
      
      console.log('✅ Contraseña actualizada');
    }

    console.log('\n📋 Datos del usuario:');
    console.log('Email:', user.email);
    console.log('Nombre:', user.name);
    console.log('ID:', user._id);
    console.log('\n🔐 Credenciales para login:');
    console.log(`Email: ${email}`);
    console.log(`Password: ${newPassword}`);
    console.log('\n⚠️ IMPORTANTE: Usa exactamente estas credenciales para hacer login');

    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

resetUser();