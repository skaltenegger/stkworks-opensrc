<?php
/**
	* The base configurations of the WordPress.
	*
	* INDEX ............ what you are reading right now
	* SALT KEYS ........ secure your cookies
	* CONTEXT .......... dev or production
	* TABLE PREFIX ..... do not use the default one
	* THEME ............ set default theme
	* CHARSET .......... utf-8 it is
	* COLLATE .......... db collate type
	* WPLANG ........... default language
	* MEMORY LIMIT ..... more power ho-ho-horgh!
	* POST REVISION .... one mistake is for free
	*
	*/

/**
	* SALT KEYS
	* Authentication Unique Keys and Salts.
	*
	* Change these to different unique phrases!
	* You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
	* You can change these at any point in time to invalidate all existing cookies.
	* This will force all users to have to log in again.
	*
	* @since 2.6.0
	*/

define('AUTH_KEY',         '');
define('SECURE_AUTH_KEY',  '');
define('LOGGED_IN_KEY',    '');
define('NONCE_KEY',        '');
define('AUTH_SALT',        '');
define('SECURE_AUTH_SALT', '');
define('LOGGED_IN_SALT',   '');
define('NONCE_SALT',       '');

/**
	* ENVIRONEMNT
	* local development or production
*/

if (!isset($_SERVER['ENVIRONMENT']) || (isset($_SERVER['ENVIRONMENT']) && $_SERVER['ENVIRONMENT'] === 'production')) {

	define('DB_NAME', '');
	define('DB_USER', '');
	define('DB_PASSWORD', '');
	define('DB_HOST', '');

	define('WP_DEBUG', false);
	define('WP_LOCAL_DEV', false);

	define('WP_HOME',        'http://' . $_SERVER['SERVER_NAME']);
	define('WP_SITEURL',     'http://' . $_SERVER['SERVER_NAME'] . '/wp');
	define('WP_CONTENT_URL', 'http://' . $_SERVER['SERVER_NAME'] . '/content');
	define('WP_CONTENT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/content');

	define( 'FS_METHOD', '');
	define( 'FTP_BASE', '' );
	define( 'FTP_CONTENT_DIR', '');
	define( 'FTP_PLUGIN_DIR ', '');
	define( 'FTP_USER', '');
	define( 'FTP_PASS', '');
	define( 'FTP_HOST', '');	
	define( 'FTP_SSL', '');

} else if ($_SERVER['ENVIRONMENT'] === 'development') {

/**
	* DEVELOPMENT SETUP
	* One time setup for local development
	* add the following to httpd.conf:
	*
	* SetEnv localDBHost localhost
	* SetEnv localDBUser root
	* SetEnv localDBPass
	* SetEnv localDBPort 3306
	* SetEnv ENVIRONMENT development
	*
	* DATABASE
	* The name of the Database must match the lowercase name of the project root folder
	*/

	define('WP_DEBUG', true);
	define('WP_LOCAL_DEV', true);
	define('FS_METHOD', 'direct'); //allow local updates

	$url = 'http://' . $_SERVER['SERVER_NAME']; 

	define('WP_HOME', $url);
	define('WP_SITEURL', $url . '/wp');
	define('WP_CONTENT_URL', $url . '/content');
	define('WP_CONTENT_DIR', $_SERVER['DOCUMENT_ROOT'] . '/content');

	define('DB_NAME', strtolower(basename(__DIR__)));
	define('DB_USER', $_SERVER['localDBUser']);
	define('DB_PASSWORD', $_SERVER['localDBPass']);
	define('DB_HOST', isset($_SERVER['localDBPort']) ? $_SERVER['localDBHost'] . ':' . $_SERVER['localDBPort'] : $_SERVER['localDBHost']);
}

/** Database table prefix **/
$table_prefix  = 'wp_';

/** Set default theme **/
define('WP_DEFAULT_THEME', 'main');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/** WordPress language **/
define('WPLANG', 'de_DE');

/** Increase memory limit **/
define('WP_MEMORY_LIMIT', '128M');

/** Store every post revision **/
define('WP_POST_REVISIONS', true); 

/** Enable W3 Total Cache */
define('WP_CACHE', true); // Added by W3 Total Cache

/** needed for image resizing in image.class */
if ( !defined('PROJECT_ABSPATH') )
	define('PROJECT_ABSPATH', dirname(dirname(__FILE__)));

if ( !defined('PROJECT_ROOT_ABSPATH') )
	define('PROJECT_ROOT_ABSPATH', dirname(__FILE__));

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

/* That's all, stop editing! Happy blogging. */