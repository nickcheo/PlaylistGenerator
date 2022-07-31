import Api from './Api'

export default {
    testRequest(payload) {
        return Api().post('test', payload)
    }
}