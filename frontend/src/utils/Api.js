// utils/Api.js
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Añadir método para establecer token JWT dinámico
  setToken(token) {
    this._headers.authorization = `Bearer ${token}`;
    console.log('Token JWT establecido:', token.substring(0, 20) + '...');
    console.log('Headers actualizados:', this._headers);
  }

  // Eliminar token (para logout)
  removeToken() {
    delete this._headers.authorization;
    console.log('Token eliminado');
  }

  // Obtener información del usuario
  getUserInformation() {
    console.log('Petición getUserInformation a:', `${this._baseUrl}/users/me`);
    console.log('Con headers:', this._headers);
    
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getUserInformation:', res.status);
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('Datos usuario recibidos:', data);
      // La API de TripleTen devuelve { data: { email, _id } }
      if (data.data) {
        console.log('✅ ID del usuario actual:', data.data._id);
        return {
          email: data.data.email,
          _id: data.data._id,
          name: data.data.name || 'Usuario',
          about: data.data.about || 'Explorador',
          avatar: data.data.avatar || 'https://via.placeholder.com/120'
        };
      }
      console.log('✅ ID del usuario actual:', data._id);
      return data;
    });
  }

  // Obtener tarjetas iniciales
  getInitialCards() {
    console.log('Petición getInitialCards a:', `${this._baseUrl}/cards`);
    
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status respuesta getInitialCards:', res.status);
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('📦 Tarjetas RAW recibidas:', JSON.stringify(data, null, 2));
      console.log('Número de tarjetas:', data?.length);
      
      // Procesar las tarjetas
      if (Array.isArray(data)) {
        const processedCards = data.map(card => {
          // Extraer el owner ID de forma más robusta
          let ownerId;
          
          if (typeof card.owner === 'string') {
            // Si owner ya es un string, usarlo directamente
            ownerId = card.owner;
            console.log(`🟢 Card ${card._id}: owner ya es string:`, ownerId);
          } else if (card.owner && typeof card.owner === 'object' && card.owner._id) {
            // Si owner es un objeto, extraer el _id
            ownerId = card.owner._id;
            console.log(`🔵 Card ${card._id}: owner era objeto, extraído _id:`, ownerId);
          } else {
            console.error(`🔴 Card ${card._id}: owner tiene formato inesperado:`, card.owner);
            ownerId = card.owner; // Fallback
          }
          
          return {
            ...card,
            owner: ownerId, // ✅ Guardar solo el ID del owner como string
            isLiked: card.likes && card.likes.length > 0
          };
        });
        
        console.log('📦 Tarjetas PROCESADAS:', JSON.stringify(processedCards, null, 2));
        return processedCards;
      }
      return data;
    });
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
    .then((data) => {
      return data.data || data;
    });
  }

  // Crear nueva tarjeta
  createCard(body) {
    console.log('🆕 Creando tarjeta:', body);
    
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(body),
    })
    .then((res) => {
      console.log('Status createCard:', res.status);
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log('📦 Tarjeta creada RAW:', JSON.stringify(data, null, 2));
      const card = data.data || data;
      
      // Extraer el owner ID
      let ownerId;
      if (typeof card.owner === 'string') {
        ownerId = card.owner;
        console.log('🟢 Nueva card: owner ya es string:', ownerId);
      } else if (card.owner && typeof card.owner === 'object' && card.owner._id) {
        ownerId = card.owner._id;
        console.log('🔵 Nueva card: owner era objeto, extraído _id:', ownerId);
      }
      
      const processedCard = {
        ...card,
        owner: ownerId,
        isLiked: false
      };
      
      console.log('📦 Tarjeta creada PROCESADA:', JSON.stringify(processedCard, null, 2));
      return processedCard;
    });
  }

  // Like/Dislike de tarjeta
  like(id, like) {
    console.log(`${like ? '❤️' : '💔'} ${like ? 'Dando like' : 'Quitando like'} a tarjeta:`, id);
    
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: like ? "PUT" : "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      console.log('Status like:', res.status);
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      const card = data.data || data;
      
      // Extraer el owner ID
      let ownerId;
      if (typeof card.owner === 'string') {
        ownerId = card.owner;
      } else if (card.owner && typeof card.owner === 'object' && card.owner._id) {
        ownerId = card.owner._id;
      }
      
      return {
        ...card,
        owner: ownerId,
        isLiked: like
      };
    });
  }

  // Eliminar tarjeta
  deleteCard(id) {
    console.log('🗑️ Eliminando tarjeta:', id);
    console.log('🔑 Con headers:', this._headers);
    console.log('📍 URL completa:', `${this._baseUrl}/cards/${id}`);
    
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      console.log('❗ Status deleteCard:', res.status);
      
      if (!res.ok) {
        return res.json().then(errorData => {
          console.error('❌ Error del servidor:', errorData);
          return Promise.reject(`Error: ${res.status} - ${errorData.message || 'Error al eliminar'}`);
        }).catch(() => {
          return Promise.reject(`Error: ${res.status}`);
        });
      }
      
      return res.json();
    })
    .then((data) => {
      console.log('✅ Tarjeta eliminada exitosamente:', data);
      return data;
    })
    .catch((error) => {
      console.error('💥 Error completo en deleteCard:', error);
      throw error;
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
    .then((data) => {
      return data.data || data;
    });
  }
}


const api = new Api({
  baseUrl: import.meta.env.VITE_API_URL || "https://luceroapi.baselinux.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;