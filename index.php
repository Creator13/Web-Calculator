<?php 
	$incl_script = 'includes/head_includes.php';
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<?php 
			if (file_exists($incl_script)) {
				include $incl_script;
			}
			else {
				die("FATAL ERROR: Could not find default CSS and JavaScript files.");
			}
		?>
		<meta charset="UTF-8">
		<title>Calculator</title>
	</head>
	<body>
		<div id="useless_header"><h1>Calculator</h1></div>
		<div id="wrapper">
			<main id="calculator">
				<div class="lastEquitation">Hello test test</div>
				<input class="numberField" type="text" readonly />
				<?php
					$width = 4;
					$height = 4;
					$buttonChars = array('7', '8', '9', '&divide;', '4', '5', '6', '&times;', '3', '2', '1', '-', '.', '0', '=', '+');
					
					if (count($buttonChars) != ($width * $height)) {
						die("FATAL ERROR: array size doesn't match table size");
					} 
					
					echo '<table class="buttonTable">';
					$i = 0;
					for ($row = 0; $row < $height; $row++) {
						echo '<tr>';
						for ($col = 0; $col < $width; $col++) {
							$class = 'button_standard';
							if ($buttonChars[$i] == '=') {
								$class = 'button_equals';
							}
							elseif ($buttonChars[$i] == '&divide;' || $buttonChars[$i] == '&times;' || $buttonChars[$i] == '-' || $buttonChars[$i] == '+') {
								$class = 'button_operator';
							}
							
							if ($buttonChars[$i] == '.' || $buttonChars[$i] == ',') {
								echo "<td><input class=\"$class\" id=\"button_dot\" type=\"button\" value=\"$buttonChars[$i]\"></td>";
							}
							else {
								echo "<td><input class=\"$class\" type=\"button\" value=\"$buttonChars[$i]\"></td>";
							}
							$i++;
						}
						echo '</tr>';
					}
					echo '</table>';
				?>
				
			</main>
			<footer>
				&copy; Casper van Battum 2014
			</footer>
		</div>
		<script>
			$(document).ready(function() {
				//Reset the field
				//!--TODO: Create a cookie that will remember the last equitation
				$('.numberField').val('');
			});
		</script>
		<script src="js/calculator.js"></script>
	</body>
</html>