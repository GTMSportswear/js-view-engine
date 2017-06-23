System.config({
  baseURL: "/",
  defaultJSExtensions: true,
  transpiler: "traceur",
  paths: {
    "handlebars": "node_modules/handlebars/dist/handlebars.js",
    "systemjs": "node_modules/systemjs/dist/system.js",
    "traceur": "node_modules/traceur/bin/traceur.js",
    "github:*": "/github/*"
  },

  map: {
    "gtmsportswear/js-local-storage-manager": "github:gtmsportswear/js-local-storage-manager@1.0.2",
    "gtmsportswear/js-xhr": "github:gtmsportswear/js-xhr@2.0.1"
  }
});
