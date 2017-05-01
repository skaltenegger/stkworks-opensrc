<?php
	$pageItems = array();
	$elementIndex = 0;
	$isBook = is_option('is-book', get_sub_field('l_options'));
	$isInverted = is_option('is-inverted', get_sub_field('l_options'));

	$imageSizes = array('landscape-alternative', 'portrait-small', 'portrait-small');

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
		get_element_html($pageItems[0], $classTag, ($isInverted) ? $slideIndex++ + 2 : $slideIndex++) .
	'</div>';

	$rightSideHTML =  '<div class="layout u-6/12">' .
		'<div class="layout">' .
			'<div class="layout u-6/12 p">' .
				get_element_html($pageItems[1], $classTag, ($isInverted) ? $slideIndex++ -1 : $slideIndex++) .
			'</div><!--' .
			'--><div class="layout u-6/12 p">' .
				get_element_html($pageItems[2], $classTag, ($isInverted) ? $slideIndex++ -1 : $slideIndex++) .
			'</div>' .
		'</div>' .
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