<?php //include(locate_template('header.php')); ?>

<?php
	// $slideIndex = 0;
	$classes = '';

	if(is_front_page()){
		$classes .= ' is-front-page';
	} 
	if(get_post_type() == 'for' && get_field('color-class')) {
		$classes .= ' c-'. get_field('color-class'); 
	}

	// // if($post->ID == WP_PAGE_ID_FRONTPAGE){
	// // 	$classes .= ' has-lightbox';
	// // }
?>
<!-- <div class="site-content page-wrapper<?php echo $classes; ?>"> -->

	<?php //include(locate_template('parts/part-page-builder.php')); ?>

<!-- </div> -->

<?php
// include(locate_template('parts/part-lightbox.php'));
// include(locate_template('footer.php')); 
?>
<h1>php</h1>