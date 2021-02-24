import firebase from 'firebase/app'


export default {
    actions: {
      getUid(){
       const user =  firebase.auth().currentUser
       return user ? user.uid : null
      },
      async register({dispatch,commit},{email,password,nick}){
        try{
          await firebase.auth().createUserWithEmailAndPassword(email,password)
          const uid = await dispatch('getUid')
          await firebase.database().ref(`/users/${uid}/info`).set({
            bill: 1000, // начальное значение счета человека
            nick
          })
         } catch (e){
            commit('setError', e)
            throw e
         }
      },
      async login({dispatch,commit},{email, password}){
            try{
             await firebase.auth().signInWithEmailAndPassword(email,password)
            } catch (e){
              commit('setError', e)
              throw e
            }
        },
      async logout({commit}){
        await firebase.auth().signOut()
        commit('clearInfo')
      }
    }
}
