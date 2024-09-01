$(function () {
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // Handle the errors
        },
        submitSuccess: function ($form, event) {
            event.preventDefault(); // Prevent the default form submission
            var name = $("input#name").val();
            var email = $("input#email").val();
            var subject = $("input#subject").val();
            var message = $("textarea#message").val();

            $this = $("#sendMessageButton");
            $this.prop("disabled", true); // Disable the submit button to prevent multiple submissions

            // Send email using EmailJS
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
                alert("Votre message a été envoyé avec succès !"); // Display success alert
                $this.prop("disabled", false); // Re-enable the submit button

                // Optionally, clear the form fields
                $('#contactForm')[0].reset();
            }, function(error) {
                console.log('FAILED...', error);
                alert("Une erreur s'est produite lors de l'envoi du message. Veuillez réessayer plus tard.");
                $this.prop("disabled", false); // Re-enable the submit button
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
