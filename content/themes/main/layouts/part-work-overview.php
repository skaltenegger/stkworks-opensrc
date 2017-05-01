<?php 
    global $post;
	$works = get_sub_field('works');
	$i = 1;
?>

<div class="layout projects-overview js-projects-overview block m0a mobile-pv+ desk-pt++ desk-pb++" id="overview">

	<nav class="projects-sticky-nav">
		<ul class="projects-nav-list">
			<li class=""><a class="menu_link icon active" data-scroll href="#hero"><svg viewBox="0 0 40 40"><path class="a" d="M23.64,16.39c-.13,0-.21,0-.34,0A2.41,2.41,0,0,1,20.48,15a3.49,3.49,0,0,1-2.84,1.45,3,3,0,0,1-1.46-.35m7.49.73c0,2.5-1.69,4.52-3.77,4.52s-3.77-2-3.77-4.52,1.69-4.52,3.77-4.52S23.67,14.3,23.67,16.8Zm-5.56,4v2l-3.78,1.35a2.26,2.26,0,0,0-1.5,2.13v1.42H27.16V26.3a2.26,2.26,0,0,0-1.5-2.13l-3.77-1.35V20.64"/></svg></a></li>
			
			<?php foreach($works as $work) : 
				  $work = $work['work']; 
				  $post = get_post($work->ID);

			?>
			<li class=""><a class="menu_link" data-scroll href="#<?php echo $post->post_name; ?>">0<?php echo $i++; ?></a></li>
			<?php endforeach; ?>

			<li class=""><a class="menu_link icon" data-scroll href="#contact"><svg viewBox="0 0 40 40"><path class="a" d="M20.68,18.64a.34.34,0,1,1-.34-.34A.34.34,0,0,1,20.68,18.64Zm2.72,0a.34.34,0,1,1-.34-.34A.34.34,0,0,1,23.4,18.64Zm-5.44,0a.34.34,0,1,1-.34-.34A.34.34,0,0,1,18,18.64Zm-5.78,4.42a.68.68,0,0,0,.68.68h1.36v2.72l2.72-2.72h10.2a.68.68,0,0,0,.68-.68V14.22a.68.68,0,0,0-.68-.68H12.86a.68.68,0,0,0-.68.68Z"/></svg></a></li>
		</ul>
	</nav>
	
	<?php if($works) : ?>
	<?php foreach($works as $work) : 

		$work = $work['work']; 
		$post = get_post($work->ID);
		setup_postdata($post);
		$video = get_field('video_thumb');

	?>

	<div class="layout full-min-height js-waypoint" id="<?php echo $post->post_name; ?>">
		<div class="layout pv">
			<div class="layout browser-window relative block m0a">
				<div class="browser-bar">
					<div class="dot"></div>
					<div class="dot"></div>
					<div class="dot"></div>
				</div>
				<div class="browser-content">
					<a href="<?php the_permalink(); ?>" class="project-overlay-link absolute"><span class="center xunderline">View Project</span></a>
					<video loop preload muted="true" playsinline>
					  <source src="<?php echo $video['url']; ?>" type="<?php echo $video['mime_type']; ?>">
					</video>
				</div>
			</div>	

			<div class="layout project-info--overview block m0a mobile-mt mt+">
				<div class="layout u-3/12@desk u-4/12@tablet u-6/12">
					<span class="label block caps">Project</span><span class="info"><?php the_title(); ?></span>
				</div><!--
				--><div class="layout u-3/12@desk u-4/12@tablet hide-on-mobile">
					<span class="label block caps">Type</span><span class="info"><?php the_field('type'); ?></span>
				</div><!--
				--><div class="layout u-3/12@desk hide-on-mobile hide-on-tablet-port">
					<span class="label block caps">Role</span><span class="info"><?php the_field('role'); ?></span>
				</div><!--
				--><div class="layout u-3/12@desk u-4/12@tablet u-6/12">
					<span class="label block caps">&nbsp;</span>
					<a class="brand-link has-arrow float--right pr-" href="<?php the_permalink(); ?>">View Project
						<svg viewBox="0 0 25 12"><line class="a" x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline class="a" points="20.48 0.91 23.49 6 20.48 11.09"/></svg>
					</a>
				</div> 
			</div>

		</div>
	</div>
	<?php endforeach; ?>
	<?php endif; ?>

	<?php wp_reset_postdata(); ?>

</div>