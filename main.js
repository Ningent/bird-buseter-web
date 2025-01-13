function confirm_exit() {
    if (window.confirm("Are you sure you want to exit?")) {
        // Vérifier si l'application a été installée en tant que PWA
        if (window.matchMedia('(display-mode: standalone)').matches) {
            // Si la PWA est en mode autonome, on tente de la fermer
            window.close();
        } else {
            // Sinon, c'est une web app classique, on redirige l'utilisateur pour quitter
            window.location.href = "https://www.google.com"; // Rediriger vers Google ou une autre URL de ton choix
        }
    }
}


window.onload = function(){
    //ecrant taill
    var screenX = window.innerWidth;
    var screenY = window.innerHeight;
    //FPS
    const FPS = 16;

    var avion = document.getElementById("avion");
    avion.style.position = "absolute";
    avion.style.left =  (screenX + 200) + "px";
    var avion_velocity = 3;
    var avion_chek = true;

    window.setInterval(() => {
        var avionX = parseInt(avion.style.left,10);

        if (avionX > -500 && avion_chek){
            avionX -= avion_velocity;
        }else if (avionX < screenX + 200){
            avionX += avion_velocity;
            avion.style.transform = "scaleX(-1)";
            avion_chek = false;
            if (avionX == screenX + 200){
                avion_chek = true;
                avion.style.transform = "scaleX(1)";
            }
        }

        avion.style.left = avionX + "px";
        
    },FPS)

    var exit = document.getElementById("exit");
    exit.addEventListener("click", confirm_exit);
}