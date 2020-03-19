const postcssPresetEnv = require('postcss-preset-env');
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const postcssCustomProperties = require('postcss-custom-properties');

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {
        'nesting-rules': true,
      },
    }),
    tailwindcss('./tailwind.config.js'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production'
      ? purgecss({
        content: ['./src/**/*.vue', './src/**/*.js'],
        extractors: [
          {
            extractor: class {
              static extract (content) {
                return content.match(/[A-Za-z0-9-_:/]+/g) || [];
              }
            },
            extensions: ['vue', 'js'],
          },
        ],
        whitelistPatterns: [/vc-text/, /vc-bg/, /vc-border/, /^vc-rounded/],
      })
      : '',
    postcssCustomProperties({
      importFrom: [
        {
          customProperties: {
            '--slide-translate': '22px',
            '--slide-duration': '0.15s',
            '--slide-timing': 'ease',
            '--header-padding': '10px 10px 0 10px',
            '--title-padding': '0 8px',
            '--arrows-padding': '8px 10px',
            '--arrow-font-size': '26px',
            '--weekday-padding': '5px 0',
            '--weeks-padding': '5px 6px 7px 6px',
            '--nav-container-width': '170px',
            '--day-min-height': '28px',
            '--day-content-width': '28px',
            '--day-content-height': '28px',
            '--day-content-margin': '1.6px auto',
            '--day-content-transition-time': '0.13s ease-in',
            '--day-content-bg-color-hover': 'hsla(211, 25%, 84%, 0.3)',
            '--day-content-dark-bg-color-hover': 'hsla(216, 15%, 52%, 0.3)',
            '--day-content-bg-color-focus': 'hsla(211, 25%, 84%, 0.4)',
            '--day-content-dark-bg-color-focus': 'hsla(216, 15%, 52%, 0.4)',
            '--highlight-height': '28px',
            '--dot-diameter': '5px',
            '--dot-border-radius': '50%',
            '--dot-spacing': '3px',
            '--bar-height': '3px',
            '--bars-width': '75%'
          }
        }
      ]
    })
  ],
};
