<?php
/**
	* Mario Sommer
	* http://www.mariosommer.at
	*
	* @package ms
	* @since 1.0
*/

/**
	* WP SETUP
	*/

// ----------------------------------------------------------------------------------
// Constants
// ----------------------------------------------------------------------------------
// e.g.:
// define('WP_PAGE_ID_OUR_WORK', 7); 

	// define('WP_PAGE_ID_FRONTPAGE', pll_get_post(2));
	// define('WP_PAGE_ID_WORK', pll_get_post(9));
	// define('WP_PAGE_ID_ABOUT', pll_get_post(71));
	// define('WP_PAGE_ID_SERVICES', pll_get_post(73));
	// define('WP_PAGE_ID_REFERENCES', pll_get_post(75));
	// define('WP_PAGE_ID_CONTACT', pll_get_post(77));

	// define('WP_PAGE_ID_FOOD', pll_get_post(24));
	// define('WP_PAGE_ID_HOTEL', pll_get_post(26));
	// define('WP_PAGE_ID_COMMERCIAL', pll_get_post(28));
	// define('WP_PAGE_ID_HOME', pll_get_post(21));
	// define('WP_PAGE_ID_BOOKS', pll_get_post(30));
	// define('WP_PAGE_ID_PEOPLE', pll_get_post(19));


	define('ACF_PAGE_CONTENT', 'page_content');
	// define('ACF_LAYOUT_TEXT', 'l_text');
	// define('ACF_LAYOUT_TEXT_LINE', 'l_text-line');
	// define('ACF_LAYOUT_TEXT_LINE2', 'l_text-line2');
	// define('ACF_LAYOUT_IMAGE', 'l_image');
	// define('ACF_LAYOUT_ICONS', 'l_icons');

	// define('ACF_FEATURED_IMAGE', 'field_55eac3f358221');
	// define('ACF_FEATURED_IMAGE_2', 'field_55eac42162f53');

	// if( is_admin() && function_exists("pll_register_string") ) {
	// 	pll_register_string( "hep", "Home", "Home", false );
	// 	pll_register_string( "hep", "Work", "Work", false );
	// 	pll_register_string( "hep", "About", "About", false );
	// 	pll_register_string( "hep", "Services", "Services", false );
	// 	pll_register_string( "hep", "References", "References", false );
	// 	pll_register_string( "hep", "Contact", "Contact", false );

	// 	pll_register_string( "hep", "Atelier", "Atelier", false );
	// 	pll_register_string( "hep", "Styria", "Styria", false );
	// 	pll_register_string( "hep", "Vienna", "Vienna", false );
	// 	pll_register_string( "hep", "Anfahrt", "Anfahrt", false );
	// 	pll_register_string( "hep", "Hohlweggasse 38/37<br />1030 Vienna<br />Austria", "Hohlweggasse 38/37<br />1030 Vienna<br />Austria", false );
	// 	pll_register_string( "hep", "Lanngweg 35 <br />8010 Graz/Kainbach<br />Austria", "Lanngweg 35 <br />8010 Graz/Kainbach<br />Austria", false );

	// 	pll_register_string( "hep", "We would like to hear from you", "We would like to hear from you", false );
	// 	pll_register_string( "hep", "Nice name!", "Nice name!", false );
	// 	pll_register_string( "hep", "Insert message", "Insert message", false );
	// 	pll_register_string( "hep", "send", "send", false );
	// 	pll_register_string( "hep", "thanks", "thanks", false );

	// 	pll_register_string( "hep", "Beratung und Fotokonzept", "Beratung und Fotokonzept", false );
	// 	pll_register_string( "hep", "Visualisierung<br /> durch Moodboards", "Visualisierung<br /> durch Moodboards", false );
	// 	pll_register_string( "hep", "Planung des <br/>Shootings", "Planung des <br/>Shootings", false );
	// 	pll_register_string( "hep", "Auswahl der<br/> Fotolocation", "Auswahl der<br/> Fotolocation", false );
	// 	pll_register_string( "hep", "Casting", "Casting", false );
	// 	pll_register_string( "hep", "Make-Up<br /> und Styling", "Make-Up<br /> und Styling", false );
	// 	pll_register_string( "hep", "Fotoshooting", "Fotoshooting", false );
	// 	pll_register_string( "hep", "Postproduktion", "Postproduktion", false );
	// 	pll_register_string( "hep", "Weiterverarbeitung<br /> für alle Medien", "Weiterverarbeitung<br /> für alle Medien", false );
	// 	pll_register_string( "hep", "Get in Touch", "Get in Touch", false );

	// 	pll_register_string( "hep", "About", "About", false );
	// 	pll_register_string( "hep", "Services", "Services", false );
	// 	pll_register_string( "hep", "Kontakt", "Kontakt", false );

	// 	pll_register_string( "hep", "title", "title", false );
	// 	pll_register_string( "hep", "verlag", "verlag", false );
	// 	pll_register_string( "hep", "isbn", "isbn", false );
	// 	pll_register_string( "hep", "nächstes", "nächstes", false );
	// 	pll_register_string( "hep", "voriges", "voriges", false );
	// 	pll_register_string( "hep", "Buch", "Buch", false );

	// 	pll_register_string( "hep", "Konzeption, Design und Projektmanagement", "Konzeption, Design und Projektmanagement", false );
	// 	pll_register_string( "hep", "Technische Umsetzung", "Technische Umsetzung", false );
	// 	pll_register_string( "hep", "Front Page Video", "Front Page Video", false );
	// 	pll_register_string( "hep", "Allgemeine Geschäftsbedingungen", "Allgemeine Geschäftsbedingungen", false );

	// }


