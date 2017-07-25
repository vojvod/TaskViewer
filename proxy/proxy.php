<?php

error_reporting(E_ALL);

if (isset($_GET['url']))
{
     $URL = $_GET['url'].'?';

     foreach($_GET as $key => $value){

         if($key!='url'){

             $URL = $URL . $key . "=" . $value . "&";

         }

     }

     $session = curl_init($URL);

     curl_setopt($session, CURLOPT_FOLLOWLOCATION, true);

     curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

     $response = curl_exec($session);

     header("Content-Type: image/png");

     echo $response;

     curl_close($session);
}

else

{

     echo 'error';

}

?>
