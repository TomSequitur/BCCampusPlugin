/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { DateTimePicker } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */

// Our filter function
function addBlockClassName( props, blockType ) {
	if(blockType.name === 'create-block/textbooks-author') {
        return Object.assign( props, { className: 'textbooks-author' } );
    }
    return props;
}
wp.hooks.addFilter(
    'blocks.getSaveContent.extraProps',
    'gdt-guten-plugin/add-block-class-name',
    addBlockClassName
);

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType( 'create-block/textbooks-publication-date', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Textbooks Publication Date', 'create-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written with ESNext standard and JSX support – build step required.',
		'create-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * Attributtes
	 */
	attributes: {
		datetime: {
			type: 'string',
			source: 'children',
			// default: moment().format( 'YYYY-MM-DD' ),
		},
	},

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'calendar-alt',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * Edit:
	 */
	edit: ( props ) => {
		const { attributes: { datetime }, setAttributes, className } = props;
		const onUpdateDate = ( dateTime ) => {
			let newDateTime = moment(dateTime).format( 'YYYY-MM-DD' );
			setAttributes( { datetime: newDateTime } );
		};

		return (
			<DateTimePicker
				tagName="date"
				className={ className }
				currentDate={ props.attributes.datetime }
				label="Publication Date"
				value={ props.attributes.datetime }
				onChange={ onUpdateDate }
				is12Hour={ true }
			/>
		);
	},

	/**
	 * Save:
	 */
	save: ( props ) => {
		return <p>{ props.attributes.datetime }</p>;
	}
} );
