define([
  'dojo/_base/declare',
  'dojo/topic',
  'dojo/dom',
  'dojo/dom-construct',

  './BasemapSwitcher',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/Template.html'
], function(
  declare, topic,
  dom, domConstruct,
  BasemapSwitcher,
  _WidgetBase, _TemplatedMixin,
  template
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    constructor: function() {
      this.toolHidden = true;
    },

    postCreate: function() {
      var target = this.domNode;
      var node = domConstruct.create('div', {
        className: 'basemaps-container'
      }, target);
      this.switcher = new BasemapSwitcher({
        map: this.get('map')
      });
      this.own(topic.subscribe('widget-tool-show', function(a) {
        if (a.type !== 'basemaps' && !this.toolHidden) {
          this.toggle();
        }
      }.bind(this)));
    },

    toggle: function(e) {
      if (e) e.preventDefault();
      if (this.toolHidden) {
        topic.publish('widget-tool-show', { tool: 'basemaps'  });
        this.switcher.show();
      } else {
        topic.publish('widget-tool-hide', { tool: 'basemaps'  });
        this.switcher.hide();
      }
      this.toolHidden = !this.toolHidden;
    }
  });
});
