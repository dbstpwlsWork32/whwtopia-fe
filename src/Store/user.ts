import { computed, shallowReactive, ref } from 'vue'
import AUTH from '@/api/auth'

const getValueAtStorage = (key: keyof UserStore) => localStorage.getItem(key) || sessionStorage.getItem(key)

let user = shallowReactive<UserStore>({
  id: parseInt(getValueAtStorage('id') || '-1'),
  name: getValueAtStorage('name') || '',
  imgUrl: getValueAtStorage('imgUrl') || ''
})

const isSignedIn = computed<boolean>((): boolean => (user.id !== -1))

// ================ arrow function is utils, default function is mutation

const getGoogleAuth = () => {
  return new Promise(res => {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        /* eslint-disable @typescript-eslint/camelcase */
        client_id: '429877175426-9ojrvkhof585tsn9l32u5vqktqt094gl.apps.googleusercontent.com'
      }).then(GA => res(GA))
    })
  })
}

function useLogin() {
  const rememberDevice = ref(false)

  const login = async (type: 'google') => {
    if (type === 'google') {
      const googleAuth = await getGoogleAuth() as gapi.auth2.GoogleAuth
      const currentUser = googleAuth.currentUser.get()
    
      let googleAccessToken = ''
    
      if (currentUser.isSignedIn()) {
        // Account logged in to Whwtopia once
        googleAccessToken = currentUser.getAuthResponse().id_token
      } else {
        // first try login
        const googleUser = await googleAuth.signIn()
        googleAccessToken = googleUser.getAuthResponse().id_token
      }
    
      const res = await AUTH.socialLogin({
        token: googleAccessToken,
        social: 'google',
        rememberDevice: rememberDevice.value
      })
      console.log(res)
    }
  }

  return {
    rememberDevice,
    login
  }
}

async function logout() {
  const googleAuth = await getGoogleAuth() as gapi.auth2.GoogleAuth

  sessionStorage.clear()
  localStorage.clear()
  user = { id: -1, name: '', imgUrl: '' }
  googleAuth.signOut()
}

export {
  user as default,
  user,
  isSignedIn,
  useLogin,
  logout
}