<?php
header('Content-Type: text/html; charset=utf-8');

$url = file_get_contents('https://api.tumblr.com/v2/blog/gaixinhchonloc.com/posts/photo?api_key=yGeAXmz3mjqFrHNx1pUb7s0j8FUjUuVZhQ6vWQY9FFGvzZAmyL');
$json = json_decode($url, true);
$json_posts = $json['response']['posts'];
$data = array();

foreach ($json_posts as $key => $value) {
  $data[] = $value['photos'][0]['original_size']['url'];
}

function array_random($array, $amount = 1){
   $keys = array_rand($array, $amount);

   if ($amount == 1) {
       return $array[$keys];
   }

   $results = [];
   foreach ($keys as $key) {
       $results[] = $array[$key];
   }

   return $results;
}

$link_img = array_random($data);
$result = array(
	'messages' => array(
		'0' => array(
			'attachment' => array(
				'type' => 'image',
				'payload' => array(
					'url' => $link_img
				)
			)
		),
	)
);

echo json_encode($result, JSON_UNESCAPED_UNICODE);
?>