!function($){"use strict";var t=function(e){this.init("typeaheadjs",e,t.defaults)};$.fn.editableutils.inherit(t,$.fn.editabletypes.text),$.extend(t.prototype,{render:function(){this.renderClear(),this.setClass(),this.setAttr("placeholder"),this.$input.typeahead(this.options.typeahead),"bs3"===$.fn.editableform.engine&&(this.$input.hasClass("input-sm")&&this.$input.siblings("input.tt-hint").addClass("input-sm"),this.$input.hasClass("input-lg")&&this.$input.siblings("input.tt-hint").addClass("input-lg"))}}),t.defaults=$.extend({},$.fn.editabletypes.list.defaults,{tpl:'<input type="text">',typeahead:null,clear:!0}),$.fn.editabletypes.typeaheadjs=t}(window.jQuery);