<?php
    $jpgs = array();
    $filepath = getcwd().'/res/'.$_POST['imgtype'];

    foreach(scandir($filepath) as $file) {
        if(preg_match('/jpg$/', $file)) {
            array_push($jpgs, $file);
        }
    }
    echo json_encode($jpgs);
?>