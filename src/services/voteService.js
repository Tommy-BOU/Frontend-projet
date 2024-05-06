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
    voteFilm(voteData){
        return apiClient.post(`/vote/film`, voteData);
    },
    voteComment(voteData){
        return apiClient.post(`/vote/comment`, voteData);
    }, 
    getVotesByFilm(id){
        return apiClient.get(`/vote/film/${id}`);
    },
    getVotesByComment(id){
        return apiClient.get(`/vote/comment/${id}`);
    }

}