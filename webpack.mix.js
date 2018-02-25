// ======================================================================
// slateengine.dev <http://slateengine.com | <hello@hashandsalt.com>
// ======================================================================

const {
  mix
} = require('laravel-mix')
const SpritesmithPlugin = require('webpack-spritesmith');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

// ======================================================================
// Mix Settings
// ======================================================================

// BrowserSync
// ======================================================================
mix.browserSync({
  proxy: 'engine.dev',
  files: [
    "public/assets/js/**/*.js",
    "public/assets/css/**/*.css",
    "public/**/*.html"
  ]
})

// Copy Files
// ======================================================================
mix.copyDirectory('src/fonts', 'public/assets/fonts');
mix.copyDirectory('src/images/single', 'public/assets/images');

// Javascript
// ======================================================================
mix.js('src/js/site.js', 'public/assets/js')

// SASS
// ======================================================================
mix.sass('src/sass/site.scss', 'public/assets/css', {
  includePaths: ["node_modules/slatecore/slate", "node_modules/normalize.css"],
  precision: 10
});

// Sourcemaps
// ======================================================================
mix.sourceMaps()

// ======================================================================
// Mix Options
// ======================================================================
mix.options({
  processCssUrls: false,
  postCss: [
    require('autoprefixer')(),
  ],
})

// ======================================================================
// Custom Webpack Config
// ======================================================================
mix.webpackConfig({
  plugins: [

    // Generate Sprites
    // ================
    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/images/sprites'),
        glob: '*.png'
      },
      target: {
        image: path.resolve(__dirname, 'public/assets/images/sprite.png'),
        css: path.resolve(__dirname, 'src/sass/components/partials/_P-sprite.scss')
      },
      apiOptions: {
        cssImageRef: "/assets/images/sprite.png"
      },
      retina: "@2x",
    }),

    // Favicons
    // ================
    new FaviconsWebpackPlugin({
      // Your source logo
      logo: './src/favicon/favicon.svg',
      // The prefix for all image files (might be a folder or a name)
      prefix: './public/assets/favicon/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: false,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#222222',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: 'Slate Engine',
      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ]
});
