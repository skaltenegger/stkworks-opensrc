<?php
	$imageSizes = array('landscape', 'landscape');
	$classTag = 'js-open-book book-teaser block';

	$pageItems[0]['imageSize'] = 'landscape';
	$pageItems[1]['imageSize'] = 'landscape';

	$elementHTML[0] = get_element_html($pageItems[0], $classTag, $slideIndex++);
	$elementHTML[1] = get_element_html($pageItems[1], $classTag, $slideIndex++);

?>


<section class="js-section module content-wrapper">
	<div class="layout u-6/12 p">
		<?php echo $elementHTML[0]; ?>
	</div><!--
	--><div class="layout u-6/12 p">
		<?php echo $elementHTML[1]; ?>
	</div>
</section>
