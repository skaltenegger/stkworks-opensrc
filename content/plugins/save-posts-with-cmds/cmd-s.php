<?php
/*
Plugin Name: Save Posts With Cmd + S
Plugin URI:	 http://www.mikepayne.co/updating-wordpress-posts-with-ctrls
Version:	 v1.2
Author:      Mike Payne
Author URI:  http://mikepayne.co
Description: Publish or update posts and pages using the Ctrl+S hotkey (cmd+s on Mac). Overwrites the browsers default Ctrl+S function of "Save webpage as.." and instead runs the WordPress function assigned to the Publish button.
*/

/**
 * Enqueue javascript only on edit post page.
 * 
 * @access public
 * @param string $hook_suffix
 * @return void
 */
function cmds_admin_enqueue($hook_suffix) {
   if( 'post.php' == $hook_suffix || 'post-new.php' == $hook_suffix ) {
     wp_enqueue_script( 'cmds_js', plugins_url( 'cmd-s.js', __FILE__ ), array( 'jquery' ));
  }
}
add_action( 'admin_enqueue_scripts', 'cmds_admin_enqueue' );