/*
   Used by main.js and loader.js 
 */
//base/js/namespace: just Jupyter
//graffiti.js: really work function
//utils.js: many tools function on cell and others.
//state.js: state situation
//workspace 
define([
  'base/js/namespace',
  'jupytergraffiti/js/graffiti.js',
  'jupytergraffiti/js/utils.js',
  'jupytergraffiti/js/state.js',
  'jupytergraffiti/js/workspace.js'
], (Jupyter, Graffiti, utils, state, workspace) => {
  console.log('Graffiti loaded:', Graffiti);

  //declare initGraffiti function, init and set workspace
  const initGraffiti = () => { 
    state.init();
    workspace.setWorkspace().then(() => Graffiti.init());
  }

  // This ensures Jupyter.kernel.execute works
  const waitForKernelToBeReady = () => {
    window.Graffiti = Graffiti;
    
    if (Jupyter.notebook.kernel) {
      initGraffiti();
      console.log("HJ02:initExtension.js");
    } else {
      Jupyter.notebook.events.on('kernel_ready.Kernel', (e) => {
        console.log('Graffiti: kernel ready, possible kernel restart.', e);
        console.log('Graffiti: Reloading loader.js');
        // Prevent double initialization
        if (!state.getActivity()) {
          initGraffiti();
        }
        require(['jupytergraffiti/js/loader.js']);
        utils.saveNotebookDebounced();
      });
    }
  }

  // the notebook may have fully loaded before the nbextension gets loaded
  // so the nbextension would miss the `notebook_loaded.Notebook` event
  if (Jupyter.notebook._fully_loaded) {
    console.log('Graffiti: Notebook is already fully loaded.');
    waitForKernelToBeReady();
  } else {
    Jupyter.notebook.events.on('notebook_loaded.Notebook', (e) => {
      console.log('Graffiti: Notebook is loaded.');
      waitForKernelToBeReady();
    })
  } 
});
