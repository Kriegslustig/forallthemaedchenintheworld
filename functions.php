<?php

/*
 * @action wp_enqueue_scripts
 * Enques my stylesheets
 */
add_action('wp_enqueue_scripts', 'bin_wp_enqueue_styles');
function bin_wp_enqueue_styles () {
	wp_register_style('reset', get_bloginfo('template_directory').'/css/meyers-reset.css');
	wp_enqueue_style('reset');
	wp_register_style('styles', get_bloginfo('template_directory').'/css/styles.css');
	wp_enqueue_style('styles');
}

/*
 * @action wp_enqueue_scripts
 * Enques my JavaScript files
 */
add_action('wp_enqueue_scripts', 'bin_wp_enqueue_scripts');
function bin_wp_enqueue_scripts () {
	wp_enqueue_script( 'prefixfree', 'js/prefixfree.js', array(), false, true);
}

/*
 * @action customize_register
 * Settings for the customize screen (wp-admin/customize.php)
 */
add_action('customize_register', 'customize_allemaedchenintheworld');
function customize_allemaedchenintheworld ($wp_customize) {
	/*
	 * Adding a section for all the customizations to put in
	*/
	$wp_customize->add_section('main', [
		'title' => 'Main',
		'priority' => '1'
	]);
	/*
	 * Adding a setting for the main_text, it is read and interpreted as a post inside the main element on the front page.
	*/
	$wp_customize->add_setting('main_text', [
		'default' => ''
	]);
	/*
	 * Adding the actual textarea
	*/
	$wp_customize->add_control('main_text_control', [
		'label' => 'Main content on frontpage',
		'settings' => 'main_text',
		'section' => 'main',
		'type' => 'textarea'
	]);
}

/*
 * @filter get_image_tag
 * This adds a wrapper to images with the size full
 * It's kinda dirty because i have to use regex to find out the size
 * TODO: I'll have to use this filter to layzie load the images
 */
add_filter('get_image_tag', 'add_wrapper_full_size');
function add_wrapper_full_size ($html) {
	$size = preg_match_all('/class\=\"[\w\s]*size\-([\w-_]*)/', $html, $matches);
	$size = $matches[1][0];
	$wrapper = <<<HTML
<div class="image_wrapper--size--full">%s</div>
HTML;
	if($size === 'full') {
		return sprintf($wrapper, $html);
	}
	return $html;
}

/*
 *	This is the cleanest way to remove the default styles from galleries
 */
add_theme_support('html5', array('gallery'));