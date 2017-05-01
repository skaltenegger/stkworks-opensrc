<?php
/*
	Template Name: Impressum
*/

 include(locate_template('header.php')); ?>

<div class="site-content site-padding page-wrapper">
	<div class="content-wrapper alternative-headings content has-extra-padding">
		<h1 class="text--center c-brand mb0"><?php echo $post->post_title; ?></h1>
		<div class="layout u-5/12@desk ml-1/12 ph">
			<?php echo wpautop(get_field('text', $post->ID)); ?>
		</div><!--
		--><div class="layout u-4/12@desk ml-1/12">
			<h2><?php pll_e('Konzeption, Design und Projektmanagement'); ?></h2>
			<span class="block">Stefan Kaltenegger</span>
			<a href="http://stefankaltenegger.com" target="_blank">www.stefankaltenegger.com</a>
			<h2><?php pll_e('Technische Umsetzung'); ?></h2>
			<span class="block">Mario Sommer</span>
			<a href="http://mariosommer.at" target="_blank">www.mariosommer.at</a>
			<h2><?php pll_e('Front Page Video'); ?></h2>
			<span class="block">David Köhlmeier</span>
			<a href="http://dkmotion.at" target="_blank">www.dkmotion.at</a>
		 <!-- <h2><?php pll_e('Allgemeine Geschäftsbedingungen'); ?></h2>
			<a href="<?php $agbs = get_field('f_agb', 'options'); echo $agbs['url']; ?>" target="_blank">Download AGB</a> -->
		</div>

		<div class="ga-text layout layout--fluid ph ml-1/12 mr-1/12 no-padding@tablet">
			<?php echo wpautop(get_field('text_2', $post->ID)); ?>
		</div>
	</div>
</div>

<?php include(locate_template('footer.php'));