<?php

class MainNavWalker extends Walker {

	static $onFirst = true;
	static $index = 0;
	var $db_fields = array(
		'parent' => 'menu_item_parent',
		'id'     => 'db_id'
	);

	function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {

		if($depth == 0) {
			$classes = empty ( $item->classes ) ? array () : (array) $item->classes;
			$class_names_li = ' class="js-' . (($depth == 0) ? '': 'sub-') . 'nav__item nav__item';

			if($item->current || in_array('current-menu-ancestor', $classes)) {
				$class_names_li .= ' is-current';
			}

			$class_names = join(' ', apply_filters('nav_menu_css_class', array_filter( $classes ), $item));
			$class_names_li .= '"';
			$url = esc_attr( $item->url);
			$title = apply_filters( 'the_title', $item->title, $item->ID );

			$attributes  = '';
			!empty( $item->attr_title )
					and $attributes .= ' title="'  . esc_attr( $item->attr_title ) .'"';
			!empty( $item->target )
					and $attributes .= ' target="' . esc_attr( $item->target) .'"';
			!empty( $item->xfn )
					and $attributes .= ' rel="'    . esc_attr( $item->xfn) .'"';
			!empty( $item->url )
					and $attributes .= ' href="'   . $url .'"';

			$dataIndex = '';
			$dataIndex = ' data-index="'   . static::$index++ .'"';
			$output .= "<li ". $class_names_li . $dataIndex . ">";

			$item_output =  $args->before . $args->link_before;
			$item_output = '<a class="js-nav__link nav__link ' . $class_names . '"' . $attributes . ">"
				. $title
				. '</a> ';
			$item_output .= $args->link_after . $args->after;
			$output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
		}
	}

	function end_el( &$output, $item, $depth = 0, $args = array() ) {
		if($depth == 0){
			$output .= '</li>';
		}
	}

	function start_lvl( &$output, $depth = 0, $args = array() ) {
		// $output .= '<div class="js-sub-nav sub-nav"><ul class="sub-nav-list clearfix">';
	}

	function end_lvl( &$output, $depth = 0, $args = array() ) {
		// $output .= '</ul></div>';
	}
}
