const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@assets': path.join(__dirname, 'src', 'assets'),
        '@images': path.join(__dirname, 'src', 'assets', 'images')
      },
      extensions: ['.js', '.vue', '.json']
    }
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import '@assets/styles/common/mixin.scss';
          @import '@assets/styles/common/variables.scss';
        `,
      },
      sass: {
        prependData: `
          @import '@assets/styles/common/mixin.scss'
          @import '@assets/styles/common/variables.scss'
        `,
      }
    },
    sourceMap: true
  }
}