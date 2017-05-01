<?php
/*
	Template Name: Books
*/
get_header(); ?>

<?php
	$cachedBooks = get_template_directory() . '/precompiled/page-' . $post->ID . 'a.php';
	if(file_exists($cachedBooks)){
		echo file_get_contents($cachedBooks);
	} else {
		include(get_template_directory() . '/parts/part-books-loop.php');
	}

get_footer();
