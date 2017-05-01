<?php
	$elementHTML = array();
	$elementIndex = 0;
	$isBook = is_option('is-book', get_sub_field('l_options'));
	$isInverted = is_option('is-inverted', get_sub_field('l_options'));

	$imageSizes = array('portrait-small', 'landscape-alternative', 'portrait-small');

	$classTag = 'block';
	if($isBook){
		$classTag .= ' js-open-book book-teaser';
	}

	if( have_rows('r_image') ) {
		while ( have_rows('r_image') ) {
			the_row();
			$bookId = 0;
			$book = get_sub_field('book_reference');
			$img = get_sub_field('l_image');
			$title = get_sub_field('l_title');
			$subTitle = get_sub_field('l_sub-title');

			if($book){
				$bookId = $book->ID;

				if(!in_array($bookId, $booksToLoad)){
					array_push($booksToLoad, $bookId);
				}
			}

			$pageItem = array(
				'title' => $title,
				'sub-title' => $subTitle,
				'img' => $img,
				'book' => $bookId,
				'imageSize' => $imageSizes[$elementIndex]
			);

			$elementHTML[$elementIndex] = get_element_html($pageItem, $classTag, $slideIndex);
			$elementIndex++;
			$slideIndex++;
		}
	}
?>

<section class="js-section module content-wrapper">
	<div class="layout u-3/12 p">
		<?php echo $elementHTML[0]; ?>
	</div><!--

	--><div class="layout u-6/12 p">
		<?php echo $elementHTML[1]; ?>
	</div><!--

	--><div class="layout u-3/12 p">
		<?php echo $elementHTML[2]; ?>
	</div>
</section>
