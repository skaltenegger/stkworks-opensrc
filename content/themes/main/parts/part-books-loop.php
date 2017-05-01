<?php

	if(!isset($post_id)){
		$post_id = $post->ID;
	}

	$booksHtml = "";
	$slideIndex = 0;
	$pageContentIndex = 0;
	$pageContent = get_field(ACF_PAGE_CONTENT, $post_id);
?>

<div class="js-gallery has-lazyloading site-content site-padding page-wrapper pswp-gallery">
	<?php	foreach ($pageContent as $part) {

		// if(!in_array($part['acf_fc_layout'], array('medium2', 'image-3x'))) continue;

		$pageItems = array();

		 // echo '<pre>';
		 // print_r($part);
		 // echo '</pre>';exit;

		if(isset($part['r_image'])) {
			foreach ($part['r_image'] as $book) {
				$id = $book['book_reference']->ID;
				$bookContent = get_field(ACF_PAGE_CONTENT, $id);

				$pageItems[] = array(
					'title' => $book['l_title'],
					'sub-title' => $book['l_sub-title'],
					'img' => $book['l_image'],
					'book' => $id
				);
				$bookItemIndex = 0;

				$booksHtml .= '--><div class="js-book-slide  slide  book" data-book-id="' . $id . '" data-book-title="' . $book['book_reference']->post_title . '" data-book-publisher="'. get_field("book_publisher", $id) . '" data-book-isbn="' . get_field("book_isbn", $id) . '">';

				$bookImageIndex = 0;
				foreach ($bookContent as $bookDetailItem) {
					$img = $bookDetailItem['l_image'];

					$id = 'id="b' . $bookItemIndex . 's' . $bookImageIndex++ . '"';
					$booksHtml .= '<section ' . $id . ' class="js-section js-book-item book-item module fullscreen" data-book-item-index="' . $bookItemIndex++ . '">';
					$booksHtml .= '<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="js-ll-book-imgs book-imgs" data-src="'. $img['sizes']['landscape'] .'" data-srcset="' . $img['sizes']['landscape'] . ' 670w, ' . $img['sizes']['landscape-lightbox'] . ' 3840w" alt="' . $img['alt'] . '"></section>';
				}
				$booksHtml .= '</div><!--';
			}
		}
		include(get_template_directory() . '/layouts/part-book-' . $part['acf_fc_layout'] . '.php');
		$pageContentIndex++;
	}

//include(get_template_directory() . '/parts/part-page-builder.php'); ?>
</div>

<?php include(get_template_directory() . '/parts/part-book-detail.php');