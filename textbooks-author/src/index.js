/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockType } from '@wordpress/blocks';
import { PlainText } from '@wordpress/block-editor';

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
// import Edit from './edit';
// import save from './save';

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
registerBlockType( 'create-block/textbooks-author', {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Author', 'create-block' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Example block written for BC Campus interview.  Provides Author Gutenberg block for Textbooks custom post type.',
		'create-block'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'widgets',

	/**
	 * Block Attributtes
	 */
	attributes: {
        content: {
            type: 'array',
            source: 'children',
			selector: 'address',
        },
	},

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'smiley',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},

	/**
	 * Edit
	 */
	edit: ( props ) => {
        const { attributes: { content }, setAttributes, className } = props;
        const onChangeContent = ( newContent ) => {
            setAttributes( { content: newContent } );
        };
        return (
            <PlainText
                tagName="address"
				className={ className }
				label="Author"
				value={ content }
                onChange={ onChangeContent }
            />
        );
    },

	/**
	 * Save
	 */
	save: ( props ) => {
        return <address>{ props.attributes.content }</address>;
    },
} );
