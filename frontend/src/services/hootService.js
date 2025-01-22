import sendRequest from './sendRequest';

const BASE_URL = '/api/posts';

// Create a hoot
export async function create(hootData) {
  return sendRequest(BASE_URL, 'POST', hootData);
}

// Fetch all hoots
export async function index() {
  return sendRequest(BASE_URL, 'GET');
}

// Fetch a single hoot
export async function getHoot(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'GET');
}

// Update a hoot
export async function updateHoot(hootId, updatedData) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'PUT', updatedData);
}

// Delete a hoot
export async function deleteHoot(hootId) {
  return sendRequest(`${BASE_URL}/${hootId}`, 'DELETE');
}

// Add a comment
export async function addComment(hootId, text) {
  return sendRequest(`${BASE_URL}/${hootId}/comments`, 'POST', { text });
}
