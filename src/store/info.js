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
    async updateInfo({dispatch, commit, getters},toUpdate){
      try{
        const uid = await dispatch('getUid')
        console.log(toUpdate)
        const updateData =  {...getters.info, ...toUpdate}
        // console.log(updateData)
        await firebase.database().ref(`/users/${uid}/info`).update(updateData)
        commit('setInfo', updateData)
    } catch(e){
      commit('setError', e)
      throw e
    }
    },
    async fetchInfo({dispatch, commit}){
    try{
        const uid = await dispatch('getUid')
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        console.log( info )
        commit('setInfo', info )
    } catch(e){
      commit('setError', e)
      throw e
    }

    }
  },
  getters:{
    info: s=>s.info
  }
}
