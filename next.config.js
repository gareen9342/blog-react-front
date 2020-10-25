require('dotenv').config()
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    compress: true, // 압축 플러그인 대체
    webpack(config, { webpack }) {
        const prod = process.env.NODE_ENV === 'production'
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(
                /moment[/\\]locale$/,
                /^\.\/ko$/
            ),
        ]
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        }
        return {
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval', // 이거 안하면 소스 다 유출됨
            plugins,

            /*
                모듈 바꿀 거 잇으면 밑에 처럼 불변성을 지키면서 바꿔줘야함
            */
            // module :{
            //     ...config.module,
            //     rules : [
            //         ...config.module.rules,
            //         {

            //         }
            //     ]
            // }
        }
    },
    env: {
        BACKURL: process.env.BACKURL,
    },
})
