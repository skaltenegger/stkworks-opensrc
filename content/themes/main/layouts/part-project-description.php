<?php setup_postdata($post); ?>

<div class="centered-module project-description mt mb+ desk-mt++ desk-mb+">

	<div class="layout hide-on-tablet-port u-3/12@desk u-4/12@tablet u-6/12">
		<a class="has-arrow has-margin js-content-live-link" href="<?php the_field('live_link'); ?>" target="_blank">View Live
			<svg viewBox="0 0 25 12"><line class="a" x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline class="a" points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
		</a>
	</div><!--
	--><div class="layout u-6/12@large u-9/12@lap u-9/12@desk lap-pr+">
		  <?php the_content(); ?>  
	</div> 

	<div class="layout hide-on-desk u-3/12@desk u-4/12@tablet u-6/12">
		<a class="has-arrow has-margin js-content-live-link" href="<?php the_field('live_link'); ?>" target="_blank">View Live
			<svg viewBox="0 0 25 12"><line class="a" x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline class="a" points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
		</a> 
	</div>

</div>