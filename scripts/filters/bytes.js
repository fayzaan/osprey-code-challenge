angular.module( 'app.filters' )
	.filter( 'bytes', [ '$filter', function ( $filter ) {
		return function ( bytes, unit ) {
			switch( unit ) {
				case 'bytes':
					return ( bytes ).toFixed( 2 ) + ' Bytes';
				case 'kilobytes':
					return ( bytes / 1024 ).toFixed( 2 ) + ' KB';
				case 'megabytes':
					return ( bytes / 1048576 ).toFixed( 2 ) + ' MB';
				case 'gigabytes':
					return ( bytes / 1073741824 ).toFixed( 2 ) + ' GB';
				case 'terabytes':
					return ( bytes / 1099511627776 ).toFixed( 2 ) + ' TB';
			}
		}
} ] );