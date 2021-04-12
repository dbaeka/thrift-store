// next.config.js
const withCSS = require('@zeit/next-css');
const withSass = require('@zeit/next-sass');
const withImages = require('next-images');

module.exports = withCSS(withSass(withImages({
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
})));

module.exports = {
    future: {
        webpack5: true,
    },
}

module.exports = withImages({
    fileExtensions: ["jpg", "jpeg", "png", "gif"],
    webpack(config, options) {
        return config
    }
})