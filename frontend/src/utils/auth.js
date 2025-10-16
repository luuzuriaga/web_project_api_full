// utils/auth.js
class Auth {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  // Registrar usuario
  register(password, email) {
    console.log('🔄 Auth.register llamado con:', { email, passwordLength: password?.length });
    console.log('🌐 URL de registro:', `${this._baseUrl}/signup`);
    
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then((res) => {
      console.log('📡 Response status register:', res.status);
      return this._checkResponse(res);
    })
    .catch((error) => {
      console.error('❌ Error en fetch de register:', error);
      throw error;
    });
  }

  // Iniciar sesión
  login(password, email) {
    console.log('🔄 Auth.login llamado con:', { email, passwordLength: password?.length });
    console.log('🌐 URL de login:', `${this._baseUrl}/signin`);
    
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password, email })
    })
    .then((res) => {
      console.log('📡 Login response status:', res.status);
      return this._checkResponse(res);
    })
    .then((data) => {
      console.log('✅ Login exitoso, datos recibidos:', data);
      return data;
    })
    .catch((error) => {
      console.error('❌ Error en fetch de login:', error);
      throw error;
    });
  }

  // Verificar token
  checkToken(token) {
    console.log('🔄 Verificando token...'); // Debug
    console.log('🌐 URL de verificación:', `${this._baseUrl}/users/me`);
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log('📡 CheckToken response status:', res.status); // Debug
      return this._checkResponse(res);
    });
  }

  async _checkResponse(res) {
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Respuesta exitosa:', data); // Debug
      return data;
    }
    
    // Intentar obtener el mensaje de error del servidor
    let errorMessage = `Error: ${res.status}`;
    try {
      const errorData = await res.json();
      errorMessage = errorData.message || errorData.error || errorMessage;
      console.log('📄 Detalles del error:', errorData); // Debug
    } catch (e) {
      // Si no se puede parsear el JSON del error, usar el mensaje por defecto
      console.log('⚠️ No se pudo parsear el error JSON'); // Debug
    }
    
    console.error('❌ Error response:', errorMessage);
    return Promise.reject(errorMessage);
  }
}

// IMPORTANTE: Cambiar a TU backend local
const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
console.log('🔧 Auth configurado con URL:', baseUrl);

const auth = new Auth(baseUrl);

export default auth;