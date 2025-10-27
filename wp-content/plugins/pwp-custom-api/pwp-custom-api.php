<?php
/*
Plugin Name: PWP Custom API
Description: Własny endpoint REST API pod customowym namespace pwp/v1/portfolio z ograniczonymi polami i paginacją.
Version: 1.0
Author: R.W. + Copilot
*/
add_action( 'rest_api_init', function() {
	register_rest_route( 'pwp/v1', '/portfolio', array(
		'methods'  => WP_REST_Server::READABLE,
		'callback' => 'pwp_custom_api_portfolio',
		'args'     => array(
			'per_page' => array(
				'description'       => 'Ilość elementów do zwrócenia (max 100).',
				'type'              => 'integer',
				'default'           => 10,
				'sanitize_callback' => 'absint',
			),
			'page' => array(
				'description'       => 'Numer strony (paginacja).',
				'type'              => 'integer',
				'default'           => 1,
				'sanitize_callback' => 'absint',
			),
			'_embed' => array(
				'description' => 'Czy zwrócić _embed (true/false).',
				'type'        => 'boolean',
				'default'     => false,
			),
		),
		'permission_callback' => '__return_true',
	) );
	// Pojedynczy projekt po ID
    register_rest_route(
        'pwp/v1',
        '/portfolio/(?P<id>\d+)',
        array(
            'methods'  => WP_REST_Server::READABLE,
            'callback' => 'pwp_rest_portfolio_single_callback',
            'args'     => array(
                'id' => array(
                    'type'              => 'integer',
                    'required'          => true,
                    'sanitize_callback' => 'absint',
                ),
                '_embed' => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
            ),
            'permission_callback' => '__return_true',
        )
    );

	// Pojedynczy projekt po ID
    register_rest_route(
        'pwp/v1',
        '/portfolio/(?P<id>\d+)',
        array(
            'methods'  => WP_REST_Server::READABLE,
            'callback' => 'pwp_rest_portfolio_single_callback',
            'args'     => array(
                'id' => array(
                    'type'              => 'integer',
                    'required'          => true,
                    'sanitize_callback' => 'absint',
                ),
                '_embed' => array(
                    'type'    => 'boolean',
                    'default' => false,
                ),
            ),
            'permission_callback' => '__return_true',
        )
    );
} );

function pwp_custom_api_portfolio( WP_REST_Request $request ) {
	// Proxy do core /wp/v2/portfolio_project
	$core_request = new WP_REST_Request( 'GET', '/wp/v2/portfolio_project' );
	foreach ( array('per_page', 'page') as $param ) {
		if ( $request->get_param( $param ) !== null ) {
			$core_request->set_param( $param, $request->get_param( $param ) );
		}
	}
	$core_request->set_param('_embed', 1);

	$server = rest_get_server();
	$core_response = $server->dispatch( $core_request );
	return $core_response;
}



function pwp_rest_portfolio_single_callback( WP_REST_Request $request ) {
    $id = (int) $request->get_param( 'id' );
    if ( ! $id ) {
        return new WP_Error( 'invalid_id', 'Invalid project ID', array( 'status' => 404 ) );
    }
    $controller = new WP_REST_Posts_Controller( 'portfolio_project' );
    $post = get_post( $id );
    if ( ! $post || $post->post_type !== 'portfolio_project' || $post->post_status !== 'publish' ) {
        return new WP_Error( 'not_found', 'Project not found', array( 'status' => 404 ) );
    }
    $response = $controller->prepare_item_for_response( $post, $request );
    $response = $controller->prepare_response_for_collection( $response );
    return rest_ensure_response( $response );
}
// ...existing code...



