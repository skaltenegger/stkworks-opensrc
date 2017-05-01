<?php

/** Conditional Loading of Plugins **/


// add_filter('option_active_plugins', 'mbi_filter_plugins');
add_filter('active_plugins', 'mbi_filter_plugins');

function mbi_filter_plugins($active_plugins){
	$pluginsToRemove = array();

	//echo "horray";

	//wp-limit-login-attempts only needed on login page
	if (strpos($_SERVER["REQUEST_URI"],'wp-admin') === false) {
		addToPluginsToRemoveArray("wp-limit-login-attempts/limit-login-attempts.php", $pluginsToRemove);
  }

	if(!is_admin()){ // deactivate plugins not needed on front-end here
		addToPluginsToRemoveArray("adminimize/adminimize.php", $pluginsToRemove);
	}

	return array_diff($active_plugins, $pluginsToRemove);
}

/**
*	Add only if it is not already in the array
**/
function addToPluginsToRemoveArray($plugin, &$plugins){
	if(!in_array($plugin, $plugins)){
		array_push($plugins, "adminimize/adminimize.php");
	}
}
