<?php 
	$largeImgSrc = wp_get_attachment_image_src( get_post_thumbnail_id(), 'large' ); //680x1024
    $fullImgSrc = wp_get_attachment_image_src( get_post_thumbnail_id(), 'full' );

	if ( ! has_post_thumbnail() ) $gridItemClasses = ' no-img';
	else { 
		$bg = 'style="background-image:url('.$largeImgSrc[0].');"';
		$imgFull = $fullImgSrc[0];	
	}
	if ( !get_the_content() ) $gridItemClasses .= ' no-hover-mobile';
	if ( get_field('modal') ) $gridItemClasses .= ' isModal';

	if ( get_field('bgColor') ) {
		$bg = 'style="background-color:'.get_field('bgColor').';"';
		$imgFull = '';
	}

	$term_slugs = wp_get_post_terms(get_the_ID(), 'system', array('fields' => 'slugs'));
	for ($i=0; $i < count($term_slugs); $i++) { $slugs .= ' '.$term_slugs[$i]; }
	if ( ! empty( $term_slugs ) ) $gridItemClasses .= $slugs;
?>

<div id="id<?php the_ID(); ?>" class="grid-item alm-item<?php echo $gridItemClasses; ?>" <?php echo $bg; ?>>
	<article class="content">
      	<h2><?php the_title(); ?></h2>
      	<div class="desc">
      		<?php if ( get_the_content() ) { ?>
				<div class="txt"><?php the_content(); ?></div>
      			<span class="shaved-char-container"></span>
			<?php } ?>

			<?php if( get_field('modal') ) { ?>
				<button type="button" class="modal-btn btn btn-primary" data-bs-toggle="modal" data-bs-target="#Modal<?php the_ID(); ?>">
	              	<a href="#" data-bs-toggle="tooltip" data-bs-title="Okno modalne = więcej informacji" data-bs-placement="right">WIĘCEJ</a>
				</button>
			<?php } ?>
      	</div>
      	<div class="icons-action">			
			<?php if ( $slugs ): ?>
				<i class="bi<?php echo $slugs; ?>"></i>
			<?php endif; ?>

      		<?php if ( !empty($imgFull) ): ?>
				<a href="<?php echo $imgFull; ?>" class="colorbox<?php echo $slugs; ?> bimg" title="<?php echo the_field('altitle'); ?>" rel="colorbox-<?php echo trim($slugs); ?>"><i class="bi bi-card-image"></i></a>
			<?php endif; ?>
			
			<?php if( get_field('link') ): ?>
				<a href="<?php echo the_field('link'); ?>" title="Przejdź do <?php echo the_field('altitle'); ?>" target="_blank" class="blink">
					<i class="bi bi-link-45deg"></i>
				</a>
			<?php endif; ?>			

			<?php if ( get_the_content() ): ?>
				<i class="bi bi-info-circle"></i>
			<?php endif; ?>

			<?php if( get_field('link_to_code') ): ?>
				<a href="<?php echo the_field('link_to_code'); ?>" title="Zobacz kod projektu <?php echo the_field('altitle'); ?>" target="_blank" class="blink code">
					<i class="bi bi-file-earmark-code"></i>
				</a>
			<?php endif; ?>

			<!-- <i class="bi bi-arrow-down-circle"></i> -->
		</div>
		<div class="onclick"></div>
	</article>    
</div>
<?php if( get_field('modal') ): ?>
	<!-- aria-hidden="true" -->
<div class="modal fade" id="Modal<?php the_ID(); ?>" tabindex="-1" aria-labelledby="exampleModalLabel">
	<div class="modal-dialog">
	    <div class="modal-content">
		    <div class="modal-header">
			    <h1 class="modal-title fs-5" id="exampleModalLabel">Dodatkowe informacje</h1>
		        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
		    </div>
		    <div class="modal-body">
				<div class="text"><?php echo the_field('modal'); ?></div>
		    </div>
		    <div class="modal-footer">
		    	<button type="button" class="btn btn-primary" data-bs-dismiss="modal">Zamknij</button>
		    </div>
		</div>
	</div>
</div>
<?php endif; ?>