define([
  'dojo/_base/declare',
  'dojo/topic',
  'dojo/dom',
  'dojo/dom-construct',

  'esri/dijit/Measurement',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/Template.html'
], function(
  declare, topic,
  dom, domConstruct,
  Measurement,
  _WidgetBase, _TemplatedMixin,
  template
) {
  return declare([_WidgetBase, _TemplatedMixin], {
      templateString: template,

      constructor: function() {
        this.toolHidden = true;
      },

      postCreate: function() {
        var target = dom.byId('map_root');
        var node = domConstruct.create('div', {
          className: 'measurement-container'
        }, target);
        this.measure = new Measurement({
          map: this.get('map')
        }, node);
        this.measure.startup();
        this.measure.hide();
        this.own(topic.subscribe('widget-tool-show', function(a) {
          if (a.type !== 'measurement' && !this.toolHidden) {
            this.toggle();
          }
        }.bind(this)));
      },

      toggle: function(e) {
        if (e) e.preventDefault();
        if (this.toolHidden) {
          topic.publish('widget-tool-show', { tool: 'measurement'  });
          this.measure.show();

        } else {
          topic.publish('widget-tool-hide', { tool: 'measurement'  });
          this.measure.hide();
        }
        this.toolHidden = !this.toolHidden;
      }
  });
});
