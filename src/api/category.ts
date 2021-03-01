import Maker from './utils/maker'

const category = new Maker(process.env.VUE_APP_API_URL + '/category')

const CATEGORY = {
  getAll: () =>
    category.fetch<ResponseGetCategory>({
      init: {
        method: 'GET'
      }
    })
} as const

export default CATEGORY