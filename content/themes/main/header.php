<!DOCTYPE html>
<!--[if lt IE 9]><html class="no-js ie8" lang="<?php language_attributes(); ?>"><![endif]-->
<!--[if IE 9]><html class="no-js ie9" lang="<?php language_attributes(); ?>"><![endif]-->
<!--[if IE 10]><html class="no-js ie10" lang="<?php language_attributes(); ?>"><![endif]-->
<!--[if !IE]> --><html class="no-js" <?php language_attributes(); ?>><!-- <![endif]-->
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">

	<title>
		<?php global $page, $paged;

		wp_title( '-', true, 'right' );
		echo ' ' . get_bloginfo( 'title' );

		if ( $paged >= 2 || $page >= 2 ){
			echo ' - ' . sprintf( __( 'Page %s', 'ms' ), max( $paged, $page ) );
		} ?>
	</title>

	<link rel="stylesheet" href="<?php echo(get_template_directory_uri()); ?>/static/css/main.css?v=3">

	<script>
		var themePath = '<?php echo get_template_directory_uri(); ?>';
	</script>

	<!-- Favicons -->
	<link rel="apple-touch-icon" sizes="57x57" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-57x57-precomposed.png">
	<link rel="apple-touch-icon" sizes="60x60" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-72x72-precomposed.png">
	<link rel="apple-touch-icon" sizes="76x76" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-114x114-precomposed.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-144x144-precomposed.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?= get_template_directory_uri() ?>/static/favicon/apple-touch-icon-152x152.png">
	<link rel="icon" type="image/png" href="<?= get_template_directory_uri() ?>/static/favicon/favicon-96x96.png" sizes="96x96">
	<link rel="icon" type="image/png" href="<?= get_template_directory_uri() ?>/static/favicon/favicon-32x32.png?v=2" sizes="32x32">
	<link rel="shortcut icon" href="<?= get_template_directory_uri() ?>/static/favicon/favicon.png?v=2">

	<?php wp_head(); ?>

</head>


<?php
	$classes = '';
	// if($post->ID == WP_PAGE_ID_ABOUT){
	// 	$classes .= ' js-is-about is-about has-extra-padding';
	// }

	// if($post->ID == WP_PAGE_ID_SERVICES){
	// 	$classes .= ' is-services';
	// }

	// if($post->ID == WP_PAGE_ID_FRONTPAGE) {
	// 	$classes .= ' is-intro is-home is-frontpage';
	// }

	// // if($post->ID == WP_PAGE_ID_ABOUT || $post->ID == WP_PAGE_ID_BOOKS || $post->ID == WP_PAGE_ID_SERVICES){
	// $classes .= ' is-scrollhandler';
	// // }
	// if($post->ID == WP_PAGE_ID_FRONTPAGE || $post->ID == WP_PAGE_ID_SERVICES){
	// 	$classes .= ' has-svg-animations';
	// }
?>

<body class="js-body">

	<!--
	/*
	 * handcrafted by:
	 *
	 * Stefan Kaltenegger - http://www.stefankaltenegger.com/
	 *
	 * High five!
	 * Stefan
	 *
	 */
	-->
	<div id="site" class="js-site site <?php echo $classes; ?>">
		<main class="js-site-body site-body">
