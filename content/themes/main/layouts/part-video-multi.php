<?php 
$videos = get_sub_field('video_sources');
$count = count($videos); 
$class = '';

if($count == 1) {
	$class = "solo";
}
else if($count == 2) {
	$class = "double";
}
else if($count == 3) {
	$class = "triple"; 
}

?>

<div class="centered-module video video--multi video--<?php echo $class; ?> mb+">
	<!--
	<?php foreach ($videos as $video) : $video = $video['source']; ?>
	--><div class="layout u-<?php echo 12/$count; ?>/12@gmobilep">
		<div class="wrapper relative">
			<svg viewBox="0 0 76.27 158.18"><defs><style>.a{fill:#fff;stroke-width:0.29px;}.a,.c{stroke:#e1e1e1;}.a,.b,.c{stroke-miterlimit:10;}.b,.c{fill:none;}.b{stroke:#0018ff;stroke-width:0.29px;}.c{stroke-width:0.58px;}</style></defs><title>Artboard 4</title><path class="a" d="M64.79.92H11.48A10.46,10.46,0,0,0,1,11.38V146.8a10.46,10.46,0,0,0,10.46,10.46H64.79A10.46,10.46,0,0,0,75.26,146.8V11.38A10.46,10.46,0,0,0,64.79.92Zm8,137.78a.61.61,0,0,1-.61.61H4a.61.61,0,0,1-.61-.61V17.64A.61.61,0,0,1,4,17H72.18a.61.61,0,0,1,.61.61Z"/><circle class="home-button" cx="37.95" cy="148.4" r="5.46"/><rect class="c" x="1.01" y="0.92" width="74.25" height="156.34" rx="10.46" ry="10.46"/></svg>

			<video loop preload muted="true" playsinline>
		  		<source src="<?php echo $video['url']; ?>" type="<?php echo $video['mime_type']; ?>">
			</video>
		</div>
	</div><!--
	<?php endforeach; ?>-->

</div>