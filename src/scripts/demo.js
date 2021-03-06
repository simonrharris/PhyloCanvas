window.onload = function(){
 "use strict";

  // Construct tree object
  var phylocanvas = new PhyloCanvas.Tree('phylocanvas', {
    history: {
      collapsed: true
    },
    defaultCollapsed: {
      min: 30,
      max: 100,
      color: 'green'
    }
  });
  phylocanvas.showLabels = true;
  phylocanvas.hoverLabel = true;
  // phylocanvas.defaultCollapsed(30,100);
  phylocanvas.setTreeType('radial');

  // load tree via AJAX and render using default params
  // phylocanvas.load('./tree.nwk');
  phylocanvas.load('((B:0.2,(C:0.3,D:0.4)E:0.5)F:0.1)A;');

  // phylocanvas.on('historytoggle', function (e) {
  //   alert(e.isOpen ? 'history is open' : 'history is closed');
  // });

  window.phylocanvas = phylocanvas;
};
