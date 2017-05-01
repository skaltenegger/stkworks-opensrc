<?php
	$pageItems = array();
	$elementIndex = 0;
	$isBook = is_option('is-book', get_sub_field('l_options'));
	$isInverted = is_option('is-inverted', get_sub_field('l_options'));
	$isInvertedVertical = is_option('is-vertical-inverted', get_sub_field('l_options'));
	$imageSizes = array('portrait-big', 'portrait-small', 'portrait-small', 'landscape');

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

			$pageItems[$elementIndex] = array(
				'title' => $title,
				'sub-title' => $subTitle,
				'img' => $img,
				'book' => $bookId,
				'imageSize' => $imageSizes[$elementIndex]
			);
			$elementIndex++;
		}
	}

	$leftSideHTML = '<div class="layout u-6/12 p">' .
		get_element_html($pageItems[0], $classTag, ($isInverted) ? $slideIndex++ + 3 : $slideIndex++) .
	'</div>';

	$i1 = (($isInverted) ? $slideIndex++ - 1 : $slideIndex++);
	$i1 += ($isInvertedVertical) ? 1 : 0;

	$i2 = (($isInverted) ? $slideIndex++ - 1 : $slideIndex++);
	$i2 += ($isInvertedVertical) ? 1 : 0;

	$i3 = (($isInverted) ? $slideIndex++ - 1 : $slideIndex++);
	$i3 += ($isInvertedVertical) ? -2 : 0;

	$rightTopHTML = '<div class="layout">' .
		'<div class="layout u-6/12 p top">' .
			get_element_html($pageItems[1], $classTag, $i1) .
		'</div><!--' .
		'--><div class="layout u-6/12 p">' .
			get_element_html($pageItems[2], $classTag, $i2) .
		'</div>' .
	'</div>';

	$rightBottomHTML = '<div class="layout p">' .
			get_element_html($pageItems[3], $classTag, $i3) .
	'</div>';

	$rightSideHTML =  '<div class="layout u-6/12">' .
		(($isInvertedVertical) ? $rightBottomHTML : $rightTopHTML) .
		(($isInvertedVertical) ? $rightTopHTML : $rightBottomHTML) .
	'</div>';

?>

<section class="js-section module content-wrapper">

	<?php if(!$isInverted){
		echo $leftSideHTML . '<!--';
		echo '-->' . $rightSideHTML;
	} else {
		echo $rightSideHTML . '<!--';
		echo '-->' .$leftSideHTML;
	} ?>

</section>