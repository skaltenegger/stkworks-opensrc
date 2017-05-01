<?php
/*
	Template Name: Kategorie
*/
$slideIndex = 0;

include(locate_template('header.php'));

?>
<div class="js-gallery has-lazyloading has-lightbox site-content site-padding page-wrapper">
	<?php include(locate_template('parts/part-page-builder.php')); ?>
</div>
<?php

$isCatTeaser = true;

if(basename(get_page_template()) == 'page-category.php'){ ?>
	<div class="module--pb work-cat-teaser">
		<h2 class="alpha c-brand mb0 h1-padding text--center">Work</h2>
		<?php include(locate_template('layouts/part-categories.php')); ?>
	</div>
<?php }

include(locate_template('parts/part-lightbox.php'));


include(locate_template('footer.php'));
