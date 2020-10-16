/* eslint-disable consistent-return */
/* eslint-disable global-require */
const config = {
  projectName: 'taro',
  date: '2020-1-1',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  terser: {
    enable: true,
    config: {
      // 配置项同 https://github.com/terser/terser#minify-options
    }
  },
  csso: {
    enable: true,
    config: {
      // 配置项同 https://github.com/css/csso#minifysource-options
    }
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {
          selectorBlackList: [
          ]
        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      // cssModules: {
      //   enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
      //   config: {
      //     namingPattern: 'module', // 转换模式，取值为 global/module
      //     generateScopedName: '[name]___[hash:base64:5]'
      //   }
      // }
    },

    lessLoaderOption: {
      strictMath: true,
      noIeCompat: true,
      modifyVars: {
        // less 主题
        'hack': `true; @import "~@/assets/theme.less";`
      }
    },
    cssLoaderOption: {
      modules: {
        auto: /.less$/i,
        mode: 'local',
        localIdentName: '[name]_[local]_[hash:base64:5]',
        // @ts-ignore
        getLocalIdent: (context, localIdentName, localName) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('app.less') ||
            context.resourcePath.includes('theme.less')
          ) {
            return localName;
          }
        },
      }
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      // cssModules: {
      //   enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      //   config: {
      //     namingPattern: 'module', // 转换模式，取值为 global/module
      //     generateScopedName: '[name]__[local]___[hash:base64:5]'
      //   }
      // }
    },
    lessLoaderOption: {
      strictMath: true,
      noIeCompat: true,
      modifyVars: {
        // less 主题
        'hack': `true; @import "~@/assets/theme.less";`
      }
    },
    cssLoaderOption: {
      modules: {
        mode: 'local',
        localIdentName: '[name]_[local]_[hash:base64:5]',
        // @ts-ignore
        getLocalIdent: (context, localIdentName, localName) => {
          if (
            context.resourcePath.includes('node_modules') ||
            context.resourcePath.includes('app.less') ||
            context.resourcePath.includes('theme.less')
          ) {
            return localName;
          }
        },
      }
    },
  },
  alias: {
    '@/pages': require('path').resolve(__dirname, '..', 'src/pages'),
    '@/models': require('path').resolve(__dirname, '..', 'src/models'),
    '@/assets': require('path').resolve(__dirname, '..', 'src/assets'),
    '@/image': require('path').resolve(__dirname, '..', 'src/image'),
    '@/config': require('path').resolve(__dirname, '..', 'src/config'),
    '@/components': require('path').resolve(__dirname, '..', 'src/components'),
    '@/service': require('path').resolve(__dirname, '..', 'src/service'),
    '@/utils': require('path').resolve(__dirname, '..', 'src/utils'),
    '@/package': require('path').resolve(__dirname, '..', 'package.json'),
    '@/project': require('path').resolve(__dirname, '..', 'project.config.json')
  }
}

module.exports = (merge) => {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
