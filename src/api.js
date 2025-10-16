import axios from 'axios'


const api = axios.create({ baseURL: '/api' })


export async function fetchItems(params) {
// params: {q, category, campus}
// For now this will call backend, but you can switch to local mock if needed
const res = await api.get('/items', { params })
return res.data
}


export async function fetchItem(id) {
const res = await api.get(`/items/${id}`)
return res.data
}


export async function reportItem(payload) {
// payload: { itemId, reason, note }
const res = await api.post('/reports', payload)
return res.data
}


export default api