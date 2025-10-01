//Api.js
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Añadir método para establecer token JWT dinámico
  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
    console.log('Token JWT establecido:', token.substring(0, 20) + '...'); // Debug (solo primeros 20 chars)
    console.log('Headers actualizados:', this._headers); // Debug
  }

  // Eliminar token (para logout)
  removeToken() {
    delete this._headers.authorization;
    console.log('Token eliminado'); // Debug
  }

  // Obtener información del usuario
  getUserInformation() {
    console.log('Petición getUserInformation a:', `${this._baseUrl}/users/me`); // Debug
    console.log('Con headers:', this._headers); // Debug
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getUserInformation:', res.status); // Debug
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      console.log('Datos usuario recibidos:', response); // Debug
      // El backend devuelve { data: { email, _id, name, about, avatar } }
      return response.data || response;
    });
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    console.log('Petición getInitialCards a:', `${this._baseUrl}/cards`); // Debug
    
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getInitialCards:', res.status); // Debug
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Tarjetas recibidas:', data); // Debug
      console.log('Número de tarjetas:', data?.length); // Debug
      // Procesar las tarjetas para añadir la propiedad isLiked
      if (Array.isArray(data)) {
        return data.map(card => ({
          ...card,
          isLiked: card.likes && card.likes.some(like => 
            typeof like === 'string' ? like === this._currentUserId : like._id === this._currentUserId
          )
        }));
      }
      return data;
    });
  }

  // Método para establecer el ID del usuario actual (para verificar likes)
  setCurrentUserId(userId) {
    this._currentUserId = userId;
  }

  // Actualizar perfil de usuario
  updateUserProfile(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      // El backend devuelve { data: userData }
      return response.data || response;
    });
  }

  // Crear nueva tarjeta
  createCard(body) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      // El backend devuelve { data: cardData }
      const card = response.data || response;
      return {
        ...card,
        isLiked: false // Nueva tarjeta nunca tiene like del usuario actual
      };
    });
  }

  // Like/Dislike de tarjeta
  like(id, like) {
    const method = like ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method,
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      const card = response.data || response;
      return {
        ...card,
        isLiked: like
      };
    });
  }

  // Eliminar tarjeta
  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    });
  }

  // Actualizar foto de perfil
  updateProfilePhoto(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((response) => {
      // El backend devuelve { data: userData }
      return response.data || response;
    });
  }
}

// Configuración para desarrollo local
const api = new Api({
  baseUrl: "http://localhost:3001", // Cambiar a tu servidor backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;