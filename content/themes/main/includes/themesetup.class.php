<?php

/**
	* Class ThemeSetup
	*
	* Configure your theme-setup.
	*
	* Possible options:
	* - debug (debug mode yes or no?)
	* - requireJSConfPath (path to requirejs config file)
	* - registerMenus (menus to be registered)
	* - filters
	* - actions
	*
	*/

class ThemeSetup {


	const SETTING_DEBUG = "themeSetting_debug";
	const SETTING_REQUIREJS_CONF_PATH = "themeSetting_requireJSConfPath";
	const SETTING_REGISTER_MENU = "themeSetting_registerMenus";
	const SETTING_FILTERS = "themeSetting_filters";
	const SETTING_ACTIONS = "themeSetting_actions";
	const SETTING_RWD_IMAGE_SIZES = "themeSetting_rwd-image-sizes";

	/**
	 * This is the global settings array to store all the information.
	 */
	protected static $settings = array(
		self::SETTING_DEBUG => true,
		self::SETTING_REQUIREJS_CONF_PATH => '/assets/config/require-build.js',
		self::SETTING_REGISTER_MENU => array(
			'main_nav' => 'Main Menu',
			'footer_nav' => 'Footer Menu',
		),
		self::SETTING_FILTERS => array(
			'show_admin_bar' => 'hideAdminBar',
			'jpeg_quality' => 'setJPEGFullQuality',
			'wp_editor_set_quality' => 'setJPEGFullQuality'
		),
		self::SETTING_ACTIONS => array(
			'init' => array(
				'cleanupHeader' => true,
				'beautifySearchRedirect' => true,
				'unloadJquery' => true,
				'removeComments' => true,
				'themeSupportThumbnails' => true
			),
			'after_setup_theme' => array(
				'robotNoIndexForDevelop' => true
			),
			'wp_footer' => array(
				'printRequireJSLazyLoadingPaths' => true
			)
		),
		self::SETTING_RWD_IMAGE_SIZES => array(
			'standard' => array(
				'fallback' => '512w',
				'sizes' => array('1920w', '1024w', '512w', '320w')
			),
			'portrait' => array(
				'fallback' => '670w',
				'sizes' => array('910w', '670w', '430w', '270w')
			)

		)
	);

	/**
	 * Hides the Admin Bar in the Frontend
	 * @return bool
	 */
	public static function hideAdminBar() {
		return false;
	}

	/**
	 * Do not index site while development
	 * adds noindex and nofollow as meta tag
	 */
	public static function robotNoIndexForDevelop() {
		if($_SERVER['ENVIRONMENT'] === 'Development'){
			echo '<meta name="robots" content="noindex,nofollow" />';
		}
	}

	/**
	 * Cleans up the HTML head by removing certain tags
	 */
	public static function cleanupHeader() {
		remove_action('wp_head', 'feed_links_extra', 3); // Display the links to the extra feeds such as category feeds
		remove_action('wp_head', 'feed_links', 2); // Display the links to the general feeds: Post and Comment Feed
		remove_action('wp_head', 'rsd_link'); // Display the link to the Really Simple Discovery service endpoint, EditURI link
		remove_action('wp_head', 'wlwmanifest_link'); // Display the link to the Windows Live Writer manifest file.
		remove_action('wp_head', 'index_rel_link'); // Index link
		remove_action('wp_head', 'parent_post_rel_link', 10, 0); // Prev link
		remove_action('wp_head', 'start_post_rel_link', 10, 0); // Start link
		remove_action('wp_head', 'adjacent_posts_rel_link', 10, 0); // Display relational links for the posts adjacent to the current
		remove_action('wp_head', 'wp_generator'); // Display the XHTML generator that is generated on the wp_head hook, WP version
		remove_action('wp_head', 'start_post_rel_link', 10, 0);
		remove_action('wp_head', 'adjacent_posts_rel_link_wp_head', 10, 0);
		remove_action('wp_head', 'rel_canonical');
		remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

		wp_deregister_script( 'wp-embed' );

		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
	}

	/**
	 * Redirects search results from /?s=query to /search/query/, converts %20 to +
	 * @link http://txfx.net/wordpress-plugins/nice-search/
	 */
	public static function beautifySearchRedirect() {
		global $wp_rewrite;
		if (!isset($wp_rewrite) || !is_object($wp_rewrite) || !$wp_rewrite->using_permalinks()) {
			return;
		}
		$search_base = $wp_rewrite->search_base;
		if (is_search() && !is_admin() && strpos($_SERVER['REQUEST_URI'], "/{$search_base}/") === false) {
			wp_redirect(home_url("/{$search_base}/" . urlencode(get_query_var('s'))));
			exit();
		}
	}

