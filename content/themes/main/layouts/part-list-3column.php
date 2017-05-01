
<section class="js-section module module--list <?php echo get_option_classes(get_sub_field('l_options')); ?>">
	<div class="content-wrapper content has-max-width">

		<div class="list layout  u-6/12@tablet  u-4/12@desk">
			<?php echo do_shortcode(wpautop(get_sub_field('t_left_column'))); ?>
		</div><!--
		--><div class="list layout  u-6/12@tablet  u-4/12@desk">
			<?php echo do_shortcode(wpautop(get_sub_field('t_middle_column'))); ?>
		</div><!--

		--><div class="list layout  u-6/12@tablet  u-4/12@desk">
			<?php echo do_shortcode(wpautop(get_sub_field('t_right_column'))); ?>
		</div>

	</div>
</section>