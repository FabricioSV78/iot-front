$(document).ready(function() {
    // Reemplaza con la IP de tu ESP32
    //var esp32Ip = 'http://192.168.33.251:81';  // wifi jhordi
    var esp32Ip = 'https://unified-panther-vocal.ngrok-free.app';  //ngrock
    //var esp32Ip = 'http://192.169.100.89:81'; //wifi estudiantes
    //var esp32Ip = 'http://192.168.119.251:81'; //luisillo
    
    var videoUrl = esp32Ip + "/stream"; // URL del flujo de video

    // Establecer la URL del iframe para mostrar el video en vivo
    $('#live-video').attr('src', videoUrl);
});

