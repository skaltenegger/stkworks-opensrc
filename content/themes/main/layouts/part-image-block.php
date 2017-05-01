<section class="js-section module module--img-block has-max-width text--center content-wrapper">
<!--
<?php
	$pageItems = array();
	$index = 0;
	if( have_rows('r_file') ) {
		while ( have_rows('r_file') ) {
			the_row();
			$img = get_sub_field('l_image'); ?>

			--><div class="layout u-special-5@desk u-3/12">
					<div class="image-block" style="transition-delay: <?php echo ($index++ / 10); ?>s;">
						<?php echo file_get_contents($img['url']); ?>
					</div>
			</div><!--
		<?php }
	}
?>
--></section>