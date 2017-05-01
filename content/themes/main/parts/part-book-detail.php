<?php

	$isBookPage = true;

	// $books = get_posts(array(
	// 	'post_type' => 'he_books',
	// 	'post__in' => $booksToLoad,
	// 	'posts_per_page'   => -1,
	// 	'orderby' => 'menu_order',
	// 	'order' => 'DESC'
	// ));


	// echo count($books);
	//  echo '<pre>';
	//  var_dump($books);
	//  echo '</pre>';

?>



<div class="book-section-controls">
	<a href="" class="js-prev-book-section book-section-control book-section-control--prev is-inverted"></a>
	<a href="" class="js-next-book-section book-section-control book-section-control--next"></a>
	<div class="js-book-description-box  book-description-box">
		<div class="book-description-box-inner">
			<span class="book-label"><?php pll_e('title'); ?></span>
			<span class="js-book-title book-text book-title"><?php //echo get_the_title($books[0]->ID); ?></span>
			<span class="book-label"><?php pll_e('verlag'); ?></span>
			<span class="js-book-publisher book-text book-meta"><?php //the_field('field_56139d17e090d', $books[0]->ID); ?></span>
			<span class="book-label"><?php pll_e('isbn'); ?></span>
			<span class="js-book-isbn book-text book-meta"><?php //the_field('field_56139d29e090e', $books[0]->ID); ?></span>
		</div>
		<div class="book-navigation">
			<a class="js-prev-book  book-button  prev-book" href="#">
				<svg class="center  default-state" width="13" height="24" viewBox="0 0 13 24" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.8,0.8 L0.5,12.4 L11.1,23.4" stroke="#005667" fill="none" fill-rule="evenodd"/>
				</svg>
				<div class="center  hover-state">
					<span class="button-label"><?php pll_e('voriges'); ?></span>
					<span class="button-label"><?php pll_e('Buch'); ?></span>
				</div>
			</a>
			<a href="#" class="js-close-book  book-button  book-button-center">
				<svg class="center" width="23" height="23" viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
					<g stroke="#005667" fill="none" fill-rule="evenodd"><path d="M.5.4L22.5 22.4M.5 22.4L22.5.4"/></g>
				</svg>
			</a>
			<a class="js-next-book  book-button  next-book" href="#">
				<svg class="center  default-state  default-state-reverse" width="13" height="23" viewBox="0 0 13 23" xmlns="http://www.w3.org/2000/svg"><path d="M7,24.6 L18.3,13 L7.7,2" transform="translate(-6 -2)" stroke="#154D57" fill="none" fill-rule="evenodd"/></svg>
				<div class="center  hover-state">
					<span class="button-label"><?php pll_e('nächstes'); ?></span>
					<span class="button-label"><?php pll_e('Buch'); ?></span>
				</div>
			</a>
		</div>
	</div>
</div>

<div class="js-book-overlay book-overlay">

	<div class="js-book-detail-wrapper  book-detail-wrapper  page-wrapper">
		<?php $book = 0; ?>
		<div class="js-slides  slides"><!--
			<?php echo $booksHtml; ?>
		--></div>
	</div>
</div>
