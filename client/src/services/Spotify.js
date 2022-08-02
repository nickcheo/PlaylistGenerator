import Api from './Api'

export default {

    login()
    {
        return Api().post('login');
    },
    


}