// add_filter("option_upload_path", function ($path, $option) {
//   $root_path = str_replace("wp/", "", ABSPATH);
//   //$path = $root_path . "media";
//   echo $path;
//   return $path;
// }, 0, 2);

// add_filter("option_upload_url_path", function ($url, $option) {
//     // $url = "http://getinshape.dev/media";
//     return $url;

// }, 0, 2);

if(is_admin()){
	function on_save_post( $post_id) {
		global $post;
		$post = get_post($post_id);
		$postTemplate = get_page_template_slug( $post_id );
		$slideIndex = 0;
		// If this is just a revision, or not a page or book don't do anything
		if (wp_is_post_revision( $post_id )
			|| 'page' != $post->post_type
			|| !in_array($postTemplate, array('page-books.php', 'page-category.php')) ) {
        return;
    }

    $pageOrBook = ('page-books.php' == get_page_template_slug( $post_id )) ? 'book' : 'page';

    ob_start();

    if($pageOrBook == 'page') {
			if( have_rows(ACF_PAGE_CONTENT, $post_id) ) {
				while ( have_rows(ACF_PAGE_CONTENT, $post_id) ) {
					the_row();
					include(get_template_directory() . '/layouts/part-' . get_row_layout() . '.php');
				}
			}
    } else if ($pageOrBook == 'book') {
			include(get_template_directory() . '/parts/part-books-loop.php');
		}

		$htmlStr = ob_get_contents();
		ob_end_clean();
		file_put_contents(get_template_directory() . '/precompiled/page-' . $post_id . '.php', $htmlStr);
	}
	// add_action( 'save_post', 'on_save_post' );
	//add_action('acf/save_post', 'on_save_post', 20);
}


// global $pageCategories;
// $pageCategories = array(
// 	WP_PAGE_ID_PEOPLE,
// 	WP_PAGE_ID_FOOD,
// 	WP_PAGE_ID_HOTEL,
// 	WP_PAGE_ID_COMMERCIAL,
// 	WP_PAGE_ID_HOME,
// 	WP_PAGE_ID_BOOKS
// );



// ----------------------------------------------------------------------------------
// Theme Setup/Settings (optional)
// TODO: autoloader for the win!
// ----------------------------------------------------------------------------------
require_once('includes/image.class.php');
require_once('includes/walker.class.php');
require_once('includes/themesetup.class.php');
require_once('includes/phpmailer.class.php');

/**
	* register additional menus
	* default: Main Menu will be registerd
	*/
