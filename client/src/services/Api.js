import axios from 'axios';

// for hitting back end points
export default () =>
{
    return axios.create({
        baseURL: 'http://localhost:2000/'
    })
}