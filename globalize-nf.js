if (Intl.NumberFormat) {

Globalize.numberFormatter =
Globalize.prototype.numberFormatter = function( options ) {
	var nf = new Intl.NumberFormat(this._locale, options);
	return nf.format.bind(nf);
};

Globalize.formatNumber =
Globalize.prototype.formatNumber = function( value, options ) {
	validateParameterPresence( value, "value" );
	validateParameterTypeNumber( value, "value" );

	return this.numberFormatter( options )( value );
};

}