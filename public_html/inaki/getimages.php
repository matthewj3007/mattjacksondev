<?php
    $jpgs = array();
    $filepath = getcwd().'/res/';

    foreach(scandir($filepath) as $file) {
        if(preg_match('/jpg$/', $file)) {
            array_push($jpgs, $file);
        }
    }
    return $jpgs;
?>