<?php
	$elementHTML = array();
	$elementIndex = 0;
	$isBook = is_option('is-book', get_sub_field('l_options'));
	$isLandscape = is_option('is-landscape', get_sub_field('l_options'));

	$imgSizeName = ($isLandscape) ? 'landscape': 'portrait-small';
	$imageSizes = array($imgSizeName, $imgSizeName, $imgSizeName, $imgSizeName);
	$isBook = is_option('is-book', get_sub_field('l_options'));

	$classTag = 'block';
	if($isBook){
		$classTag .= ' js-open-book book-teaser';
	}
?>
<section class="js-section module text--center content-wrapper">
<!--
<?php
	if( have_rows('r_image') ) {
		while ( have_rows('r_image') ) { ?>

			--><div class="layout u-3/12@tablet p">
				<?php
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

					echo get_element_html($pageItem, $classTag, $slideIndex);
					$elementIndex++;
					$slideIndex++;
				?>
			</div><!--
		<?php }
	}
?>
--></section>