	/**
	 * Filters the image quality to be at the highest ratio possible.
	 */
	public static function setJPEGFullQuality( $quality ) {
		return 40;
	}

	/**
	 * Do not load jQuery
	 */
	public static function unloadJquery() {
		if (!is_admin() && !in_array($GLOBALS['pagenow'], array('wp-login.php', 'wp-register.php'))) {
			wp_deregister_script('jquery');
		}
	}

	/**
	 * No comments are needed? no problem.
	 */
	public static function removeComments() {
		// Removes from admin menu
		function removeCommentsFromAdminMenu() {
			remove_menu_page('edit-comments.php');
		}
		add_action('admin_menu', 'removeCommentsFromAdminMenu');

		// Removes from post and pages
		function removeCommentsSupport() {
			remove_post_type_support('post', 'comments');
			remove_post_type_support('page', 'comments');
		}
		add_action('init', 'removeCommentsSupport', 100);

		// Removes from admin bar
		function removeCommentsFromAdminBar() {
			global $wp_admin_bar;
			$wp_admin_bar->remove_menu('comments');
		}
		add_action('wp_before_admin_bar_render', 'removeCommentsFromAdminBar');
	}

	public static function themeSupportThumbnails(){
		add_theme_support( 'post-thumbnails' );
	}


	/**
	 * Registers all specified menus
	 */
	public static function registerMenus($menus){
		add_theme_support('menus'); // first add support for menus
		register_nav_menus($menus); // then register them
	}

	/**
	 * Fetches all paths from the requirejs config file and
	 * modifies the path setting to use absolute URLs. The
	 * updated settings are printed in a script-tag. This
	 * allowes the files specified in the 'paths' section of
	 * the config file to be loaded in a lazy way.
	 * @return prints a <script> tag
	 */
	public static function printRequireJSLazyLoadingPaths(){
		// $basePath = get_template_directory_uri() . '/assets/scripts';
		// $requireConfigPath = get_template_directory() . static::$settings[self::SETTING_REQUIREJS_CONF_PATH];
		// if(file_exists($requireConfigPath)){
		// 	preg_match_all('/\(([\s\S]+?)\)/', file_get_contents($requireConfigPath), $json);
		// 	$requirePaths = json_decode($json[1][0], true)['paths'];
		// 	$htmlPaths = '';
		// 	foreach ($requirePaths as $key => $value) {
		// 		*
		// 		 * we dont want to include requireLib and ready
		// 		 * because there is a high chance that they are
		// 		 * already bundled.

		// 		if($key != 'requireLib' && $key != 'ready'){
		// 			$htmlPaths .= '\''. $key .'\':\'' . $basePath. '/' . $value . '\',';
		// 		}
		// 	}
		// 	echo '<script>require.config({paths: {'. rtrim($htmlPaths, ",") .'}});</script>';
		// }else{
		// 	trigger_error("Require configuration File ". $path ." not found.", E_USER_WARNING);
		// }
		//
	}

	/**
	 * Merges the given setting into the global settings array.
	 * Replacing values if they are found.
	 * @param  $settings
	 * @return void
	 */
	public static function setSettings($settings) {
		static::$settings = array_replace_recursive(static::$settings, $settings);
	}

	/**
	 * Returns all settings
	 * @return array all settings
	 */
	public static function getSettings() {
		return static::$settings;
	}

	/**
	 * Sets a single setting
	 * @param  string $key    Key of the value you want to set
	 * @param  mixed  $value  The value you want to set
	 */
	public static function setSetting($key, $value) {
		static::$settings[$key] = $value;
	}

	/**
	 * Gets the value of a single setting
	 * @param  string $key They key of the value you want to read out
	 * @return mixed
	 */
	public static function getSetting($key) {
		return array_key_exists($key, static::$settings) ? static::$settings[$key] : false;
	}


	/**
	 * applies the settings
	 */
	public static function setup() {

		$actions = static::getSetting(self::SETTING_ACTIONS);
		foreach ($actions as $hooks => $hook) {
			foreach($hook as $functionName => $param) {
				if (is_string($functionName) && method_exists(new static(), $functionName)) {
					add_action($hooks, array(new static(), $functionName));
				}
			}
		}

		// filters
		$filters = static::getSetting(self::SETTING_FILTERS);
		foreach ($filters as $filter => $action) {
			add_filter($filter, array(new static(), $action));
		}

		// register menus
		$registeredMenus = static::getSetting(self::SETTING_REGISTER_MENU);
		if(count($registeredMenus) > 0){
			static::registerMenus(static::getSetting(self::SETTING_REGISTER_MENU));
		}

	}
}
