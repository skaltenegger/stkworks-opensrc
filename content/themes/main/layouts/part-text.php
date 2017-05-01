<?php
/**
 * Text Module
 */
$isTwoColumns = is_option('is-two-columns', get_sub_field('l_options'));
?>


<div class="centered-module module module--text <?php echo get_option_classes(get_sub_field('l_options')); ?>">
	<div class="layout u-6/12@large u-6/12@lap u-9/12@tablet-w block m0a">
		<?php echo do_shortcode(wpautop(get_sub_field('l_text'))); ?>
	</div>
			
</div>