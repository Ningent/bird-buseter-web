window.onload = function () {
    function dina (num,axe){
        var Xscreen = window.innerWidth;
        var Yscreen = window.innerHeight;
        var newNum = 0;

        if (axe == "x" || axe == "X"){
            newNum = (num / Xscreen) * 100;
        }else if (axe == "y" || axe == "Y"){
            newNum = (num / Yscreen) * 100;
        }else{
            console.log ("Dina error");
        }

        return newNum + "%";
    }
    
    const screenX = window.innerWidth;
    const screenY = window.innerHeight;
    const FPS = 16;

    let munition = 5;
    let muni_distance = 35;
    let muni_arr = [];

    let kill = 0;

    const pigon_velo = 3.5;
    let pigon_0_bool = true;

    let pig_switch0 = true;
    let pig_switch1 = true;
    let pig_switch2 = true;
    let pig_switch3 = true;

    //random
    let random_position_pigon1 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    let random_position_pigon2 = Math.floor(Math.random() * (3 - 1 + 1)) + 1;

    bool_pigon_vole2 = true;
    bool_pigon_vole3 = true;

    //dictioner
    var dic_pigon = {};
    var dic_pigonRect = {};
    let arr_aigle = {};
    let arr_aigle_hit = {};

    var isDay = true;

    for (let i = 0; i < munition; i++) {
        let muni = document.createElement("img");
        muni.className = "muni";
        muni.src = "drawable/ball.png";
        muni.style.position = "absolute";
        muni.style.left = (muni_distance * i) + "px";  
        muni_arr.push(muni);
        document.body.appendChild(muni);
    }

    const fusil = document.createElement('img');
    fusil.className = "fusil";
    fusil.style.position = "absolute";
    fusil.style.left = "50%";
    fusil.style.bottom = "10px";
    fusil.style.transform = "translateX(-50%)";
    document.body.appendChild(fusil);

    if (kill < 34) {
        fusil.src = "drawable/fusil1.png";
    } else if (kill >= 35 && kill <= 64) {
        fusil.src = "drawable/fusil2.png";
    } else if (kill >= 65 && kill <= 99) {
        fusil.src = "drawable/fusil3.png";
    } else {
        fusil.src = "drawable/fusil4.png";
    }

    let fusil_rot = 360;

    setInterval(() => {
        fusil_rot -= 2;
        if (fusil_rot <= 0) {
            fusil_rot = 360;
        }
        fusil.style.transform = `translateX(-50%) rotate(${fusil_rot}deg)`;
    }, FPS);

    function spawnPigon(index) {
        const pigon = document.createElement("img");
        pigon.style.position = "absolute";
        pigon.style.width = "50px";  
        pigon.style.height = "50px"; 
        pigon.style.top = (screenY * 0.05) + "px";  
    
        let screenX = window.innerWidth;
    
        switch (index) {
            case 0:
                pigon.style.left = "-10%";
                break;
            case 1:
                pigon.style.left = (screenX * 1.1) + "px"; 
                break;
            case 2:
                pigon.style.left = "-5%";
                break;
            case 3:
                pigon.style.left = (screenX * 1.05) + "px"; // 100% + 5%
                break;
        }
    
        document.body.appendChild(pigon);
    
        let pigonX = parseFloat(pigon.style.left);
        let pigonY = parseFloat(pigon.style.top);
    
        setInterval(() => {
            if (index === 2 && bool_pigon_vole2) {
                if (pig_switch2) {
                    pigon.src = "drawable/pigon_vole1.png";
                    pig_switch2 = false;
                } else {
                    pigon.src = "drawable/pigon_vole2.png";
                    pig_switch2 = true;
                }
            }
            if (index === 3 && bool_pigon_vole3) {
                if (pig_switch3) {
                    pigon.src = "drawable/pigon_vole1.png";
                    pig_switch3 = false;
                } else {
                    pigon.src = "drawable/pigon_vole2.png";
                    pig_switch3 = true;
                }
            }
            if (index === 0) {
                if (pig_switch0) {
                    pigon.src = "drawable/pigon_vole1.png";
                    pig_switch0 = false;
                } else {
                    pigon.src = "drawable/pigon_vole2.png";
                    pig_switch0 = true;
                }
            }
    
            if (index === 1) {
                if (pig_switch1) {
                    pigon.src = "drawable/pigon_vole1.png";
                    pig_switch1 = false;
                } else {
                    pigon.src = "drawable/pigon_vole2.png";
                    pig_switch1 = true;
                }
            }
        }, 150);
    
        setInterval(() => {
            //mobile
            if (screenX < 480) {
                if (index === 0) {
                    if (pigonY <= screenY * 0.185) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX * 1.1) && pigon_0_bool) { 
                        pigonX += pigon_velo;
                        pigon.style.transform = "scaleX(-1)";
                    } else if (pigonX >= (screenX * 1.1)) { 
                        pigon_0_bool = false;
                        console.log(`pigon_0_bool -> ${pigon_0_bool}`);
                    }
                    if (pigonX < -100 || !pigon_0_bool) {
                        pigonX -= pigon_velo;
                        pigon.style.transform = "scaleX(1)";
                        if (pigonX <= -100) {
                            pigon_0_bool = true;
                        }
                    }
                }
        
                if (index === 1) {
                    if (pigonY <= screenY * 0.265) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.6)) { 
                        pigonX -= pigon_velo;
                    }
                }
        
                if (index === 2) {
                    if (pigonY <= screenY* 0.40) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX* 0.5)) { 
                        pigonX += pigon_velo;
                    } else if (pigonX >= (screenX * 0.1)) { 
                        bool_pigon_vole2 = false;
        
                        if (random_position_pigon1 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon1 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon1 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
        
                    }
                }
        
                if (index === 3) {
                    if (pigonY <= screenY * 0.40) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.25)) { 
                        pigonX -= pigon_velo;
                    } else if (pigonX <= (screenX* 0.25)) { 
                        bool_pigon_vole3 = false;
        
                        if (random_position_pigon2 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon2 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon2 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
                    }
                }
            
            }
            //tablete
            else if (screenX > 481 && screenX <= 768){
                if (index === 0) {
                    if (pigonY <= screenY * 0.185) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX * 1.1) && pigon_0_bool) { 
                        pigonX += pigon_velo;
                        pigon.style.transform = "scaleX(-1)";
                    } else if (pigonX >= (screenX * 1.1)) { 
                        pigon_0_bool = false;
                        console.log(`pigon_0_bool -> ${pigon_0_bool}`);
                    }
                    if (pigonX < -100 || !pigon_0_bool) {
                        pigonX -= pigon_velo;
                        pigon.style.transform = "scaleX(1)";
                        if (pigonX <= -100) {
                            pigon_0_bool = true;
                        }
                    }
                }
        
                if (index === 1) {
                    if (pigonY <= screenY * 0.265) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.6)) { 
                        pigonX -= pigon_velo;
                    }
                }
        
                if (index === 2) {
                    if (pigonY <= screenY* 0.38) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX* 0.6)) { 
                        pigonX += pigon_velo;
                    } else if (pigonX >= (screenX * 0.1)) { 
                        bool_pigon_vole2 = false;
        
                        if (random_position_pigon1 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon1 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon1 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
        
                    }
                }
        
                if (index === 3) {
                    if (pigonY <= screenY * 0.38) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.4)) { 
                        pigonX -= pigon_velo;
                    } else if (pigonX <= (screenX* 0.4)) { 
                        bool_pigon_vole3 = false;
        
                        if (random_position_pigon2 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon2 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon2 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
                    }
                }
        
            }

            //pc 
            else {
                if (index === 0) {
                    if (pigonY <= screenY * 0.185) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX * 1.1) && pigon_0_bool) { 
                        pigonX += pigon_velo;
                        pigon.style.transform = "scaleX(-1)";
                    } else if (pigonX >= (screenX * 1.1)) { 
                        pigon_0_bool = false;
                        console.log(`pigon_0_bool -> ${pigon_0_bool}`);
                    }
                    if (pigonX < -100 || !pigon_0_bool) {
                        pigonX -= pigon_velo;
                        pigon.style.transform = "scaleX(1)";
                        if (pigonX <= -100) {
                            pigon_0_bool = true;
                        }
                    }
                }
        
                if (index === 1) {
                    if (pigonY <= screenY * 0.185) { 
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.6)) { 
                        pigonX -= pigon_velo;
                    }
                }
        
                if (index === 2) {
                    if (pigonY <= screenY* 0.27) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX < (screenX* 0.5)) { 
                        pigonX += pigon_velo;
                        pigon.style.transform = "scaleX(-1)";
                    } else if (pigonX >= (screenX * 0.5)) { 
                        bool_pigon_vole2 = false;
        
                        if (random_position_pigon1 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon1 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon1 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
        
                    }
                }
        
                if (index === 3) {
                    if (pigonY <= screenY * 0.27) {
                        pigonY += pigon_velo;
                    }
        
                    if (pigonX > (screenX * 0.4)) { 
                        pigonX -= pigon_velo;
                    } else if (pigonX <= (screenX* 0.4)) { 
                        bool_pigon_vole3 = false;
        
                        if (random_position_pigon2 === 1) {
                            pigon.src = "drawable/pigon1.png";
                        } else if (random_position_pigon2 === 2) {
                            pigon.src = "drawable/pigon2.png";
                        } else if (random_position_pigon2 === 3) {
                            pigon.src = "drawable/pigon3.png";
                        }
                    }
                }
            }

            pigon.style.left = pigonX + "px";
            pigon.style.top = pigonY + "px";
    
            var pigonRect = pigon.getBoundingClientRect("img");

    
            dic_pigon[index] = pigon;
            dic_pigonRect[index] = pigonRect;
    
        }, FPS);
    }
    
    for (var i = 0; i < 4; i++) {
        spawnPigon(i);
    }
    


    //arbre
    var arbre = document.getElementById("arbre");

    if (isDay){
        arbre.src = "drawable/arbre.png";
    }else {
        arbre.src = "drawable/arbre_nuit.png";
    }


    function spawnAigle() {
        var aigle = document.createElement("img");
        aigle.className = "aigle";
        aigle.style.position = "absolute";
        aigle.style.opacity = "0";
        aigle.style.transform = "scaleX(-1)";
        aigle.src = "drawable/aigle_vole1.png";
        aigle.style.zIndex = 5;
        document.body.appendChild(aigle);
    
        let computedStyle = getComputedStyle(aigle);
        let aigleX = parseFloat(computedStyle.left);
        let aigleY = parseFloat(computedStyle.top);
        let aigle_velo = 2;
        let aigle_vole = true;
    
        setInterval(() => {
            aigle.src = aigle_vole ? "drawable/aigle_vole1.png" : "drawable/aigle_vole2.png";
            aigle_vole = !aigle_vole;
        }, 300);
    
        // Logique pour les appareils mobiles
        if (screenX <= 408) {
            // Logique spécifique pour les mobiles
            configureMovement(aigle, aigleX, aigleY, aigle_velo, 0.03, 0.57);
        }
        // Logique pour les tablettes
        else if (screenX >= 481 && screenX <= 768) {
            // Logique spécifique pour les tablettes
            configureMovement(aigle, aigleX, aigleY, aigle_velo, 0.10, 0.68);
        }
        // Logique pour les PC
        else {
            // Logique spécifique pour les PC
            configureMovement(aigle, aigleX, aigleY, aigle_velo, 0.14, 0.57);
        }
    }
    
    function configureMovement(aigle, aigleX, aigleY, aigle_velo, limitXFactor, limitYFactor) {
        let nit_boom = document.createElement("img");
        let nie = document.createElement("img");
        let nid_cond = false;
    
        setInterval(() => {
            aigle.style.opacity = "1";
    
            if (aigleX > (window.innerWidth * limitXFactor)) {
                aigleX -= aigle_velo;
            }
    
            if (aigleY <= (window.innerHeight * limitYFactor)) {
                aigleY += aigle_velo + 2;
            }
    
            if (aigleX <= (screenX * limitXFactor)) {
                aigle.style.transform = "scaleX(1)";
                if (!nid_cond) {
                    nit_boom.position = "absolute";
                    nit_boom.src = "drawable/boom.png";
                    nit_boom.className = "nie_boom";
                    nit_boom.style.zIndex = 3;
                    document.body.appendChild(nit_boom);
                    setTimeout(() => nit_boom.remove(), 2000);
                    nid_cond = true;
                }
    
                nie.position = "absolute";
                nie.src = "drawable/nie_aigle.png";
                nie.className = "nie_aigle";
                nie.style.zIndex = 2;
                document.body.appendChild(nie);
            }
    
            aigle.style.left = `${aigleX}px`;
            aigle.style.top = `${aigleY}px`;
    
            arr_aigle[0] = aigle;
            arr_aigle_hit[0] = aigle.getBoundingClientRect();
        }, FPS);
    }
    
    // Appeler spawnAigle au chargement
    spawnAigle(); 


    //ball
    fusil.addEventListener('click', () => {
        if (munition === 0) {
            alert("No more bullets!");

            setTimeout(() => {
                munition = 5;4
                muni_arr.forEach((muni) => {
                    muni.style.display = "block";
                });
            }, 2500);
            return;
        }

        munition--;
        if (muni_arr[munition]) {
            muni_arr[munition].style.display = "none";
        }

        const rect = fusil.getBoundingClientRect();
        const fusilCenterX = rect.left + rect.width / 2;
        const fusilCenterY = rect.top + rect.height / 2;
        const canonLength = rect.width / 2;

        const angleRad = fusil_rot * (Math.PI / 180);
        const endX = fusilCenterX + Math.cos(angleRad) * canonLength;
        const endY = fusilCenterY + Math.sin(angleRad) * canonLength;

        const ball = document.createElement("img");
        ball.src = "drawable/ball.png";
        ball.className = "ball";
        ball.style.position = "absolute";
        ball.style.width = "20px";
        ball.style.height = "20px";
        ball.style.left = `${endX - 10}px`; 
        ball.style.top = `${endY - 10}px`;
        document.body.appendChild(ball);


        const ballInterval = setInterval(() => {
            const ballX = parseFloat(ball.style.left) + Math.cos(angleRad) * 8;
            const ballY = parseFloat(ball.style.top) + Math.sin(angleRad) * 8;

            ball.style.left = `${ballX}px`;
            ball.style.top = `${ballY}px`;

            if (ballX < 0 || ballY < 0 || ballX > screenX || ballY > screenY) {
                clearInterval(ballInterval);
                ball.remove();
            }
        }, FPS);

        const boom = document.createElement("img");
        boom.src = "drawable/canon_boom.png";
        boom.className = "boom";
        boom.style.position = "absolute";
        boom.style.width = "20px";
        boom.style.height = "20px";
        boom.style.left = ball.style.left;
        boom.style.top = ball.style.top;
        document.body.appendChild(boom);

        setTimeout(() => {
            boom.remove();
        }, 1000);

        var score = document.getElementById("score");

        //code colision ici
        let aigleColision = false;
        setInterval(() => {
            var ballRect = ball.getBoundingClientRect(); // Assurez-vous que `ball` est bien défini

            // Vérification des collisions avec les pigeons
            for (var i = 0; i < 4; i++) {
                var Newpigon = dic_pigon[i];
                var NewpigonRect = dic_pigonRect[i];

                if (
                    Newpigon && NewpigonRect &&
                    NewpigonRect.left < ballRect.right &&
                    NewpigonRect.right > ballRect.left &&
                    NewpigonRect.top < ballRect.bottom &&
                    NewpigonRect.bottom > ballRect.top
                ) {
                    kill++;
                    score.textContent = `Score:${kill}`;
                    console.log("colision");
                    Newpigon.remove();
                    ball.remove();
                    dic_pigon[i] = null;
                    dic_pigonRect[i] = null;

                    spawnPigon(i);
                }
            }

            // Vérification des collisions avec l'aigle
            let NewAigleHit = arr_aigle_hit[0];
            let NewAigle = arr_aigle[0];

            if (
                NewAigleHit &&
                NewAigleHit.left < ballRect.right &&
                NewAigleHit.right > ballRect.left &&
                NewAigleHit.top < ballRect.bottom &&
                NewAigleHit.bottom > ballRect.top &&
                !aigleColision
            ) {
                NewAigle.remove();
                aigleColision = true;
                console.log("Aigle -> colision");
                kill -= 10;

                if (kill < 0) {
                    kill = 0;
                }

                score.textContent = `Score:${kill}`;

                setTimeout(() => {
                    aigleColision = false;
                    spawnAigle();
                }, 1000);
            }
        }, FPS);

    });
};