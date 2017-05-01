<?php

/**
* Image
*
**/
Class Image {

	/**
	 * Renders a responsive Image and makes sure all used images available in their sizes.
	 * Outputs a Picture Tag - Should be used with
	 * @link: http://scottjehl.github.io/picturefill/
	 *
	 * Example:
	 *   Image::renderPicture(array(
	 *     '(min-width: 1000px)' => array(
	 *       array('image' => get_field('image_big'), 'width' => 800)
	 *     ),
	 *     '(min-width: 800px)' => array(
	 *       array('image' => get_field('image'), 'width' => 600)
	 *     ),
	 *     '' => array(
	 *       array('image' => get_field('image'), 'width' => 300),
	 *     )
	 *   ));
	 *
	 *   <picture>
	 *     <!--array(if IE 9)><video style="display: none;"><!array(endif)-->
	 *     <source srcset="image_big-800x000.jpg 800w" media="(min-width: 1000px)" />
	 *     <source srcset="image-600x000.jpg 600w" media="(min-width: 800px)" />
	 *     <!--array(if IE 9)></video><!array(endif)-->
	 *     <img srcset="image-300x000.jpg 300w" alt="" />
	 *   </picture>
	 *
	 * Example:
	 *   Image::renderPicture(array(
	 *     '(min-width: 800px)' => array(
	 *       array('image' => get_field('image'), 'width' => 500)
	 *       array('image' => get_field('image'), 'width' => 1000)
	 *     ),
	 *     '' => array(
	 *       array('image' => get_field('image'), 'width' => 300),
	 *       array('image' => get_field('image'), 'width' => 600)
	 *     )
	 *   ));
	 *
	 *   <picture>
	 *     <!--[if IE 9]><video style="display: none;"><![endif]-->
	 *     <source srcset="image-500x000.jpg 500w, image-1000x000.jpg 1000w" media="(min-width: 800px)" />
	 *     <!--[if IE 9]></video><![endif]-->
	 *     <img srcset="image-300x000.jpg 300w, image-600x000.jpg 600w" alt="" />
	 *   </picture>
	 *
	 * @param array         $options    breakpoints with images
	 * @param bool          $echo       defaults to true - echo the tag directly
	 * @return string
	 */
	public static function renderPicture($options = array(), $echo = true) {
		if (!array_key_exists('', $options)) {
			return 'You have to provide a default image';
		}

		$output = PHP_EOL . '<picture>' . PHP_EOL .  "\t" . '<!--[if IE 9]><video style="display: none;"><![endif]-->' . PHP_EOL;
		foreach($options as $media => $imageSet) {
			if ($media !== '') {
				$output .= "\t" . '<source srcset="' . static::renderSrcSet($imageSet) . '" media="' . $media . '" />' . PHP_EOL;
			}
		}
		$output .= "\t" . '<!--[if IE 9]></video><![endif]-->' . PHP_EOL;

		$output .= "\t" . '<img srcset="' . static::renderSrcSet($options['']) . '" alt="" />' . PHP_EOL;

		$output .= '</picture>';

		if ($echo === true) {
			echo $output;
		}
		return $output;
	}

	/**
	 * Renders an actual image tag and makes sure that the image is available in the defined size.
	 *
	 * Examples:
	 *   Image::render(get_field('image'), ['width' => 200, 'height' => 100, 'tagAttributes' => 'class="special-image"']);
	 *   Image::render('path/within/content/file.jpg', ['width' => 200]);
	 *
	 * @param string|object $imageParam path to File or WordPress Image Object
	 * @param array         $options    width|height|tagAttributes
	 * @param bool          $echo       defaults to true - echo the tag directly
	 * @return string
	 */
	public static function render($imageParam, $options = array(), $echo = true) {
		if (is_string($imageParam)) {
			$image = [
				'path' => $imageParam,
				'url' => static::contentPathToUrl($imageParam)
			];
		} else {
			$image = $imageParam;
			$image['path'] = get_attached_file($image['id']);
		}
		if (!file_exists($image['path'])) {
			return 'Image at "' . $image['path'] . '" does not exists.';
		}
		$size = getimagesize($image['path']);

		if (array_key_exists('width', $options) && $options['width'] != $size[1] || array_key_exists('height', $options) && $options['height'] != $size[0]) {
			$image = static::resize($image['path'], $options);
		}

		$options['tagAttributes'] = array_key_exists('tagAttributes', $options) ? $options['tagAttributes'] : '';
		$image['title'] = array_key_exists('title', $image) ? $image['title'] : '';

		$output = '<img src="' . $image['url'] . '" alt="' . $image['title'] . '" ' . $options['tagAttributes'] . ' />';
		if ($echo === true) {
			echo $output;
		}
		return $output;
	}

	/**
	 * Takes the Path to an Image and generates the Url for the Frontend.
	 *
	 * @param $path
	 * @return mixed
	 */
	public static function contentPathToUrl($path) {
		return str_replace(WP_CONTENT_DIR, WP_CONTENT_URL, $path);
	}


	/**
	 * Make sure all given Images are available in the needed sizes and returns a string that can be used
	 * in a srcset. Each Image will have its path and width returned.
	 *
	 * Currently a defined width is required for each image.
	 *
	 * Example:
	 *   static::renderSrcSet(array(
	 *     array('image' => get_field('image'), 'width' => 900)
	 *   ));
	 *   => http://[...]image-900x600.jpg 900w
	 *
	 *   static::renderSrcSet(array(
	 *     array('image' => get_field('image'), 'width' => 900)
	 *     array('image' => get_field('image'), 'width' => 450)
	 *   ));
	 *   => http://[...]image-900x600.jpg 900w http://[...]image-450x300.jpg 450w
	 *
	 * @param array $images
	 * @return string
	 */
	public static function renderSrcSet($images = array()) {
		$srcSet = '';

		foreach($images as $imageArray) {
			if (!array_key_exists('width', $imageArray)) {
				return 'Image has to have a defined width';
			}
			if (is_string($imageArray['image'])) {
				$image = [
					'path' => $imageArray['image'],
					'url' => static::contentPathToUrl($imageArray['image'])
				];
			} else {
				$image = $imageArray['image'];
				$image['path'] = get_attached_file($image['id']);
			}
			if (!file_exists($image['path'])) {
				return 'Image at "' . $image['path'] . '" does not exists.';
			}
			$size = getimagesize($image['path']);

			if (array_key_exists('width', $imageArray) && $imageArray['width'] != $size[1] || array_key_exists('height', $imageArray) && $imageArray['height'] != $size[0]) {
				$image = static::resize($image['path'], $imageArray);
			}

			$srcSet .= $image['url'] . ' ' . $imageArray['width'] . 'w ';
		}

		return $srcSet;
	}

	/**
	 * Uses the WordPress Image Editor to actually resize an Image and return it.
	 *
	 * If width AND height are provided the image will be exactly cropped to this size.
	 * If width OR height are provided it will be relatively downscaled (no upscale)
	 *
	 * @param string $path
	 * @param array $options
	 * @return array|bool|WP_Error
	 */
	public static function resize($path, $options = []) {
		$crop = array_key_exists('width', $options) && array_key_exists('height', $options);
		$options['width'] = array_key_exists('width', $options) ? $options['width'] : 6000;
		$options['height'] = array_key_exists('height', $options) ? $options['height'] : 6000;
		$imageEditor = wp_get_image_editor($path);
		if (!is_wp_error($imageEditor)) {
			$imageEditor->resize($options['width'], $options['height'], $crop);
			$image = $imageEditor->save();
			$image['url'] = static::contentPathToUrl($image['path']);
			return $image;
		}
		return false;
	}

}