ThemeSetup::setSetting('registerMenus', array(
	'main_nav' => 'Main Menu',
	'secondary_nav' => 'Secondary Menu'
));

remove_image_size('medium');
remove_image_size('large');


add_image_size( 'portrait-small', 430, 645, true);
add_image_size( 'portrait-small-lightbox', 1600, 2400, true);

// big-small2-medium
add_image_size( 'portrait-big', 670, 962, true);
add_image_size( 'portrait-big-lightbox', 1672, 2400, true);

//medium2-big
add_image_size( 'portrait-big2', 670, 943, true);
add_image_size( 'portrait-big2-lightbox', 1705, 2400, true);

//big-small4
add_image_size( 'portrait-big3', 670, 977, true);
add_image_size( 'portrait-big3-lightbox', 1646, 2400, true);

add_image_size( 'landscape', 670, 447, true);
add_image_size( 'landscape-lightbox', 3840, 2560, true);

add_image_size( 'landscape-alternative', 670, 465, true);
add_image_size( 'landscape-alternative-lightbox', 3840, 2671, true);


/**
	* Setup the theme based on the settings.
	*/
ThemeSetup::setup();



// ----------------------------------------------------------------------------------
// Project specific theme setup
// ----------------------------------------------------------------------------------
if (!function_exists('init_theme')){
	function init_theme(){


		//init shortcodes here
		//$shortcodes = new Shortcodes();
		//...
		if( function_exists('acf_add_options_page') ) {
			acf_add_options_page();
			acf_add_options_sub_page('Allgemein');
			acf_add_options_sub_page('Footer');
		}
	}

}
add_action('after_setup_theme', 'init_theme');

/**
 * allow svg uploads
 */
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');


/**
 * remove editor and thumbnail from page because
 * we use the page builder
 */
function remove_post_type_support_for_pages() {
		// UNCOMMENT if you want to remove some stuff
		// Replace 'page' with 'post' or a custom post/content type
		# remove_post_type_support( 'page', 'title' );
		// remove_post_type_support( 'page', 'editor' );
		remove_post_type_support( 'page', 'thumbnail' );
		# remove_post_type_support( 'page', 'page-attributes' );
		# remove_post_type_support( 'page', 'excerpt' );
}
add_action( 'admin_init', 'remove_post_type_support_for_pages' );


function get_other_categories($postID){
	global $pageCategories;
	$catArray = $pageCategories;
	if(($key = array_search($postID, $catArray)) !== false) {
		unset($catArray[$key]);
	}
	return $catArray;
}

function prepare_pageItems_for_teaser($pageIDs){
	$pageItems = array();
	$numOfItems = count($pageIDs);

	for($i = 0; $i <= $numOfItems; $i++){
		if(isset($pageIDs[$i])){
			array_push($pageItems, array(
				'title' => get_the_title($pageIDs[$i]),
				'sub-title' => '',
				'page-url' => get_permalink($pageIDs[$i]),
				'img' => get_field(ACF_FEATURED_IMAGE, $pageIDs[$i]),
				'img-alt' => get_field(ACF_FEATURED_IMAGE_2, $pageIDs[$i])
			));
		}
	}
	return $pageItems;
}



function getNextProject($id) {
	$pageBuilder = get_field('page_content', 2);
	$works = $pageBuilder[2]['works'];
	$count = count($works);
	$i = 0; 
	$resultIndex = 0; 

	foreach($works as $work) {
		$project = $work['work'];
		if($id == $project->ID) {
			if($i < $count - 1) {
				$resultIndex = $i+1; 
			}
			else {
				$resultIndex = 0; 
			}
		}
		$i++;
	}

	return $works[$resultIndex]['work']; 
}





function is_option($optionName, $options){
	if(!is_array($options)){
		return false;
	}
	return in_array($optionName, $options);
}


