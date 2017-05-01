<div class="layout module--next-project gdesk-pv++">
	<div class="centered-module pv+">
		<div class="block m0a u-6/12@large u-6/12@lap u-9/12@tablet-w">

			<?php $nextProject = getNextProject(get_the_ID()); ?>

			<a href="<?php echo get_the_permalink($nextProject->ID); ?>">
				<span class="caps label label--next-project">Next Project <svg viewBox="0 0 25 12"><line class="a" x1="1.51" y1="6.05" x2="23.49" y2="6.05"/><polyline class="a" points="20.48 0.91 23.49 6 20.48 11.09"/></svg></span>
				<span class="block label--next-project-name"><?php echo $nextProject->post_title; ?></span>
			</a>
		</div>
	</div>
</div>