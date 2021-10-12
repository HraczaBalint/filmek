function lekerdezes(adat){
    adat.sort((a, b) => {
        return b.year-a.year;
    }).forEach(elem => {
        let li = document.createElement('li');
        li.innerHTML = elem.title + " (" + elem.year + ")";
        document.querySelector('#lista').appendChild(li);

        let infobox = document.querySelector('#info');

        let torles = document.createElement('button');
        torles.innerHTML = "Törlés";

        li.addEventListener('click', () => {

            for (let elemek of document.querySelectorAll("#info > p, #info > a")) {
                elemek.remove();
            };

            if (!infobox.hasChildNodes()) {
                infobox.appendChild(torles);
            };

            let p1 = document.createElement('p');
            let p2 = document.createElement('p');
            let p3 = document.createElement('p');
            let p4 = document.createElement('p');
            
            p1.innerHTML = elem.title;
            p2.innerHTML = elem.year;

            infobox.appendChild(p1);
            infobox.appendChild(p2);
            infobox.appendChild(p3);
            infobox.appendChild(p4);

            for (i = 0; i < elem.cast.length; i++) {
                let cast = document.createElement('a');
                cast.href = elem.cast[i];
                cast.innerHTML = elem.cast[i] + " ";
                p3.appendChild(cast);
                
            };

            for (i = 0; i < elem.genres.length; i++) {
                let genres = document.createElement('a');
                genres.href = elem.genres[i];
                genres.innerHTML = elem.genres[i] + " ";
                p4.appendChild(genres);
            };

            let a = document.querySelectorAll('a');
            for (var i = 0; i < a.length; i++) {
                a[i].addEventListener('click', (e) => {
                    e.preventDefault();
                    let link = e.target.innerHTML.trim();
                    console.log(link);
                });
            };

            infobox.style.display = "block";
        });

        torles.addEventListener('click', () => {
            for (let elemek of document.querySelectorAll("#info > p, #info > a, #info > button")) {
                elemek.remove();
            };

            infobox.style.display = "none";
        });
    });
};

document.addEventListener("DOMContentLoaded", () =>{

    document.getElementById('betoltes').addEventListener('click', () => {
        fetch('movies.json').then((eredmeny) => {
            if (eredmeny.ok) {
                return eredmeny.json();
            }
            else {
                return Promise.reject(
                    new Error("A szerver " + eredmeny.status + " hibával tért vissza.")
                );
            }
        }).then(adat => {
            lekerdezes(adat);
        }).catch(error => {
            document.getElementById('hiba').innerHTML = error.message;
        });
    });


});