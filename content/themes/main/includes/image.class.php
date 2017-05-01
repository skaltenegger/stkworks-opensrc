<?php

/**
	* Class Image
	*
	* Handles Responsive Images using srcset
	*
	* - Media-Queries not yet implemented
	* - No Art-Direction
	*
	* Polyfills should be applied using:
	* https://github.com/scottjehl/picturefill
	*
	**/
Class Image {

	/**
	 * Public render function for the responsive images implementation.
	 * Takes an ACF-Image or Url, Template (as string or Array, for
	 * info on how to use templates see themesetup.class.php) and a
	 * boolean wheater to print or not.
	 *
	 * Images that do not exist are created based on the given sizes (1024w, 768w, etc.)
	 *
	 * @param  ACF-Image|Object|String|  	$image    base image
	 * @param  string|array  							$template array specifying sizes or template defined in settings.
	 * @param  boolean 										$echo     print or not
	 * @return string            										rendered html
	 */
	public static function render($image, $template = 'standard', $classes = "", $alt = '', $echo = true) {

		$imageObj = array();
		if(is_string($image)){
			$imageObj['url'] = $image;
		}else {
			$imageObj = $image;
		}

		if(!array_key_exists('url', $imageObj)){
			throw new Exception('Image-Object must have a key named `url´');
		}
		$classesToAdd = ($classes != '') ? 'class="' . $classes . '"' : '';
		$altTag = 'alt="' . (($alt != '') ?  $alt : '') . '"';


		// get the template
		$templateObj = array();
		if(is_string($template)){

			$temp = ThemeSetup::getSetting(ThemeSetup::SETTING_RWD_IMAGE_SIZES)[$template];

			$templateObj['sizes'] = $temp['sizes'];
			$templateObj['fallback'] = $temp['fallback'];
		}

		// generate html tag
		$output = '<img '. $classesToAdd . ' ' . $altTag . ' src="' . self::getImageUrlForSize($imageObj['url'], $templateObj['fallback']) . '"';
		$output .= self::renderSrcset($imageObj['url'], $templateObj['sizes']);
		$output .= '>';

		if ($echo === true) {
			echo $output;
		}

		$templateObj['html'] = $output;
		return $templateObj;
	}

	/**
	 * Outputs the srcset attribute based on the given sizes
	 * @param  string $baseImageUrl Url to the base image
	 * @param  array 	$sizes        sizes 1024w, 768w etc.
	 * @return string 							rendered srcset
	 */
	private static function renderSrcset($baseImageUrl, $sizes) {

		// return if basefile does not exists
		if(!file_exists(PROJECT_ROOT_ABSPATH . parse_url($baseImageUrl)['path'])){
			return '';
		}

		$output = ' srcset="';

		foreach ($sizes as $size){
			$imageUrl = self::getImageUrlForSize($baseImageUrl, $size);
			$filePath = self::convertUrlToPath($imageUrl);

			if(!file_exists($filePath)){
				// create that image version (size).
				self::resize(self::convertUrlToPath($baseImageUrl), $size);
			}

			$output .= $imageUrl . ' '. $size . ',';
		}

		return rtrim($output, ",") . '"';
	}

	/**
	 * Uses WP_Image_Editor to create a version of the
	 * given Image which is as wide as specified.
	 *
	 * @param string $path 	path to the base image
	 * @param string $size 	size width of image
	 * @return array|bool|WP_Error
	 */
	public static function resize($path, $size) {
		$imageEditor = wp_get_image_editor($path);
		if (!is_wp_error($imageEditor)) {
			$imageEditor->resize(str_replace('w', '', $size), NULL, false);
			$imageEditor->set_quality(40);
			return $imageEditor->save(self::getImageUrlForSize($path, $size));;
		}
		return false;
	}

	/**
	 * Returns the actual URL for a specific version of an image.
	 * E.g. http://hell.yeah/cool-image_320w.jpg
	 * @param  string $url  base url of the image
	 * @param  string $size width of the image
	 * @return string 			Url to specific version of the image
	 */
	private static function getImageUrlForSize($url, $size) {
		$extension = pathinfo($url, PATHINFO_EXTENSION);
		return str_replace('.' . $extension, '_'. $size .'.'. $extension, $url);
	}

	/**
	 * Converts a Url to an absolut path
	 * @param  string $url 	url to convert
	 * @return string 			path to file
	 */
	private static function convertUrlToPath($url) {
		return PROJECT_ROOT_ABSPATH . parse_url($url)['path'];
	}
}
