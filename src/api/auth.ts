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
        method: 'GET'
      },
      query: { social, remember: remember },
      token
    }),
  logout: () => auth.fetch<Responselogout>({ subInput: '/logout' }),
  getAccessToken: () => auth.fetch<ResponseAccessToken>({subInput: '/access_token' }),
  test: () => auth.fetch({ subInput: '/test', token: true })
} as const

export default AUTH