$(document).ready(function() {

    var source = $("#disco-template").html();
    var template = Handlebars.compile(source);

    $.ajax({
        'url': 'https://flynn.boolean.careers/exercises/api/array/music',
        'method': 'GET',
        'success': function(data) {
            // recupero i dischi restituiti dall'api
            // N.B.: questo è un array di oggetti!
            gestisci_dati(data.response);
        },
        'error': function() {
            alert('si è verificato un errore');
        }
    });

    // BONUS: filtro per genere
    // intercetto la selezione di una voce dalla tendina dei generi
    $('.filtro-genere').change(function() {
        // recupero il genere selezionato
        var genere_selezionato = $(this).val();
        // verifico se è stato applicato un filtro
        if(genere_selezionato != '') {
            // nascondo tutti i dischi
            $('.cd').hide();
            // visualizzo solo i dischi che corrispondono al genere selezionato
            $('.cd[data-genere="' + genere_selezionato + '"]').show();
        } else {
            // è stata selezionata la voce "tutti i generi" => visualizzo tutti i dischi
            $('.cd').show();
        }
    });

    // funzione per ciclare tutti i dischi
    // riceve come parametro l'array dei dischi
    function gestisci_dati(dischi) {

        // ciclo tutti gli elementi dell'array
        for (var i = 0; i < dischi.length; i++) {
            // recupero l'elemento corrente
            // N.B.: questo è un oggetto!
            var disco_corrente = dischi[i];
            disegna_card(disco_corrente);
        }
    }

    // funzione per aggiungere una card in pagina
    // riceve come parametro un oggetto disco
    function disegna_card(disco) {
        // recupero le informazioni del disco, leggendo le proprietà dell'oggetto
        var titolo = disco.title;
        var autore = disco.author;
        var anno = disco.year;
        var immagine = disco.poster;
        var genere = (disco.genre).toLowerCase();

        // preparo i placeholder per il template
        var context = {
            'copertina_album': immagine,
            'titolo_album': titolo,
            'autore_album': autore,
            'anno_album': anno,
            'genere_album': genere
        };
        // compilo il template con i placeholder
        var html = template(context);
        // appendo la card per questo disco
        $('.cds-container').append(html);
    }

});
