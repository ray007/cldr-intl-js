/**
 * get function formatting a number for given locale/options
 * @param {string|Array<string>} [locales]
 * @param {Object=} opts
 */
Number.getFmtFn = function(locales, opts) {
	var f = null;
	switch (opts.style || 'decimal') {
	case 'decimal':
	case 'percent':
		break;
	case 'currency_iso':
		opts['style'] = 'currency';
		opts['currencyDisplay'] = 'code';
		// fall-through
	case 'currency':
		if (!opts['currency']) // TODO: find currency for locale
			opts['currency'] = 'USD'; // ISO 4217 currency code
		break;
	case 'scientific':
		f = Number.getFmtFnScientific(locales, opts);
		break;
	// TODO: create formatters for unsupported styles
	case 'ordinal':
	case 'short': // compact-short
	case 'long': // compact-compact
	case 'spellout':
	default:
		opts.style = 'decimal'; // map unsupported styles to 'decimal'
		break;
	}
	if (!f) {
		var inf = new Intl.NumberFormat(locales, opts);
		f = inf.format.bind(inf);
	}
	return f;
};

/**
 * get formatter function for style "scientific"
 * @param {string|Array<string>} [locales]
 * @param {Object=} opts
 */
Number.getFmtFnScientific = function(locales, opts) {
	// scientific: "minimumIntegerDigits" shift result from toExponential()
	var ni = opts.minimumIntegerDigits || 1, fac = 1;
	var fmtBase = Number.getFmtFn(locales, Object.assign({}, opts, {'style':'decimal'}));
	// number of integer digits defined -> adjust factor
	if (--ni) fac = +("1e" + ni);
	// generate the formatting function
	return function(fac, ni, v) {
		var s = (+v).toExponential(), i = s.indexOf('e');
		// get base and exponent
		var n0 = +(s.substr(0, i)), nExp = +(s.substr(i+1));
		//n0 *= fac; nExp -= ni;
		return this(n0 * fac) + 'E' + (nExp - ni); // ((nExp >= 0) ? ('+' + nExp) : nExp);
	}.bind(fmtBase, fac, ni);
};