function render_overlay($title, $subTitle){
	return'<div class="js-img-overlay img-overlay">' .
		'<div class="layout center">' .
			'<svg class="overlay-icon" width="56" height="56" viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#005467"><path d="M4.5,0.1 L9.1,0.1 C9.5,0.1 9.9,0.5 9.9,0.9 L9.9,5.5 C9.9,5.9 9.5,6.3 9.1,6.3 C8.7,6.3 8.3,5.9 8.3,5.5 L8.3,1.7 L4.5,1.7 C4.1,1.7 3.7,1.3 3.7,0.9 C3.7,0.5 4.1,0.1 4.5,0.1 L4.5,0.1 Z" transform="translate(31 15)"/><path d="M0.9,9.2 C1.2,9.5 1.7,9.5 2,9.2 L9.1,2.1 C9.3,1.9 9.3,1.7 9.3,1.5 C9.3,1.3 9.2,1.1 9.1,0.9 C8.9,0.7 8.7,0.7 8.5,0.7 C8.3,0.7 8.1,0.8 7.9,0.9 L0.9,8 C0.7,8.2 0.7,8.4 0.7,8.6 C0.7,8.8 0.8,9 0.9,9.2 L0.9,9.2 Z" transform="translate(31 15)"/></g><g fill="#005467"><path d="M6.4,10.2 L1.8,10.2 C1.4,10.2 1,9.8 1,9.4 L1,4.8 C1,4.4 1.4,4 1.8,4 C2.2,4 2.6,4.4 2.6,4.8 L2.6,8.6 L6.4,8.6 C6.8,8.6 7.2,9 7.2,9.4 C7.2,9.8 6.8,10.2 6.4,10.2 L6.4,10.2 Z" transform="translate(15 30)"/><path d="M10,1.1 C9.7,0.8 9.2,0.8 8.9,1.1 L1.8,8.2 C1.6,8.4 1.6,8.6 1.6,8.8 C1.6,9 1.7,9.2 1.8,9.4 C2,9.6 2.2,9.6 2.4,9.6 C2.6,9.6 2.8,9.5 3,9.4 L10.1,2.3 C10.3,2.1 10.3,1.9 10.3,1.7 C10.2,1.5 10.1,1.3 10,1.1 L10,1.1 Z" transform="translate(15 30)"/></g><path stroke="#005467" stroke-width="2" d="M0.9 0.2H53.9V53.2H0.9z" transform="translate(1 1)"/></g></svg>' .
			'<span class="js-overlay-title overlay-label overlay-title">' . $title . '</span>' .
			'<span class="js-overlay-sub-title overlay-label overlay-sub-title">' . $subTitle . '</span>' .
		'</div>' .
	'</div>';
}

/**
 * renders a category photo for photoswipe or books page
 * @param  [array] $pageItem      [holds page information, image urls, sizes etc.]
 * @param  [string] $classTag     [defines category image or book]
 * @param  [integer] $slideIndex  [overall number of slide (photoswipe)]
 * @return [string]               [html string]
 */
function get_element_html($pageItem, $classTag, $slideIndex){
	$lightboxImgUrl = $pageItem['img']['sizes'][$pageItem['imageSize'] .'-lightbox'];
	$dataSize = $pageItem['img']['sizes'][$pageItem['imageSize'] . "-lightbox-width"] . 'x' . $pageItem['img']['sizes'][$pageItem['imageSize'] ."-lightbox-height"];

	$dataBookId = "";
	if($pageItem['book'] > 0){
		$dataBookId .= ' data-book-id="' . $pageItem['book'] . '"';
	}

	return '<figure class="js-slide pwsp-slide relative" data-slide-index="' . $slideIndex . '">' .
		'<a class="js-no-page-transition ' . $classTag . '" href="'. $lightboxImgUrl . '" data-size="' . $dataSize .'"' . $dataBookId . '>' .
			'<img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" class="js-slide-thumbnail js-be-lazy lazy-img slide-thumbnail" data-src="' . $pageItem['img']['sizes'][$pageItem['imageSize']] . '" alt="'.$pageItem['img']['alt']. '">' .
			render_overlay($pageItem['title'], $pageItem['sub-title']) .
		'</a>' .
	'</figure>';
}


