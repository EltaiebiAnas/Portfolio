$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Gérer les erreurs du formulaire
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Empêche la soumission par défaut du formulaire
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Désactiver le bouton pour éviter les soumissions multiples

            // Envoyer l'email en utilisant EmailJS
            emailjs.send("service_pyods59", "template_v2p9au5", {
                to_name: "Anass",
                from_name: name,
                message: `
                    ${email}
                    ${subject}
                    ${message}
                `,
            }).then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                $("#alertSuccess").removeClass("d-none").addClass("d-block"); // Afficher l'alerte de succès
                $this.prop("disabled", false); // Réactiver le bouton

                // Réinitialiser les champs du formulaire
                $('#contactForm')[0].reset();

                // Cacher l'alerte après 5 secondes
                setTimeout(function() {
                    $("#alertSuccess").removeClass("d-block").addClass("d-none");
                }, 5000);

            }, function(error) {
                console.log('FAILED...', error);
                $("#alertError").removeClass("d-none").addClass("d-block"); // Afficher l'alerte d'erreur
                $this.prop("disabled", false); // Réactiver le bouton

                // Cacher l'alerte après 5 secondes
                setTimeout(function() {
                    $("#alertError").removeClass("d-block").addClass("d-none");
                }, 5000);
            });
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});
