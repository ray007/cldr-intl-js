if (!Intl.NumberFormat) {

Intl.NumberFormat = function(locales, options) {
	if (!(this instanceof Intl.NumberFormat)) return new Intl.NumberFormat(locales, options);
	
	var g = locales ? Globalize( locales ) : Globalize;
	this.format = g.numberFormatter( options );
};

Intl.NumberFormat.prototype.resolvedOptions = function() {};

}