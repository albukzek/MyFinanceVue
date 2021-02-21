import firebase from "firebase/app"

export default {
  actions:{
    async fetchCategories({commit, dispatch}){
      try{
        const uid = await dispatch('getUid')
        const categories = (await firebase.database().ref(`/users/${uid}/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      }catch(e){
        commit('EditError', e)
        throw e
      }
    },
    async updateCategory({commit, dispatch},{title,limit, id}){
      console.log('UpdateCategory category.js')
      try{
        const uid = await dispatch('getUid')
        console.log(uid)
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title,limit}) //чилд обращается в обехкту в бд п ИД. упдейт его обноялвет
        console.log("category.js после firebase")
      }catch(e){
        commit('EditErr', e)
        throw e
      }
    },
    async createCategory({commit, dispatch},{title,limit}){
      try{
        const uid = await dispatch('getUid')
        console.log(uid)
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({title,limit})
        return {
          title,
          limit,
          id:category.key}
      }catch(e){
        commit('setError', e)
        throw e
      }
    }

  }
}
