<?php 
$img = get_sub_field('l_image');
if($img) : ?>

<section class="js-section module centered-module">	
	<div class="layout tablet-mb mb-">
		<img src="<?php echo $img['url']; ?>" alt="" />
	</div>
</section>

<?php endif; ?>