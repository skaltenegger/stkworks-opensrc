
<?php
	$categoryPageIds = array(
		WP_PAGE_ID_PEOPLE,
		WP_PAGE_ID_FOOD,
		WP_PAGE_ID_HOTEL,
		WP_PAGE_ID_HOME,
		WP_PAGE_ID_COMMERCIAL,
		WP_PAGE_ID_BOOKS
	);
?>


	<div class="layout  u-6/12 u-3/12@tablet p"><!-- people -->
		<a class="block  work delay--1" href="<?php echo get_permalink($categoryPageIds[0]); ?>">
			<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[0]); ?>
			<img class="work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
			<span class="work__title  work__title--text-bottom  text--center"><?php echo get_the_title($categoryPageIds[0]); ?></span>
		</a>
	</div><!--
	--><div class="layout  u-6/12  u-6/12@tablet  p"><!-- food -->
		<a class="block work delay--2" href="<?php echo get_permalink($categoryPageIds[1]); ?>">
			<?php
				$featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[1]);
				$featruedImage2 = get_field(ACF_FEATURED_IMAGE_2, $categoryPageIds[1]);
			?>
			<picture>
				<source srcset="<?php echo $featruedImage['sizes']['portrait-small']; ?>" media="(max-width: 767px)">
				<img class="work__img" src="<?php echo $featruedImage2['sizes']['landscape-alternative']; ?>" alt="">
			</picture>
			<span class="work__title  work__title--big"><?php echo get_the_title($categoryPageIds[1]); ?></span>
		</a>
	</div><!--
	--><div class="layout  u-3/12@tablet  p"><!-- hotel -->
		<a class="block  work delay--3" href="<?php echo get_permalink($categoryPageIds[2]); ?>">
			<?php
				$featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[2]);
				$featruedImage2 = get_field(ACF_FEATURED_IMAGE_2, $categoryPageIds[2]);
			?>
			<picture>
				<source srcset="<?php echo $featruedImage2['sizes']['landscape-alternative']; ?>" media="(max-width: 767px)">
				<img class="work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
			</picture>
			<span class="work__title  text--center  work__title--text-bottom work__title--mobile-left"><?php echo get_the_title($categoryPageIds[2]); ?></span>
		</a>
	</div><!--
	--><div class="layout  u-6/12  u-3/12@tablet  p"><!-- home -->
		<a class="block  work delay--4" href="<?php echo get_permalink($categoryPageIds[3]); ?>" data-size="670x445">
			<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[3]); ?>
			<img class="work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
			<span class="work__title text--center work__title--text-bottom"><?php echo get_the_title($categoryPageIds[3]); ?></span>
		</a>
	</div><!--
	--><div class="layout  u-6/12 u-3/12@tablet  p"><!-- commercial -->
			<a class="block  work delay--5" href="<?php echo get_permalink($categoryPageIds[4]); ?>" data-size="670x445">
				<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[4]); ?>
				<img class="work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
				<span class="work__title  work__title--small  work__title--text-bottom text--center"><?php echo get_the_title($categoryPageIds[4]); ?></span>
			</a>
	</div><!--
	--><div class="layout u-6/12@tablet  p"><!-- books -->
			<a class="block  work delay--6" href="<?php echo get_permalink($categoryPageIds[5]); ?>" data-size="670x445">
				<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $categoryPageIds[5]); ?>
				<img class="work__img" src="<?php echo $featruedImage['sizes']['landscape-alternative']; ?>" alt="">
				<span class="work__title  work__title--big  work__title--text-right  work__title--text-bottom work__title--mobile-right"><?php echo get_the_title($categoryPageIds[5]); ?></span>
			</a>
	</div>