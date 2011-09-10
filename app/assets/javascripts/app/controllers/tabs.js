Travis.Controllers.Tabs = SC.Object.extend({
  views: {
  },

  init: function() {
    SC.run.later(this.updateTimes.bind(this), 2000);
  },

  activate: function(tab) {
    if(!this.views[tab]) this.views[tab] = this.create(tab).appendTo('#tab_' + tab + ' .tab');
    if (this.active !== tab) {
      this.active = tab;
      this.setVisible(tab);
    }
  },

  setVisible: function(tab) {
    var selector = this.selector;
    SC.run.next(function() {
      $('.tabs > li', selector).removeClass('active');
      $('#tab_' + tab, selector).addClass('active');
    });
  },

  toggle: function(tab, visible) {
    $('#tab_' + tab)[visible ? 'addClass' : 'removeClass']('display');
  },

  create: function(name) {
    return SC.View.create($.extend({ controller: this.controller }, this.tabs[name]));
  },

  destroy: function() {
    this.view && this.view.destroy();
  },

  updateTimes: function() {
    var view = this.views[this.active];
    if(view) {
      var content = view.get('content');
      if(SC.isArray(content)) {
        content.forEach(function(value) { value.updateTimes() });
      } else if(content) {
        content.updateTimes();
      }
    }
    SC.run.later(this.updateTimes.bind(this), 2000);
  }
});