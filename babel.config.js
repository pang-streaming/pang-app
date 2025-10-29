module.exports = function (api) {
    api.cache(true);
    return {
      presets: [
        ['babel-preset-expo'],
      ],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            ssr: false,
            displayName: true,
            fileName: true,
            minify: false,
            pure: true,
          },
        ],
        [
          'module-resolver',
          {
            root: ['./'],
            alias: {
              '@': './src',
            },
            extensions: [
              '.ios.ts',
              '.android.ts',
              '.ts',
              '.ios.tsx',
              '.android.tsx',
              '.tsx',
              '.jsx',
              '.js',
              '.json',
            ],
          },
        ],
        'react-native-reanimated/plugin',
      ],
    };
  };