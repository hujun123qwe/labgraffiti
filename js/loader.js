/*
  Used in api.py when importing graffiti as python module.
  Notice that unlike main.js this doesn't return  "load_ipython_extension" call
*/

define([], () => {
  if (window.Graffiti !== undefined) {
    console.log('Graffiti already instantiated, not reinitializing');
    console.log('Test');
    return;
  }
  require(['jupytergraffiti/js/initExtension.js']);
  console.log('HJ:loader.js');
});
