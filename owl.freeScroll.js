/**
 * Plugin Name
 * @since 2.0.0
 */
;(function ( $, window, document, undefined ) {
    var FreeScroll = function(scope){
      this.owl = scope;
      this.owl._options = $.extend(FreeScroll.Defaults, this.owl.settings);

      //link callback events with owl carousel here
      this._handlers = {
        'initialized.owl.carousel': $.proxy(function(e) {
  				if(this.owl.settings.freeScroll) {
            this.enableFreeScroll();
          } else {
            this.disableFreeScroll();
          }
  			}, this),
  			'resized.owl.carousel': $.proxy(function(e) {
  				if(this.owl.settings.freeScroll) {
            this.enableFreeScroll();
          } else {
            this.disableFreeScroll();
          }
  			}, this)
  		};
      this.owl.$element.on(this._handlers);
    }
    FreeScroll.Defaults = {
        freeScroll: 'false'
    }
    //methods:
    FreeScroll.prototype.toggleFreeScroll = function() {

    }

    FreeScroll.prototype.enableFreeScroll = function(){
      this.owl.$stage.off('touchstart');
      this.owl.$stage.parent(".owl-stage-outer").addClass("freeScroll").attr("style", "overflow-x:scroll;-webkit-overflow-scrolling: touch;");
      this.owl.$stage.css("transform", "translate3d(0,0,0)");
      this.owl.$stage.find(".cloned").each(function(e) {
        $stage = $(this).parent();
        $stage.width($stage.width() - $(this).outerWidth());
        $(this).remove();
      });
    }

    FreeScroll.prototype.disableFreeScroll = function() {
      this.owl.$stage.on('touchstart', $.proxy(function(event) { this.eventsRouter(event) }, this.owl));
      this.owl.$stage.parent(".owl-stage-outer").removeClass("freeScroll")
      this.owl.$stage.parent(".owl-stage-outer").scrollLeft(0);
      this.owl.$stage.parent(".owl-stage-outer").attr("style", "overflow-x:hidden;");
    }
    //destroy:
    FreeScroll.prototype.destroy = function(){
        //events here
    };
    $.fn.owlCarousel.Constructor.Plugins['FreeScroll'] = FreeScroll;
})( window.Zepto || window.jQuery, window,  document );
