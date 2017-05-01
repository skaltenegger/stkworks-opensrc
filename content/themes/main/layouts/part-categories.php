<?php
	$isAll = is_option('is-all', get_sub_field('l_options'));
	$pageItems = prepare_pageItems_for_teaser(get_other_categories($post->ID));
?>

<section class="content-wrapper <?php echo get_option_classes(get_sub_field('l_options')); ?>">
	<?php if(!$isAll) { ?>
		<div class="layout  u-6/12  p">
				<a class="block  work" href="<?php echo $pageItems[0]['page-url']; ?>">
					<img class="work__img" src="<?php echo $pageItems[0]['img-alt']['sizes']['landscape-alternative']; ?>" alt="">
					<span class="work__title  work__title--big"><?php echo $pageItems[0]['title']; ?></span>
				</a>
		</div><!--
		--><div class="layout  u-6/12 p">
					<a class="block work" href="<?php echo $pageItems[1]['page-url']; ?>">
						<img class="work__img" src="<?php echo $pageItems[1]['img-alt']['sizes']['landscape-alternative']; ?>" alt="">
						<span class="work__title  work__title--big  work__title--text-bottom"><?php echo $pageItems[1]['title']; ?></span>
					</a>
		</div><!--

		--><div class="layout  u-3/12  p">
				<a class="block  work" href="<?php echo $pageItems[2]['page-url']; ?>">
					<img class="work__img" src="<?php echo $pageItems[2]['img']['sizes']['portrait-small']; ?>" alt="">
					<span class="work__title  work__title--small  work__title--text-bottom text--center"><?php echo $pageItems[2]['title']; ?></span>
				</a>
		</div><!--
		--><div class="layout  u-6/12  p">
				<a class="block  work" href="<?php echo $pageItems[3]['page-url']; ?>">
					<?php //Image::render($pageItems[3]['img'], 'portrait', 'work__img'); ?>
					<img class="work__img" src="<?php echo $pageItems[3]['img-alt']['sizes']['landscape-alternative']; ?>" alt="">
					<span class="work__title  work__title--big  work__title--text-bottom"><?php echo $pageItems[3]['title']; ?></span>
				</a>
		</div><!--
		--><div class="layout  u-3/12  p">
				<a class="block  work" href="<?php echo $pageItems[4]['page-url']; ?>">
					<img class="work__img" src="<?php echo $pageItems[4]['img']['sizes']['portrait-small']; ?>" alt="">
					<span class="work__title  work__title--big text--center  work__title--text-right  work__title--text-bottom"><?php echo $pageItems[4]['title']; ?></span>
				</a>
		</div>
		<?php } else {
			include(locate_template('parts/part-categories-all.php'));
		} ?>
</section>

<?php
	// reset pageItems in order to reuse this module
	$pageItems = array();
?>
