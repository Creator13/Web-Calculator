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
				<div class="lastEquitation" unselectable="on"></div>
				<input class="numberField" type="text" readonly />
				<?php
  					$buttonChars = array(
						array('&larr;', 'C', 'AC'), 
						array('7', '8', '9', '&divide;'), 
						array('4', '5', '6', '&times;'), 
						array('3', '2', '1', '-'), 
						array('.', '0', '=', '+')
					);
					
					echo '<table class="buttonTable">';
					
					for ($row = 0; $row < count($buttonChars); $row++) {
						echo '<tr>';
						for ($col = 0; $col < count($buttonChars[$row]); $col++) {
							$class = 'button_standard';
							$id = null;
							if ($buttonChars[$row][$col] == '=') {
								$class = 'button_equals';
							}
							elseif ($buttonChars[$row][$col] == '&divide;' || $buttonChars[$row][$col] == '&times;' || $buttonChars[$row][$col] == '-' || $buttonChars[$row][$col] == '+') {
								$class = 'button_operator';
							}
							elseif ($buttonChars[$row][$col] == '&larr;') {
								$id = 'button_backspace';
								$class = 'button_remove';
							}
							elseif ($buttonChars[$row][$col] == 'C') {
								$id = 'button_clear';
								$class = 'button_remove';
							}
							elseif ($buttonChars[$row][$col] == 'AC') {
								$id = 'button_clearAll';
								$class = 'button_remove';
							}
							elseif ($buttonChars[$row][$col] == '.' || $buttonChars[$row][$col] == ',') {
								$id = 'button_dot';
							}
							
							if ($id != null) {
								echo '<td><input class="' . $class . '" id="' . $id . '" type="button" value="' . $buttonChars[$row][$col] . '"></td>';
							}
							else {
								echo '<td><input class="' . $class . '" type="button" value="' . $buttonChars[$row][$col] . '"></td>';
							}
						}
						echo '</tr>';
					}
					echo '</table>'
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