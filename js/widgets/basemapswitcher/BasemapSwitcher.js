define([
  'dojo/_base/declare',
  'dojo/dom',
  'dojo/dom-construct',

  'esri/domUtils',
  'esri/dijit/BasemapGallery',

  'dijit/_WidgetBase',
  'dijit/_TemplatedMixin',
  'dojo/text!./templates/BasemapSwitcher.html'
], function(
  declare, dom, domConstruct,
  esriDomUtils, BasemapGallery,
  _WidgetBase, _TemplatedMixin,
  template
) {
  return declare([_WidgetBase, _TemplatedMixin], {
    templateString: template,

    postCreate: function() {
      var node = dom.byId('map_root');
      esriDomUtils.hide(this.domNode);
      domConstruct.place(this.domNode, node);
      var map = this.get('map');
      this.gallery = new BasemapGallery({
        map: map,
        showArcGISBasemaps: true
      }, this.bmNode);
      this.gallery.startup();
    },

    hide: function() {
      esriDomUtils.hide(this.domNode);
    },

    show: function() {
      esriDomUtils.show(this.domNode);
    }
  });
});
