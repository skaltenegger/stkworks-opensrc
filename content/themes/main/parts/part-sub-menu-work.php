<?php
	$menuItemPageIds = array(
		WP_PAGE_ID_PEOPLE,
		WP_PAGE_ID_FOOD,
		WP_PAGE_ID_HOTEL,
		WP_PAGE_ID_HOME,
		WP_PAGE_ID_COMMERCIAL,
		WP_PAGE_ID_BOOKS
	);
?>

<div class="js-sub-nav-item sub-nav-item sub-nav--work content-wrapper">
	<div class="sub-nav-inner">
		<div class="layout  u-6/12 u-3/12@tablet p"><!-- people -->
				<a class="js-sub-nav-link block  work delay--1" href="<?php echo get_permalink($menuItemPageIds[0]); ?>">
					<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[0]); ?>
					<img class="work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
					<span class="work__title  work__title--text-bottom  text--center"><?php echo get_the_title($menuItemPageIds[0]); ?></span>
				</a>
		</div><!--
		--><div class="layout  u-6/12  u-6/12@tablet  p"><!-- food -->
			<a class="block work delay--2" href="<?php echo get_permalink($menuItemPageIds[1]); ?>">
				<?php
					$featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[1]);
					$featruedImage2 = get_field(ACF_FEATURED_IMAGE_2, $menuItemPageIds[1]);
				?>
				<picture>
					<source class="" srcset="<?php echo $featruedImage['sizes']['portrait-small']; ?>" media="(max-width: 767px)">
					<img class=" work__img" src="<?php echo $featruedImage2['sizes']['landscape-alternative']; ?>" alt="">
				</picture>
				<span class="work__title  work__title--big"><?php echo get_the_title($menuItemPageIds[1]); ?></span>
			</a>
		</div><!--
		--><div class="layout u-6/12 u-3/12@tablet  p"><!-- hotel -->
			<a class="js-sub-nav-link block  work delay--3" href="<?php echo get_permalink($menuItemPageIds[2]); ?>">
				<?php
					$featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[2]);
					$featruedImage2 = get_field(ACF_FEATURED_IMAGE_2, $menuItemPageIds[2]);
				?>
				<picture>
					<source class="" srcset="<?php echo $featruedImage['sizes']['portrait-small']; ?>" media="(max-width: 767px)">
					<img class=" work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
				</picture>
				<span class="work__title  text--center  work__title--text-bottom"><?php echo get_the_title($menuItemPageIds[2]); ?></span>
			</a>
		</div><!--
		--><div class="layout  u-6/12  u-3/12@tablet  p"><!-- home -->
			<a class="js-sub-nav-link block  work delay--4" href="<?php echo get_permalink($menuItemPageIds[3]); ?>" data-size="670x445">
				<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[3]); ?>
				<img class=" work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
				<span class="work__title text--center work__title--text-bottom"><?php echo get_the_title($menuItemPageIds[3]); ?></span>
			</a>
		</div><!--
		--><div class="layout  u-6/12 u-3/12@tablet  p"><!-- commercial -->
				<a class="js-sub-nav-link block  work delay--5" href="<?php echo get_permalink($menuItemPageIds[4]); ?>" data-size="670x445">
					<?php $featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[4]); ?>
					<img class=" work__img" src="<?php echo $featruedImage['sizes']['portrait-small']; ?>" alt="">
					<span class="work__title  work__title--small  work__title--text-bottom text--center"><?php echo get_the_title($menuItemPageIds[4]); ?></span>
				</a>
		</div><!--
		--><div class="layout u-6/12  u-6/12@tablet  p"><!-- books -->
				<a class="js-sub-nav-link block  work delay--6" href="<?php echo get_permalink($menuItemPageIds[5]); ?>" data-size="670x445">
					<?php
						$featruedImage = get_field(ACF_FEATURED_IMAGE, $menuItemPageIds[5]);
						$featruedImage2 = get_field(ACF_FEATURED_IMAGE_2, $menuItemPageIds[5]); ?>
				<picture>
					<source class=""  media="(max-width: 767px)" srcset="<?php echo $featruedImage['sizes']['portrait-small']; ?>">
					<img class=" work__img" src="<?php echo $featruedImage2['sizes']['landscape-alternative']; ?>" alt="">
				</picture>
					<span class="work__title  work__title--big  work__title--text-right  work__title--text-bottom"><?php echo get_the_title($menuItemPageIds[5]); ?></span>
				</a>
		</div>
	</div>

</div>