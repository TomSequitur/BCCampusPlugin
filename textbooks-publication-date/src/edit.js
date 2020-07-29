/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object} [props]           Properties passed from the editor.
 * @param {string} [props.className] Class name generated for the block.
 *
 * @return {WPElement} Element to render.
 */
// import { Fragment, createElement } from '@wordpress/element';
// import { InspectorControls } from '@wordpress/wp-editor';
// import { Panel, PanelBody, PanelRow, DateTimePicker } from '@wordpress/components';

import { DateTimePicker } from '@wordpress/components';
import { __experimentalGetSettings } from '@wordpress/date';
import { withState } from '@wordpress/compose';


export default function Edit( { className } ) {
	// const { datetime } = attributes;

	// const onUpdateDate = ( dateTime ) => {
	//   var newDateTime = moment(dateTime).format( 'YYYY-MM-DD HH:mm' );
	//   setAttributes( { datetime: newDateTime } );
	// };

	const MyDateTimePicker = withState( {
		date: new Date(),
	} )( ( { date, setState } ) => {
		const settings = __experimentalGetSettings();
		// To know if the current timezone is a 12 hour time with look for an "a" in the time format.
		// We also make sure this a is not escaped by a "/".
		const is12HourTime = /a(?!\\)/i.test(
			settings.formats.time
				.toLowerCase() // Test only the lower case a
				.replace( /\\\\/g, '' ) // Replace "//" with empty strings
				.split( '' ).reverse().join( '' ) // Reverse the string and test for "a" not followed by a slash
		);
		return (
			<DateTimePicker
				currentDate={ date }
				onChange={ ( date ) => setState( { date } ) }
				is12Hour={ is12HourTime }
			/>
		);
	} );

	return MyDateTimePicker;
}
