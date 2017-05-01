<?php
/**
 * Page Builder
 * Displays all flexible content entries
 * Templates are based on the name of each entrie's layout name
 *
 */

//print_r(get_field(ACF_PAGE_CONTENT));

if( have_rows(ACF_PAGE_CONTENT) ) {
	while ( have_rows(ACF_PAGE_CONTENT) ) {
		the_row();
		include(get_template_directory() . '/layouts/part-' . get_row_layout() . '.php');
	}
}