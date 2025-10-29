<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $recaptchaResponse = $_POST['g-recaptcha-response'];
    $secretKey = '6Ld-y_orAAAAAPouhzp7bw6VcLwjcObu6pP2Ybix';

    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$recaptchaResponse");
    $responseKeys = json_decode($response, true);

    if ($responseKeys["success"]) {
        echo "Verification successful!";
        // Proceed with form submission logic
    } else {
        echo "Verification failed. Please try again.";
    }
}
?>