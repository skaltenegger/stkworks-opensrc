<?php if( have_rows('r_image') ) : ?>
	<section class="js-section module centered-module mb+">
<?php endif; ?>
	
	<?php 
	    $images = array(); 
		while ( have_rows('r_image') ) {
			the_row();
			
			$img = get_sub_field('l_image');
			$title = get_sub_field('l_title');
			
			array_push($images, $img);
		}
	 ?>
		
	<div class="layout u-6/12 pr-- tablet-pr-">
		<img src="<?php echo $images[0]['url']; ?>" alt="" />
	</div><!--
	--><div class="layout u-6/12 pl-- tablet-pl-">
		<img src="<?php echo $images[1]['url']; ?>" alt="" />
	</div>
	
<?php if( have_rows('r_image') ) : ?>
</section>
<?php endif; ?>





	
