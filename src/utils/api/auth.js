import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

export const login = async (username, password) => {
  try {
    await axios.post(`${baseUrl}/api/auth/login`, {
      username,
      password,
    }, {
      withCredentials: true
    });
  
  } catch (error) {
    console.error(
      'Login failed:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const register = async (username, password) => {
    try {
      const response = await axios.post(`${baseUrl}/api/auth/register`, {
        username,
        password,
      });
  
      return response.data;
    } catch (error) {
      console.error(
        'Registration failed:',
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  };


export const getCurrentUser = async () => {
  try {    
    const response = await axios.get(`${baseUrl}/api/auth/current-user`, {
      withCredentials: true
    });

    return response.data;
  } catch (error) {
    console.error(
      'Error fetching current user data:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};


export const updateUser = async (formData) => {
  try {
    // Use PUT or POST for updating user settings
    const response = await axios.post(`${baseUrl}/api/user/settings`, formData, {
      withCredentials: true, // Send cookies if required
      headers: {
        'Content-Type': 'multipart/form-data', // Required for file uploads
      },
    });

    return response.data; // Return the updated user data or success response
  } catch (error) {
    console.error(
      'Error updating user data:',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};



export const logout = async () => {
  try {
    await axios.post(`${baseUrl}/api/auth/logout`,{}, {
      withCredentials: true
    });
  } catch (error) {
    console.error(
      'Error logging out',
      error.response ? error.response.data : error.message
    );
    throw error;
  }
}
