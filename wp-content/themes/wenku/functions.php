<?php

/**
 * Dequeue the jQuery UI script.
 *
 * Hooked to the wp_print_scripts action, with a late priority (100),
 * so that it is after the script was enqueued.
 */
function wenku_enqueue_styles() {
	wp_enqueue_style( 'style', get_stylesheet_directory_uri() . '/assets/css/main.css' );
}
add_action( 'wp_enqueue_scripts', 'wenku_enqueue_styles' );

function wenku_enqueue_script() {
	// if ( is_home() ) {
		wp_enqueue_script (		
			'main',
			esc_url( get_stylesheet_directory_uri() . '/assets/js/main.js' ),
			[],
			'',
			[ 'strategy' => 'defer' ],
		);
	// }
}
add_action( 'wp_enqueue_scripts', 'wenku_enqueue_script' );

// Prevent WP from adding <p> tags on all post types
function disable_wp_auto_p( $content ) {
	//if ( is_singular( 'page' ) ) {
  		remove_filter( 'the_content', 'wpautop' );
  		remove_filter( 'the_excerpt', 'wpautop' );
  		return $content;
  	//}	
}
add_filter( 'the_content', 'disable_wp_auto_p', 0 );

add_action('acf/init', function() {  
    remove_filter('acf_the_content', 'wpautop' );
});

//ACF 6.3 the shortcode is disabled by default for new installs, to enable it:
add_action( 'acf/init', 'set_acf_settings' );
function set_acf_settings() {
    acf_update_setting( 'enable_shortcode', true );
}

add_filter('alm_display_results', function(){
	return 'Projektów: {post_count}/{total_posts}';
});

add_filter( 'alm_after_button', function() {
    return '<div class="custom-alm-loader"><button class="custom-alm-load-more-btn" type="button"
"></button></div>';
} );
