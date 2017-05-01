<?php
/*
	Template Name: Modules
*/
$slideIndex = 0;

include(locate_template('header.php'));

?>
<div class="site-content site-padding page-wrapper pswp-gallery">


	<h1>Current</h1>
	<?php //include(locate_template('part-page-builder.php'));
			$pageItems = array(
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x960.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/310x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/310x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x445.jpg')
				)
			);
			include(locate_template('layouts/part-big-small2-medium.php')); ?>

			<h1>New</h1>

	<?php
			$pageItems = array(
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x980.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/310x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/310x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x465.jpg')
				)
			);
			include(locate_template('layouts/part-big-small2-medium.php')); ?>

			<h1>Problem</h1>

			<?php $pageItems = array(
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x445.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x445.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x960.jpg')
				)
			);
			include(locate_template('layouts/part-medium2-big.php')); ?>

			<h1>Solved?</h1>
			<?php
			$pageItems = array(
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x465.jpg')
				),
				array(
				'title' => '',
				'sub-title' => '',
				'img' => array('url' => get_template_directory_uri() . '/static/gfx/670x980.jpg')
				)
			);
			include(locate_template('layouts/part-medium2-big.php'));
	?>
</div>
<?php
include(locate_template('footer.php'));
