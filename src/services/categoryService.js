import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000/api', 
    withCredentials:true ,
    headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json'
    }
});

export default {
    getCategories(){
        return apiClient.get('/categories');
    }, 
    getCategory(id){
        return apiClient.get(`/categories/${id}`)
    },
    createCategory(categData){
        return apiClient.post('/categories', categData )
    },
    updateCategory(id, categData){
        return apiClient.put(`/categories/${id}`, categData )
    },
    deleteCategory(id){
        return apiClient.delete(`/categories/${id}`)
    }
}