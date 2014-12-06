<?php
$reloadr = new Reloadr;
function init_reloadr () {
  $reloadr->set_headers();
}
add_action('init', 'init_reloadr');

class Reloadr {


  function __construct () {

  }

  public function set_headers ($caching = false) {
    $headers = ''.
      'header(\'Content-Type: text/event-stream\');'.
      (!$caching ?
        'header(\'Cache-Control: no-cache\');' :
        ''
      );
    return $headers;
  }

  private function send_event ($data) {
    echo 'data:' . $msg . PHP_EOL;
    echo PHP_EOL;
    ob_flush();
    flush();
  }

  private function reload () {
    $msg = 'reloadr: reload';
    $this->send_event($msg);
  }

  public function set_inotifier ($where) {

    $file = $where;
    $fd = inotify_init();
    stream_set_blocking($fd, 0);
    $watch_descriptor = inotify_add_watch($fd, $file, IN_ATTRIB);
    while(true){
      $events = inotify_read($fd);
      $this->reload();
    }

    $this->send_event('yoo');
  }
}