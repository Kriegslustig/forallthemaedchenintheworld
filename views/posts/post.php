<?php
  if($wp_query && $wp_query->have_posts()):
    while($wp_query->have_posts()):
      $wp_query->the_post();
?>
      <article class="article">
        <h2><?php the_title(); ?></h2>
        <main class="article__main">
          <?php the_content(); ?>
        </main>
        <div class="article__unsemantic_thing"></div>
      </article>
<?php
    endwhile;
  endif;
?>