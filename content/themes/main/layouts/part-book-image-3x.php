<?php

	$isLandscape = is_option('is-landscape', $part['l_options']);
	$imgSizeName = ($isLandscape) ? 'landscape': 'portrait-small';

	$pageItems[0]['imageSize'] = $imgSizeName;
	$pageItems[1]['imageSize'] = $imgSizeName;
	$pageItems[2]['imageSize'] = $imgSizeName;

	$classTag = 'js-open-book book-teaser block';

	$elementHTML[0] = get_element_html($pageItems[0], $classTag, $slideIndex++);
	$elementHTML[1] = get_element_html($pageItems[1], $classTag, $slideIndex++);
	$elementHTML[2] = get_element_html($pageItems[2], $classTag, $slideIndex++);
?>


<section class="js-section module content-wrapper">
	<div class="layout u-4/12 p">
		<?php echo $elementHTML[0]; ?>
	</div><!--
	--><div class="layout u-4/12 p">
		<?php echo $elementHTML[1]; ?>
	</div><!--
	--><div class="layout u-4/12 p">
		<?php echo $elementHTML[2]; ?>
	</div>
</section>