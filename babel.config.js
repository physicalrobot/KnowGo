module.exports = {
  presets: [
    "module:metro-react-native-babel-preset", // Required for React Native
  ],
  plugins: [
    "@react-native/babel-plugin-codegen", // Correctly use as a plugin
    [
      "@babel/plugin-transform-class-properties",
      { loose: true }, // Use loose mode for class properties
    ],
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      "@babel/plugin-transform-private-methods",
      { loose: true }, // Use loose mode for private methods
    ],
    [
      "@babel/plugin-transform-private-property-in-object",
      { loose: true }, // Use loose mode for private properties
    ],
    "react-native-reanimated/plugin", // Always keep this plugin last
  ],
};
