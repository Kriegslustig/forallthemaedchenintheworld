<?php

function js_set_event_source () {
  $url = get_bloginfo('template_url').'/php/reloadr_source.php';
  echo "<script>var reloadr = {}; reloadr.reloadSource = '$url'; </script>";
}
add_action('wp_head', 'js_set_event_source');