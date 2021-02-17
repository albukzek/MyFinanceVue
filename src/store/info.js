import firebase from 'firebase/app'
export default {
  state: {
    info: {}
  },
  mutations:{
    setInfo(state,info){
      state.info = info
      console.log('setInfo')

    },
    clearInfo(state){
      state.info = {}
      console.log('clearInfo')
    }
  },
  actions:{
    async fetchInfo({dispatch, commit}){
    try{
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        console.log( info )
        commit('setInfo', info )
    } catch(e){
      console.log('AIIIибка')
    }

    }
  },
  getters:{
    info: s=>s.info
  }
}
