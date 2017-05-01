<?php 
$browser_frame = get_sub_field('browser_frame');
$videos = get_sub_field('video_sources');

?>

<div class="centered-module video video--single mb+">

	<?php if($browser_frame) : ?>
	<div class="layout browser-window browser-window--full">
		<div class="browser-bar">
			<div class="dot"></div>
			<div class="dot"></div>
			<div class="dot"></div>
		</div>
		<div class="browser-content">
	<?php endif; ?>

			<video loop preload muted="true" playsinline>
			  <?php foreach ($videos as $video) : $video = $video['source']; ?>
			  		<source src="<?php echo $video['url']; ?>" type="<?php echo $video['mime_type']; ?>">
			  <?php endforeach; ?>
			</video>

	<?php if($browser_frame) : ?>
		</div>
	</div>	
	<?php endif; ?>

</div>