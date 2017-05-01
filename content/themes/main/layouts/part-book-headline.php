<?php
/**
 * TODO: h1 if its the first item on the plate
 */

$heading = $part['l_text-line'];
$subHeading = $part['l_text-line2'];
$isH2 = is_option('is-h2', $part['l_options']);

?>


<section class="js-section module module--headline <?php echo get_option_classes($part['l_options']); ?>" id="<?php echo clean($heading); ?>">
	<div class="content-wrapper has-max-width">
		<?php if(!$isH2) { ?>
			<h1 class="alpha c-brand mb0"><?php echo $heading; ?></h1>
		<?php } else { ?>
			<h2 class="c-brand mb0"><?php echo $heading; ?></h2>
			<?php if($subHeading != ''){ ?>
				<span class="sub-heading small mb0"><?php echo $subHeading; ?></span>
			<?php }
		} ?>
	</div>
</section>