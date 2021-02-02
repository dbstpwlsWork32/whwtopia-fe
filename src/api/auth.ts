import Maker from './utils/maker'

const auth = new Maker(process.env.VUE_APP_API_URL + '/auth')

const AUTH = {
  socialLogin: (
    { token, social, rememberDevice }:
    { token: string; social: 'google'; rememberDevice: boolean }
  ) =>
    auth.fetch<ResponseUserLogin>({
      subInput: '/social_login',
      init: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
      query: { social, rememberDevice }
    })
} as const

export default AUTH