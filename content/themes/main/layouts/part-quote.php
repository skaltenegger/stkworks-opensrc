<?php
/**
 *  Quote
 */

	$isAlternative = is_option('is-quote-alternative', get_sub_field('l_options'));


if($isAlternative){ ?>

	<section class="js-section module <?php echo get_option_classes(get_sub_field('l_options')); ?>">
		<div class="ph content-wrapper has-max-width">
			<blockquote class="quote quote--alt mb0">
				<?php  echo do_shortcode(wpautop(get_sub_field(ACF_LAYOUT_TEXT))); ?>
			</blockquote>
		</div>
	</section>

<?php } else { ?>

	<section class="module text--center content-wrapper <?php echo get_option_classes(get_sub_field('l_options')); ?>">
		<svg class="quotes" width="66" height="54" viewBox="0 0 66 54" xmlns="http://www.w3.org/2000/svg"><path d="M35.4 53c4 0 30-7.7 30-32.4C65.4 13.1 60 .1 50.3.1 44.5.1 41 4.8 41 9.9c0 4.9 4.9 8.4 6.1 9.3C50.4 22.9 52 25 52 29.9c0 9.8-11.6 16.8-16.8 18.2-1.6.5-2.6.9-2.3 3 .4 2.3 1.3 1.9 2.5 1.9M2.8 53c4 0 30-7.7 30-32.4C32.8 13.1 27.4.1 17.7.1c-5.8 0-9.3 4.7-9.3 9.8 0 4.9 4.9 8.4 6.1 9.3 3.3 3.7 4.9 5.8 4.9 10.7 0 9.8-11.6 16.8-16.8 18.2-1.6.5-2.6.9-2.3 3C.7 53.4 1.7 53 2.8 53" fill="#E8E8E8" fill-rule="evenodd"/></svg>
		<blockquote class="quote quote--std mb0">
			<?php  echo do_shortcode(wpautop(get_sub_field(ACF_LAYOUT_TEXT)));
			$author = get_sub_field(ACF_LAYOUT_TEXT_LINE);
			if($author != ""){ ?>
				<cite>
					<?php  echo $author; ?>
				</cite>
			<?php } ?>
		</blockquote>
		<svg class="quotes" width="66" height="54" viewBox="0 0 66 54" xmlns="http://www.w3.org/2000/svg"><path d="M62.8.8c-4 0-30 7.7-30 32.4 0 7.4 5.4 20.5 15.1 20.5 5.8 0 9.3-4.7 9.3-9.8 0-4.9-4.9-8.4-6.1-9.3-3.3-3.7-4.9-5.8-4.9-10.7 0-9.8 11.6-16.8 16.8-18.2 1.6-.5 2.6-.9 2.3-3C64.9.4 64 .8 62.8.8M30.3.8c-4 0-30 7.7-30 32.4 0 7.4 5.4 20.5 15.1 20.5 5.8 0 9.3-4.7 9.3-9.8 0-4.9-4.9-8.4-6.1-9.3-3.3-3.7-4.9-5.8-4.9-10.7 0-9.8 11.6-16.8 16.8-18.2 1.6-.5 2.6-.9 2.3-3C32.3.4 31.4.8 30.3.8" fill="#E8E8E8" fill-rule="evenodd"/></svg>
	</section>

<?php } ?>