function sendMail($mailFrom, $name, $msg){
	$mail = new PHPMailer;
	$mail->CharSet = 'UTF-8';
	$mail->setFrom($mailFrom, $name);
	$mail->addAddress(get_field('email_contact', 'options'));     // Add a recipient
	$mail->addReplyTo($mailFrom, $name);
	$mail->isHTML(true);                                  // Set email format to HTML

	$mail->Subject = '[webseite] - Anfrage von: ' . $name;
	$mail->Body    = $msg;

	// if(!$mail->send()) {
	// 	echo 'Message could not be sent.';
	// 	echo 'Mailer Error: ' . $mail->ErrorInfo;
	// }
	return $mail->send();
}

function m_ajaxCall(){
	if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
		&& !empty($_SERVER['HTTP_X_REQUESTED_WITH'])
		&& strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'
		&& isset($_POST['ajaxcall'])) {


		if($_POST['human'] != ''){
			die('are we human or are we dancer?');
		}

		$action = $_POST['action'];
		$mailFrom = $_POST['email'];

		if(isset($action)){
			switch ($action) {
				case 'getInContact':
					echo sendMail($mailFrom, $_POST['name'], $_POST['message']);
				break;
				  default:
				break;
			}
		}
		die();
	}
}
add_action('init', 'm_ajaxCall');

function get_option_classes($options) {
	if($options != "") {
		return implode(' ', $options);
	}
	return '';
}

function clean($string) {
 $string = str_replace(' ', '-', $string);
 return strtolower(preg_replace('/[^A-Za-z0-9\-]/', '', $string));
}


/*
 *
 * Create my own JSON endpoint for my SPA
 * stk.works/endpoint
 *
 */   


add_action( 'rest_api_init', function () {
	register_rest_route( 'endpoint', '/stk', array(
		'methods' => 'GET',
		'callback' => 'getCustomJsonData'
		)
	);
});


function getCustomJsonData( $data ) {
	
	$resultsArray = array();

    $pages = get_pages();
    foreach($pages AS $item) {
    	$page = array(
    		'id' => $item->ID,
    		'slug' => $item->post_name,
    		'title' => $item->post_title,
    		'content' => $item->post_content
    	);
    	$page_content = get_field('page_content', $item->ID);
    	$page['page_content'] = $page_content;

    	$slug = $item->post_name;
    	if($slug == "home") $slug = "/"; 

    	$resultsArray[$slug] = $page; 
    }


    $projects = get_posts(array('post_type' => 'for'));
    foreach($projects AS $item) {
    	$project = array(
    		'id' => $item->ID,
    		'slug' => $item->post_name,
    		'title' => $item->post_title,
    		'content' => $item->post_content
    	);

    	$project['video_thumb'] = get_field('video_thumb', $item->ID);
    	$project['video_poster'] = get_field('video_poster', $item->ID);
    	$project['type'] = get_field('type', $item->ID);
    	$project['role'] = get_field('role', $item->ID);
    	$project['year'] = get_field('year', $item->ID);
    	$project['live_link'] = get_field('live_link', $item->ID);
    	$project['color-class'] = get_field('color-class', $item->ID);

    	$page_content = get_field('page_content', $item->ID);
    	$project['page_content'] = $page_content;
    	
    	$slug = "/for/".$item->post_name;

    	$resultsArray[$slug] = $project; 
    }


    $footerArray = array(
    	'column_1' => get_field('column_1', 'option'),
    	'column_2' => get_field('column_2', 'option'),
    	'column_3' => get_field('column_3', 'option'),
    	'column_4' => get_field('column_4', 'option')
    );

    $content = array(
    	'posts' => $resultsArray,
    	'footer' => $footerArray
    );
	
	return $content;  
}


function exportToJson($post_id) {
	$content = getCustomJsonData(null);
	$data = json_encode($content, JSON_UNESCAPED_SLASHES);
	
	$filepath = $_SERVER['DOCUMENT_ROOT'].'/data/stk-data.json';

	if ($_SERVER['ENVIRONMENT'] === 'development') {
		$filepath = $_SERVER['DOCUMENT_ROOT'].'/public/data/stk-data.json';
	}

	$myfile = fopen($filepath, "w") or die("Unable to open file!");
	fwrite($myfile, $data);
	fclose($myfile);
}

add_action( 'save_post', 'exportToJson');



