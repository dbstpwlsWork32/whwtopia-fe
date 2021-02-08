import Maker from './utils/maker'

type CreateDto = {
  name: string;
  category_id: number;
}

const gallery = new Maker(process.env.VUE_APP_API_URL + '/gallery')
const GALLERY = {
  create: (
    body: CreateDto
  ) =>
    gallery.fetch({
      subInput: '/create',
      init: {
        method: 'POST'
      },
      token: true,
      body
    }),
} as const

export default GALLERY