module.exports = function(toolbarNode) {
  return function(scribe) {

    function showMenu(e) {
      var selection = new scribe.api.Selection();

      if (!selection.range || selection.range.collapsed) return;

      e.stopPropagation();

      var rect = selection.range.getBoundingClientRect();
      var parentRect = toolbarNode.parentNode.getBoundingClientRect();

      toolbarNode.style.opacity = '1';
      toolbarNode.style.top = (rect.top - parentRect.top - toolbarNode.clientHeight) + 'px';
      toolbarNode.style.left = (rect.left - parentRect.left) + 'px';

      return false;
    }

    function hideMenu(e) {
      var selection = new scribe.api.Selection();

      if (toolbarNode && !toolbarNode.contains(e.target)) {
        toolbarNode.style.opacity = '0';
        toolbarNode.style.top = '-9999px';
        toolbarNode.style.left = '0px';
      } else {
        showMenu(e);
      }

      return false;
    }


    scribe.el.addEventListener('mouseup', showMenu);
    scribe.el.addEventListener('keyup', showMenu);
    // scribe.el.addEventListener('', showMenu);

    window.addEventListener('mouseup', hideMenu);
    window.addEventListener('keyup', hideMenu);
  };
};
