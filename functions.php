<?php

add_action('wp_enqueue_scripts', 'bin_wp_enqueue_styles');
function bin_wp_enqueue_styles () {
	wp_register_style('reset', get_bloginfo('template_directory').'/css/meyers-reset.css');
	wp_enqueue_style('reset');
	wp_register_style('styles', get_bloginfo('template_directory').'/css/styles.css');
	wp_enqueue_style('styles');
}

// Settings for the customize screen (wp-admin/customize.php)
add_action('customize_register', 'customize_allemaedchenintheworld');
function customize_allemaedchenintheworld ($wp_customize) {
	// Adding a section for all the customizations to put in
	$wp_customize->add_section('main', [
		'title' => 'Main',
		'priority' => '1'
	]);
	// Adding a setting for the main_text, it is read and interpreted as a post inside the main element on the front page.
	$wp_customize->add_setting('main_text', [
		'default' => ''
	]);
	$wp_customize->add_control('main_text_control', [
		'label' => 'Main content on frontpage',
		'settings' => 'main_text',
		'section' => 'main',
		'type' => 'textarea'
	]);
}
