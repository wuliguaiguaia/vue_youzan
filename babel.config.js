module.export = {
  presets: [
    "@vue/app", {
      "modules": false
    }
  ],
  plugins: [
    "component", [{
      "libraryName": "mint-ui",
      "style": true
    }]
  ]
}