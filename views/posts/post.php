<?php
	global $wp_query;
	if($wp_query && $wp_query->have_posts()):
		while($wp_query->have_posts()):
		the_post();
?>
			<article>
				<h2><?= get_the_title() ?></h2>
				<?= get_the_content(); ?>
			</article>
<?php
		endwhile;
	endif;
?>