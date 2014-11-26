<?php
	add_action('wp_enqueue_scripts', 'bin_wp_enqueue_styles');
	function bin_wp_enqueue_styles()
	{
		wp_register_style('reset', get_bloginfo('template_directory').'/css/meyers-reset.css');
		wp_enqueue_style('reset');
		wp_register_style('styles', get_bloginfo('template_directory').'/css/styles.css');
		wp_enqueue_style('styles');
	}