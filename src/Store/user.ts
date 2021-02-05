import { ref, shallowReactive } from 'vue'
import { updateBottomAlert } from '@/Store/bottomAlert'
import AUTH from '@/api/auth'
import { access_token_key } from '@/config.json'

function protectAccessToken (flag: 'encode' | 'decode', token: string) {
  if (flag === 'encode') {
    return token.split('.').map((val, index) => (index === 2) ? access_token_key + val + access_token_key : val).join('.')
  } else {
    const removeTrashRegExp = new RegExp(`(${access_token_key}$|^${access_token_key})`, 'g')
    return token.split('.').map((val, index) => (index === 2) ? val.replace(removeTrashRegExp, '') : val).join('.')
  }
}
const getValueFromStorage = (key: keyof UserStore) => localStorage.getItem(key) || ''
const saveValueAtLocalStorage = (userObj: UserStore) => {
  for (const [key, val] of Object.entries(userObj)) {
    const saveVal  = (key === 'access_token')? protectAccessToken('encode', val) : val
    localStorage.setItem(key, saveVal)
  }
}

let user = shallowReactive<UserStore>({
  id: parseInt(getValueFromStorage('id') || '-1'),
  name: getValueFromStorage('name'),
  imgUrl: getValueFromStorage('imgUrl'),
  access_token: getValueFromStorage('access_token'),
  type: getValueFromStorage('type')
})
const isSignedIn = ref(false)

let refreshTimer = -1

// ================ arrow functions are utils, default function is mutation
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
const getTokenPayload = (token: string) => JSON.parse(atob(token.split('.')[1])) as TokenPayload
const getAccessTokenRemainTime = (payload: TokenPayload) => {
  const nowDate = (new Date()).valueOf()
  const exp = (new Date(payload.exp * 1000)).valueOf()

  return exp - nowDate
}

const floatWellcomeText = () => updateBottomAlert(`어서오세요 ${user.name}님!`)

// ================ mutation functions
function useLogin() {
  const rememberDevice = ref(false)
  const processing = ref(false)

  const login = async (type: 'google') => {
    processing.value = true

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
        remember: rememberDevice.value
      })

      user.id = res.user.id
      user.name = res.user.name
      user.imgUrl = res.user.imgUrl
      user.access_token = res.accessToken
      user.type = 'google'
      isSignedIn.value = true

      saveValueAtLocalStorage(user)
      floatWellcomeText()
    }

    processing.value = false
  }

  return {
    processing,
    rememberDevice,
    login
  }
}
async function logout(infoText?: string) {
  if (typeof infoText !== 'string') infoText = `담에봐요 ${user.name}님!`

  clearTimeout(refreshTimer)
  const googleAuth = await getGoogleAuth() as gapi.auth2.GoogleAuth
  user = { id: -1, name: '', imgUrl: '', access_token: '', type: '' }
  localStorage.clear()
  isSignedIn.value = false
  googleAuth.signOut()
  await AUTH.logout()

  updateBottomAlert(infoText)
}

// ================ cycle
const setGetAccessTokenTimer = (nextMS: number, cb: Function) => {
  if (refreshTimer !== -1) clearTimeout(refreshTimer)

  console.log(`request access_token after ${nextMS} ms`)
  refreshTimer = setTimeout(() => {
    cb()
    refreshTimer = -1
  }, nextMS)
}
const getAccessTokenWhenEixstAccessToken = async () => {
  if (!user.access_token) return false

  const res = await AUTH.getAccessToken()
  if (!res.access_token) {
    logout('세션이 만료되었습니다. 다시 로그인해주세요')
    return false
  }

  const newATPayload = getTokenPayload(res.access_token)
  const prevATPayload = getTokenPayload(user.access_token)

  if (newATPayload.ui !== prevATPayload.ui) {
    logout('유효하지 않은 토큰, 다시 로그인해주세요')
    return false
  }

  isSignedIn.value = true
  user.access_token = res.access_token
  localStorage.setItem('access_token' as keyof UserStore, protectAccessToken('encode', res.access_token))
  setGetAccessTokenTimer(getAccessTokenRemainTime(newATPayload) - 1, getAccessTokenWhenEixstAccessToken)
  floatWellcomeText()
}

function firstInitHomepage() {
  if (!user.access_token) return false
  if (user.id === -1) {
    logout()
    return false
  }

  const payload = getTokenPayload(user.access_token)
  const remainTime = getAccessTokenRemainTime(payload)
  floatWellcomeText()
  isSignedIn.value = true

  if (remainTime < 0) {
    getAccessTokenWhenEixstAccessToken()
  } else {
    setGetAccessTokenTimer(remainTime - 1, getAccessTokenWhenEixstAccessToken)
  }
}

export {
  user as default,
  user,
  isSignedIn,
  useLogin,
  logout,
  firstInitHomepage,
  protectAccessToken
}