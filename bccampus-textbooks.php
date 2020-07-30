<?php
/**
 * Plugin Name:     Bccampus Textbooks
 * Plugin URI:      PLUGIN SITE HERE
 * Description:     PLUGIN DESCRIPTION HERE
 * Author:          YOUR NAME HERE
 * Author URI:      YOUR SITE HERE
 * Text Domain:     bccampus-textbooks
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Bccampus_Textbooks
 */

//
include('textbooks-author/textbooks-author.php');
include('textbooks-license/textbooks-license.php');
include('textbooks-publication-date/textbooks-publication-date.php');
include('textbooks-feature/textbooks-feature.php');

// 1. Custom Post Type Registration (textbook)
add_action('init', 'create_textbook_post_type');
function create_textbook_post_type()
{
    $labels = array(
        'name'               => _x('Textbooks', 'textbooks'),
        'singular_name'      => _x('Textbook', 'textbook'),
        'add_new'            => _x('Add New Textbook', 'Textbook'),
        'add_new_item'       => __('Add New Textbooks'),
        'edit_item'          => __('Edit Textbook'),
        'new_item'           => __('New Textbook'),
        'view_item'          => __('View Textbook'),
        'search_items'       => __('Search Textbooks'),
        'not_found'          => __('No Textbooks found'),
        'not_found_in_trash' => __('No Textbooks found in Trash'),
        'parent_item_colon'  => '',
    );

    $args = array(
        'label'                 => __('All Textbooks'),
        'labels'                => $labels,
        'public'                => true,
        'can_export'            => true,
        'show_ui'               => true,
        'has_archive'           => true,
        '_builtin'              => false,
        'capability_type'       => 'post',
        'hierarchical'          => false,
        'supports'              => array('title', 'thumbnail', 'excerpt', 'editor'),
        'show_in_nav_menus'     => true,
        'publicly_queryable'    => true,
        'taxonomies'            => array('institutions_cat', 'post_tag'),
        'show_in_rest'          => true,
        'rest_base'             => 'textbook-api',
        'rewrite'               => array('slug' => 'textbooks'),
        'rest_controller_class' => 'WP_REST_Posts_Controller',
        'menu_icon'             => 'dashicons-book-alt',
    );

    register_post_type('textbook', $args);
}

//
add_action('init', 'create_institution_cat_taxonomy', 0);
function create_institution_cat_taxonomy()
{

    $labels = array(
        'name'                       => _x('Institutions', 'taxonomy general name'),
        'singular_name'              => _x('Institution', 'taxonomy singular name'),
        'search_items'               => __('Search Institutions'),
        'popular_items'              => __('Popular Institutions'),
        'all_items'                  => __('All Institutions'),
        'parent_item'                => null,
        'parent_item_colon'          => null,
        'edit_item'                  => __('Edit Institution'),
        'update_item'                => __('Update Institution'),
        'add_new_item'               => __('Add New Institution'),
        'new_item_name'              => __('New Institution Name'),
        'separate_items_with_commas' => __('Separate categories with commas'),
        'add_or_remove_items'        => __('Add or remove categories'),
        'choose_from_most_used'      => __('Choose from the most used categories'),
    );

    register_taxonomy('institutions_cat', 'institution', array(
        'label'                 => __('Textbooks Institution'),
        'labels'                => $labels,
        'hierarchical'          => true,
        'show_ui'               => true,
        'query_var'             => true,
        'rewrite'               => array('slug' => 'institutions-type'),
        'show_in_rest'          => true,
        'rest_controller_class' => 'WP_REST_Terms_Controller',
    ));
}

//
// function bccampus_textbooks_theme() {
// 	wp_enqueue_style('bulma', 'https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma-rtl.min.css');
// }
// add_action('wp_enqueue_scripts', 'bccampus_textbooks_theme');
