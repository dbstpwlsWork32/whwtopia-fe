import Maker from './utils/maker'

const auth = new Maker(process.env.VUE_APP_API_URL + '/auth')

const AUTH = {
  socialLogin: (
    { token, social, remember }:
    SocialLoginDto
  ) =>
    auth.fetch<ResponseUserLogin>({
      subInput: '/social_login',
      init: {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      },
      query: { social, remember: remember }
    })
} as const

export default AUTH