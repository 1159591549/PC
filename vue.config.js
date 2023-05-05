module.exports = {
    devServer: {
      disableHostCheck: true, 
      proxy: {
        '^/common/': {
          target: 'http://127.0.0.1:8020',
        },
        '^/api/': {
          target: 'http://127.0.0.1:8020',
        },
      }
    }
}