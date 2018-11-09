!function(e){"use strict";"function"==typeof define&&define.amd?define(["jquery","tmpl","./jquery.fileupload-image","./jquery.fileupload-audio","./jquery.fileupload-video","./jquery.fileupload-validate"],e):e(window.jQuery,window.tmpl)}(function($,e){"use strict";$.blueimp.fileupload.prototype._specialOptions.push("filesContainer","uploadTemplateId","downloadTemplateId"),$.widget("blueimp.fileupload",$.blueimp.fileupload,{options:{autoUpload:!1,uploadTemplateId:"template-upload",downloadTemplateId:"template-download",filesContainer:void 0,prependFiles:!1,dataType:"json",getNumberOfFiles:function(){return this.filesContainer.children().not(".processing").length},getFilesFromResponse:function(e){return e.result&&$.isArray(e.result.files)?e.result.files:[]},add:function(e,t){if(e.isDefaultPrevented())return!1;var i=$(this),n=i.data("blueimp-fileupload")||i.data("fileupload"),o=n.options;t.context=n._renderUpload(t.files).data("data",t).addClass("processing"),o.filesContainer[o.prependFiles?"prepend":"append"](t.context),n._forceReflow(t.context),n._transition(t.context),t.process(function(){return i.fileupload("process",t)}).always(function(){t.context.each(function(e){$(this).find(".size").text(n._formatFileSize(t.files[e].size))}).removeClass("processing"),n._renderPreviews(t)}).done(function(){t.context.find(".start").prop("disabled",!1),!1!==n._trigger("added",e,t)&&(o.autoUpload||t.autoUpload)&&!1!==t.autoUpload&&t.submit()}).fail(function(){t.files.error&&t.context.each(function(e){var i=t.files[e].error;i&&$(this).find(".error").text(i)})})},send:function(e,t){if(e.isDefaultPrevented())return!1;var i=$(this).data("blueimp-fileupload")||$(this).data("fileupload");return t.context&&t.dataType&&"iframe"===t.dataType.substr(0,6)&&t.context.find(".progress").addClass(!$.support.transition&&"progress-animated").attr("aria-valuenow",100).children().first().css("width","100%"),i._trigger("sent",e,t)},done:function(e,t){if(e.isDefaultPrevented())return!1;var i,n,o=$(this).data("blueimp-fileupload")||$(this).data("fileupload"),r=t.getFilesFromResponse||o.options.getFilesFromResponse,a=r(t);t.context?t.context.each(function(r){var s=a[r]||{error:"Empty file upload result"};n=o._addFinishedDeferreds(),o._transition($(this)).done(function(){var r=$(this);i=o._renderDownload([s]).replaceAll(r),o._forceReflow(i),o._transition(i).done(function(){t.context=$(this),o._trigger("completed",e,t),o._trigger("finished",e,t),n.resolve()})})}):(i=o._renderDownload(a)[o.options.prependFiles?"prependTo":"appendTo"](o.options.filesContainer),o._forceReflow(i),n=o._addFinishedDeferreds(),o._transition(i).done(function(){t.context=$(this),o._trigger("completed",e,t),o._trigger("finished",e,t),n.resolve()}))},fail:function(e,t){if(e.isDefaultPrevented())return!1;var i,n,o=$(this).data("blueimp-fileupload")||$(this).data("fileupload");t.context?t.context.each(function(r){if("abort"!==t.errorThrown){var a=t.files[r];a.error=a.error||t.errorThrown||!0,n=o._addFinishedDeferreds(),o._transition($(this)).done(function(){var r=$(this);i=o._renderDownload([a]).replaceAll(r),o._forceReflow(i),o._transition(i).done(function(){t.context=$(this),o._trigger("failed",e,t),o._trigger("finished",e,t),n.resolve()})})}else n=o._addFinishedDeferreds(),o._transition($(this)).done(function(){$(this).remove(),o._trigger("failed",e,t),o._trigger("finished",e,t),n.resolve()})}):"abort"!==t.errorThrown?(t.context=o._renderUpload(t.files)[o.options.prependFiles?"prependTo":"appendTo"](o.options.filesContainer).data("data",t),o._forceReflow(t.context),n=o._addFinishedDeferreds(),o._transition(t.context).done(function(){t.context=$(this),o._trigger("failed",e,t),o._trigger("finished",e,t),n.resolve()})):(o._trigger("failed",e,t),o._trigger("finished",e,t),o._addFinishedDeferreds().resolve())},progress:function(e,t){if(e.isDefaultPrevented())return!1;var i=Math.floor(t.loaded/t.total*100);t.context&&t.context.each(function(){$(this).find(".progress").attr("aria-valuenow",i).children().first().css("width",i+"%")})},progressall:function(e,t){if(e.isDefaultPrevented())return!1;var i=$(this),n=Math.floor(t.loaded/t.total*100),o=i.find(".fileupload-progress"),r=o.find(".progress-extended");r.length&&r.html((i.data("blueimp-fileupload")||i.data("fileupload"))._renderExtendedProgress(t)),o.find(".progress").attr("aria-valuenow",n).children().first().css("width",n+"%")},start:function(e){if(e.isDefaultPrevented())return!1;var t=$(this).data("blueimp-fileupload")||$(this).data("fileupload");t._resetFinishedDeferreds(),t._transition($(this).find(".fileupload-progress")).done(function(){t._trigger("started",e)})},stop:function(e){if(e.isDefaultPrevented())return!1;var t=$(this).data("blueimp-fileupload")||$(this).data("fileupload"),i=t._addFinishedDeferreds();$.when.apply($,t._getFinishedDeferreds()).done(function(){t._trigger("stopped",e)}),t._transition($(this).find(".fileupload-progress")).done(function(){$(this).find(".progress").attr("aria-valuenow","0").children().first().css("width","0%"),$(this).find(".progress-extended").html("&nbsp;"),i.resolve()})},processstart:function(e){if(e.isDefaultPrevented())return!1;$(this).addClass("fileupload-processing")},processstop:function(e){if(e.isDefaultPrevented())return!1;$(this).removeClass("fileupload-processing")},destroy:function(e,t){if(e.isDefaultPrevented())return!1;var i=$(this).data("blueimp-fileupload")||$(this).data("fileupload"),n=function(){i._transition(t.context).done(function(){$(this).remove(),i._trigger("destroyed",e,t)})};t.url?(t.dataType=t.dataType||i.options.dataType,$.ajax(t).done(n).fail(function(){i._trigger("destroyfailed",e,t)})):n()}},_resetFinishedDeferreds:function(){this._finishedUploads=[]},_addFinishedDeferreds:function(e){return e||(e=$.Deferred()),this._finishedUploads.push(e),e},_getFinishedDeferreds:function(){return this._finishedUploads},_enableDragToDesktop:function(){var e=$(this),t=e.prop("href"),i=e.prop("download");e.bind("dragstart",function(e){try{e.originalEvent.dataTransfer.setData("DownloadURL",["application/octet-stream",i,t].join(":"))}catch(e){}})},_formatFileSize:function(e){return"number"!=typeof e?"":e>=1e9?(e/1e9).toFixed(2)+" GB":e>=1e6?(e/1e6).toFixed(2)+" MB":(e/1e3).toFixed(2)+" KB"},_formatBitrate:function(e){return"number"!=typeof e?"":e>=1e9?(e/1e9).toFixed(2)+" Gbit/s":e>=1e6?(e/1e6).toFixed(2)+" Mbit/s":e>=1e3?(e/1e3).toFixed(2)+" kbit/s":e.toFixed(2)+" bit/s"},_formatTime:function(e){var t=new Date(1e3*e),i=Math.floor(e/86400);return(i=i?i+"d ":"")+("0"+t.getUTCHours()).slice(-2)+":"+("0"+t.getUTCMinutes()).slice(-2)+":"+("0"+t.getUTCSeconds()).slice(-2)},_formatPercentage:function(e){return(100*e).toFixed(2)+" %"},_renderExtendedProgress:function(e){return this._formatBitrate(e.bitrate)+" | "+this._formatTime(8*(e.total-e.loaded)/e.bitrate)+" | "+this._formatPercentage(e.loaded/e.total)+" | "+this._formatFileSize(e.loaded)+" / "+this._formatFileSize(e.total)},_renderTemplate:function(e,t){if(!e)return $();var i=e({files:t,formatFileSize:this._formatFileSize,options:this.options});return i instanceof $?i:$(this.options.templatesContainer).html(i).children()},_renderPreviews:function(e){e.context.find(".preview").each(function(t,i){$(i).append(e.files[t].preview)})},_renderUpload:function(e){return this._renderTemplate(this.options.uploadTemplate,e)},_renderDownload:function(e){return this._renderTemplate(this.options.downloadTemplate,e).find("a[download]").each(this._enableDragToDesktop).end()},_startHandler:function(e){e.preventDefault();var t=$(e.currentTarget),i=t.closest(".template-upload"),n=i.data("data");t.prop("disabled",!0),n&&n.submit&&n.submit()},_cancelHandler:function(e){e.preventDefault();var t=$(e.currentTarget).closest(".template-upload,.template-download"),i=t.data("data")||{};i.context=i.context||t,i.abort?i.abort():(i.errorThrown="abort",this._trigger("fail",e,i))},_deleteHandler:function(e){e.preventDefault();var t=$(e.currentTarget);this._trigger("destroy",e,$.extend({context:t.closest(".template-download"),type:"DELETE"},t.data()))},_forceReflow:function(e){return $.support.transition&&e.length&&e[0].offsetWidth},_transition:function(e){var t=$.Deferred();return $.support.transition&&e.hasClass("fade")&&e.is(":visible")?e.bind($.support.transition.end,function(i){i.target===e[0]&&(e.unbind($.support.transition.end),t.resolveWith(e))}).toggleClass("in"):(e.toggleClass("in"),t.resolveWith(e)),t},_initButtonBarEventHandlers:function(){var e=this.element.find(".fileupload-buttonbar"),t=this.options.filesContainer;this._on(e.find(".start"),{click:function(e){e.preventDefault(),t.find(".start").click()}}),this._on(e.find(".cancel"),{click:function(e){e.preventDefault(),t.find(".cancel").click()}}),this._on(e.find(".delete"),{click:function(i){i.preventDefault(),t.find(".toggle:checked").closest(".template-download").find(".delete").click(),e.find(".toggle").prop("checked",!1)}}),this._on(e.find(".toggle"),{change:function(e){t.find(".toggle").prop("checked",$(e.currentTarget).is(":checked"))}})},_destroyButtonBarEventHandlers:function(){this._off(this.element.find(".fileupload-buttonbar").find(".start, .cancel, .delete"),"click"),this._off(this.element.find(".fileupload-buttonbar .toggle"),"change.")},_initEventHandlers:function(){this._super(),this._on(this.options.filesContainer,{"click .start":this._startHandler,"click .cancel":this._cancelHandler,"click .delete":this._deleteHandler}),this._initButtonBarEventHandlers()},_destroyEventHandlers:function(){this._destroyButtonBarEventHandlers(),this._off(this.options.filesContainer,"click"),this._super()},_enableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!1).parent().removeClass("disabled")},_disableFileInputButton:function(){this.element.find(".fileinput-button input").prop("disabled",!0).parent().addClass("disabled")},_initTemplates:function(){var t=this.options;t.templatesContainer=this.document[0].createElement(t.filesContainer.prop("nodeName")),e&&(t.uploadTemplateId&&(t.uploadTemplate=e(t.uploadTemplateId)),t.downloadTemplateId&&(t.downloadTemplate=e(t.downloadTemplateId)))},_initFilesContainer:function(){var e=this.options;void 0===e.filesContainer?e.filesContainer=this.element.find(".files"):e.filesContainer instanceof $||(e.filesContainer=$(e.filesContainer))},_initSpecialOptions:function(){this._super(),this._initFilesContainer(),this._initTemplates()},_create:function(){this._super(),this._resetFinishedDeferreds(),$.support.fileInput||this._disableFileInputButton()},enable:function(){var e=!1;this.options.disabled&&(e=!0),this._super(),e&&(this.element.find("input, button").prop("disabled",!1),this._enableFileInputButton())},disable:function(){this.options.disabled||(this.element.find("input, button").prop("disabled",!0),this._disableFileInputButton()),this._super()}})});