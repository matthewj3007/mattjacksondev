<?php
    $url = $_SERVER['SERVER_NAME'] . "/inaki/res/";

    //echo json_encode($url);

    $jpgs = include('getimages.php');

    echo json_encode($jpgs);
?>