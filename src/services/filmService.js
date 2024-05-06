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
    getFilms(){
        return apiClient.get('/films');
    }, 
    getFilm(id){
        return apiClient.get(`/films/${id}`)
    },
    getFilmsByCategory(id){
        return apiClient.get(`/films/category/${id}`)
    },
    createFilm(filmData){
        return apiClient.post('/films', filmData )
    },
    updateFilm(id, filmData){
        return apiClient.put(`/films/${id}`, filmData )
    },
    deleteFilm(id){
        return apiClient.delete(`/films/${id}`)
    }
}