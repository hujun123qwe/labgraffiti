// Mark Graffiti as about to load, because extension should always get precedence over python API library
// in case that is also going to be loaded by Jupyter.

//what is window class?
window.Graffiti = null; 

//what is define function?
//define : we can define new name by using old one.
//arow function, and return a type of : that is another arow function
//Dose require means auto execute?

define([], () => {
  return {
    load_ipython_extension: () => {
      require(['jupytergraffiti/js/initExtension.js']);
    }
  };
});
