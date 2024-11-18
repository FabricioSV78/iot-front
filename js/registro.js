$(document).ready(function () {
    // Obtener y mostrar el historial de actividades
    function fetchActivities() {
        $.get("http://prodent.sytes.net/api/activities", function (data) {
            const activityLog = $("#activity-log");
            activityLog.empty(); // Limpiar la tabla antes de rellenarla

            if (data.length > 0) {
                // Revertir el orden de las actividades para mostrar la más reciente arriba
                data.forEach(activity => {
                    const row = `
                        <tr>
                            <td>${activity.description}</td>
                            <td>${new Date(activity.timestamp).toLocaleString()}</td>
                        </tr>`;
                    activityLog.prepend(row); // Insertar al inicio de la tabla
                });
            } else {
                activityLog.append('<tr><td colspan="2">No hay actividades registradas.</td></tr>');
            }
        }).fail(function () {
            alert("Error al obtener el historial de actividades.");
        });
    }

    // Llamar a la función para cargar las actividades al cargar la página
    fetchActivities();
});
