		</main><!-- END .site-body -->
		<footer class="site-footer a-menu js-waypoint-footer" id="contact">
			<div class="footer-contact bb">
				<div class="layout u-3/12@tablet">
					<?php echo get_field('column_1', 'option'); ?>
				</div><!--
				--><div class="layout u-3/12@tablet u-6/12@mobile">
					<?php echo get_field('column_2', 'option'); ?>
				</div><!--
				--><div class="layout u-3/12@tablet u-6/12@mobile">
					<?php echo get_field('column_3', 'option'); ?>
				</div><!--
				--><div class="layout u-3/12@tablet">
					<?php echo get_field('column_4', 'option'); ?>
					<!-- &copy; <?php echo date("Y"); ?> by S.K. -->
				</div> 
			</div>

		</footer>
	</div><!-- end .site -->

	<?php wp_footer(); ?>

	<script src="<?php echo get_stylesheet_directory_uri().'/static/js/main.js?v=3';?>"></script>

	<!-- <script>
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

	  ga('create', 'UA-71666244-1', 'auto');
	  ga('send', 'pageview');

	</script> -->

</body>
</html>
