<?php

if(is_home())
{
    $GLOBALS['template_part'] = 'start';
    get_header();
    get_template_part('views/start');
    get_footer();
}

else if(get_post_type() === 'page')
{
    $GLOBALS['template_part'] = 'page';
    get_header();
    get_template_part('views/page');
    get_footer();
}

else if(is_404())
{
    $GLOBALS['template_part'] = '404';
    get_header();
    get_template_part('views/404');
    get_footer();
}