$(document).ready(function () {
    const API_URL = "http://prodent.sytes.net/api";
    const ALARM_ON_TEXT = "Apagar Sensor";
    const ALARM_OFF_TEXT = "Activar Sensor";

    // Función para cargar el estado de los LEDs desde el backend
    function loadLedStatuses() {
        $.get(`${API_URL}/leds/status`, function (data) {
            Object.keys(data).forEach(function (pin) {
                const state = data[pin];
                const button = $(`#led-${pin}`);
                button.text(state ? "Apagar" : "Encender");
            });
        }).fail(function (xhr, status, error) {
            alert(`Error al obtener el estado de los LEDs: ${xhr.status} ${error}`);
        });
    }

    // Función para cargar el estado de la alarma desde el backend
    function loadAlarmStatus() {
        $.get(`${API_URL}/alarm/status`, function (response) {
            const button = $("#alarm-toggle");
            if (response === "activated") {
                button.removeClass("btn-danger").addClass("btn-secondary");
                button.text(ALARM_ON_TEXT);
            } else {
                button.removeClass("btn-secondary").addClass("btn-danger");
                button.text(ALARM_OFF_TEXT);
            }
        }).fail(function (xhr, status, error) {
            alert(`Error al obtener el estado del sensor: ${xhr.status} ${error}`);
        });
    }

    // Cargar estados iniciales al cargar la página
    loadLedStatuses();
    loadAlarmStatus();

    // Control de LEDs
    $(".toggle-btn").click(function () {
        const button = $(this);
        const ledId = button.attr("id").split("-")[1];
        const isOn = button.text() === "Encender";

        $.post(`${API_URL}/toggle`, { pin: ledId, state: isOn }, function (response) {
            button.text(isOn ? "Apagar" : "Encender");
            //alert(`Respuesta del servidor: ${response}`);
        }).fail(function (xhr, status, error) {
            alert(`Error al controlar el LED: ${xhr.status} ${error}`);
        });
    });

    // Control de la alarma
    $("#alarm-toggle").click(function () {
        const button = $(this);
        const isActivate = button.hasClass("btn-danger");

        const endpoint = isActivate ? "/alarm/activate" : "/alarm/deactivate";

        $.post(`${API_URL}${endpoint}`, function (response) {
            button.toggleClass("btn-danger btn-secondary");
            button.text(isActivate ? ALARM_ON_TEXT : ALARM_OFF_TEXT);
            //alert(`${isActivate ? "Alarma activada" : "Alarma desactivada"}: ${response}`);
        }).fail(function (xhr, status, error) {
            alert(`Error al cambiar el estado del sensor: ${xhr.status} ${error}`);
        });
    });
});
