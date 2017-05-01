<div class="layout project-header relative">

	<a href="<?php echo get_bloginfo('url').'#'.$post->post_name; ?>" class="circle-link circle-link--back tablet-mt+">
		<svg viewBox="0 0 40 40">
			<circle class="a" cx="20" cy="20" r="17.63" />
			<line class="a" x1="28.38" y1="20" x2="12.36" y2="20"/>
			<polyline class="a" points="16.36 24.72 12.36 20 16.36 15.28"/>
		</svg>
	</a>

	<a href="<?php the_field('live_link'); ?>" class="circle-link circle-link--live js-live-circle inactive" target="_blank">
		<svg viewBox="0 0 40 40">
			<circle class="a" cx="20" cy="20" r="17.63" />
		</svg>
		<span class="live_label caps">Live</span>
	</a>
	
	<div class="project-info project-info--full block m0a mobile-mt+ mobile-pt mt+">
		<div class="layout u-3/12@desk u-6/12">
			<span class="label block caps">Project</span><span class="info"><?php the_title(); ?></span>
		</div><!--
		--><div class="layout u-3/12@desk u-6/12 mobile-pl">
			<span class="label block caps">Type</span><span class="info"><?php the_field('type'); ?></span>
		</div><!--
		--><div class="layout u-3/12@desk u-6/12 tablet-p-mt mobile-mt">
			<div class="float-right-on-desk">
				<span class="label block caps">Role</span>
				<span class="info"><?php the_field('role'); ?></span>
			</div> 
		</div><!--
		--><div class="layout u-3/12@desk u-6/12 tablet-p-mt mobile-mt mobile-pl">
			<div class="float-right-on-desk">
				<span class="label caps block">Year</span>
				<span class="info"><?php the_field('year'); ?></span>
			</div>
		</div> 
	</div>

</div>