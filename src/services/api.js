import axios from 'axios';
import { getItemFromStorage } from './storage.js';
import { useStore } from '../stores/store.js';

const http = axios.create({});

export async function login(data) {
  const { baseUrl } = useStore();
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/user/login`,
      data,
    });

    const { setUser } = useStore();
    setUser(response?.data || null);

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function register(data) {
  const { baseUrl } = useStore();
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/user/register`,
      data,
    });

    return response;
  } catch (e) {
    console.log(e);
  }
}

export async function getUsers() {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}/user`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function addUserSubscription(data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/subscriptions`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getProducts() {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}/products`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createProduct(data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/products`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateProduct(id, data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'PUT',
      url: `${baseUrl}/products/${id}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getModules() {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}/modules`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getSingleModule(id) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}/modules/${id}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createModule(data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/modules`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateModule(id, data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'PUT',
      url: `${baseUrl}/modules/${id}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function assignResourceToModule(data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/module-resources`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getResources() {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}/resources`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function createResource(data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'POST',
      url: `${baseUrl}/resources`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateResource(id, data) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'PUT',
      url: `${baseUrl}/resources/${id}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
      data,
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteResource(id) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'DELETE',
      url: `${baseUrl}/resources/${id}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export async function getResource(filePath) {
  const { baseUrl } = useStore();
  const user = getItemFromStorage('dotpoint_user') || {};
  try {
    const response = await http({
      method: 'GET',
      url: `${baseUrl}${filePath}`,
      headers: {
        Authorization: `Bearer ${user.token || ''}`,
      },
    });

    return response.data;
  } catch (e) {
    console.log(e);
  }
}
