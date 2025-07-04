let settings = {
    roundMinutes: 10
};

function actualizarPRoundMinutes(){
    let pRoundMinutes = document.getElementById("pRoundMinutes");
    pRoundMinutes.textContent = parseInt(settings.roundMinutes);
    }
function changeOfRoundMinutes(){
    actualizarPRoundMinutes();
    let minusButton = document.getElementById("minusButton");
    let addButton = document.getElementById("addButton");
    function restar(){
        if(settings.roundMinutes === 1){
            alert("Minimo de tiempor por Ronda Alcanzado")
        } else{
            settings.roundMinutes--;
            actualizarPRoundMinutes();
        }
    }
    function sumar(){
        settings.roundMinutes++;
        actualizarPRoundMinutes();
    }
    //Restar
    minusButton.addEventListener("click", restar);
    //Añadiendo
    addButton.addEventListener("click", sumar);
}
changeOfRoundMinutes()

class addRounds{
    constructor(round, minBlind, maxBlind){
        this.round = round,
        this.minBlind = minBlind,
        this.maxBlind = maxBlind
    };
}
let arrayRounds = [];
let rounds = 0;

function reloadPrevSettings(round){
    rounds = round.round;
    //Generacion Principal DOM de Settings
        //Contenedores Principales y Textos
            let sectionAddSetting = document.getElementById("addSettings");
            let divRounds = document.createElement("div");
            sectionAddSetting.appendChild(divRounds);

            let pRounds = document.createElement("p");
            pRounds.className = "texto";
            pRounds.innerText = `Round ${rounds}`;
            divRounds.appendChild(pRounds);

            let blinds = document.createElement("p");
            blinds.innerText = "Blinds";
            divRounds.appendChild(blinds);

        //Boton Eliminar Rounds
            let minusButton = document.createElement("button");
            minusButton.type = "button";
            minusButton.textContent = "-";
            minusButton.addEventListener("click", ()=>{
                sectionAddSetting.removeChild(divRounds);
                rounds--;
                arrayRounds.pop();
                //roundBlindsValues.
            })
            divRounds.appendChild(minusButton);

        //Contenedor de Blinds
            let divBlinds = document.createElement("div");
            divBlinds.className = "blinds";
            divRounds.appendChild(divBlinds);

            //Lower Bet
            let inputLowBet = document.createElement("input");
            inputLowBet.type = "number";
            inputLowBet.value = round.minBlind;
            divBlinds.appendChild(inputLowBet);

            //High Blind
            let pHigherBet = document.createElement("p");
            pHigherBet.textContent = round.maxBlind
            divBlinds.appendChild(pHigherBet);

            //Escuchar Cambios Usuario
            inputLowBet.addEventListener("change", ()=>{
                let min = parseInt(inputLowBet.value);
                let max = min * 2;
                pHigherBet.textContent = max;
                //Crear Clase con Valores Asignados
                arrayRounds = arrayRounds.filter(r => r.round !== rounds);
                arrayRounds.push(new addRounds(rounds, min, max));
                console.log("Array completo:", arrayRounds);
                
            });

        //Boton Agregar Rounds
            let addButton = document.createElement("button");
            addButton.type = "button";
            addButton.textContent = "+";
            addButton.addEventListener("click", createNumberOfRounds);
            divRounds.appendChild(addButton);
}

function createNumberOfRounds(){
    rounds++;
    //Generacion Principal DOM de Settings
        //Contenedores Principales y Textos
            let sectionAddSetting = document.getElementById("addSettings");
            let divRounds = document.createElement("div");
            sectionAddSetting.appendChild(divRounds);

            let pRounds = document.createElement("p");
            pRounds.className = "texto";
            pRounds.innerText = `Round ${rounds}`;
            divRounds.appendChild(pRounds);

            let blinds = document.createElement("p");
            blinds.innerText = "Blinds";
            divRounds.appendChild(blinds);

        //Boton Eliminar Rounds
            let minusButton = document.createElement("button");
            minusButton.type = "button";
            minusButton.textContent = "-";
            minusButton.addEventListener("click", ()=>{
                sectionAddSetting.removeChild(divRounds);
                rounds--;
                arrayRounds.pop();
                //roundBlindsValues.
            })
            divRounds.appendChild(minusButton);

        //Contenedor de Blinds
            let divBlinds = document.createElement("div");
            divBlinds.className = "blinds";
            divRounds.appendChild(divBlinds);

            //Lower Bet
            let inputLowBet = document.createElement("input");
            inputLowBet.type = "number";
            divBlinds.appendChild(inputLowBet);

            //High Blind
            let pHigherBet = document.createElement("p");
            divBlinds.appendChild(pHigherBet);

            //Escuchar Cambios Usuario
            inputLowBet.addEventListener("change", ()=>{
                let min = parseInt(inputLowBet.value);
                let max = min * 2;
                pHigherBet.textContent = max;
                //Crear Clase con Valores Asignados
                arrayRounds = arrayRounds.filter(r => r.round !== rounds);
                arrayRounds.push(new addRounds(rounds, min, max));


                console.log("Array completo:", arrayRounds);
                
            });

        //Boton Agregar Rounds
            let addButton = document.createElement("button");
            addButton.type = "button";
            addButton.textContent = "+";
            addButton.addEventListener("click", createNumberOfRounds);
            divRounds.appendChild(addButton);
    }

document.addEventListener("DOMContentLoaded", () => {
    //Carga de datos de roundMinutes
    let roundMinutesAnterioresJSON = localStorage.getItem("roundMinutes");
    let roundMinutesAnteriores = JSON.parse(roundMinutesAnterioresJSON);
    console.log(roundMinutesAnteriores)
    if(roundMinutesAnteriores != null){
        settings.roundMinutes = roundMinutesAnteriores.roundMinutes;
        actualizarPRoundMinutes();
    }

    //Carga de datos SI EXISTEN de BLINDS
    let arrayRoundsJson = localStorage.getItem("arrayRounds");
    if (arrayRoundsJson && arrayRoundsJson !== "[]") {
        let datosAnteriorArrayRounds = JSON.parse(arrayRoundsJson);
        console.log(datosAnteriorArrayRounds);
        datosAnteriorArrayRounds.forEach(round => {
            arrayRounds.push(round)
            reloadPrevSettings(round);
        });
    } else {
        createNumberOfRounds();
        console.log(arrayRounds)
    }
});

//Guardamos los datos indefinidamente
let buttonSaveChange = document.getElementById("saveChanges");
buttonSaveChange.addEventListener("click", ()=>{
    //Guardar Cambios para Rounds Minutes
    localStorage.removeItem("roundMinutes");
    let roundMinutes = JSON.stringify(settings);
    localStorage.setItem("roundMinutes", roundMinutes);


    //Guardar Cambios para BLINDS
    localStorage.removeItem("arrayRounds");
    let arrayRoundsJson = JSON.stringify(arrayRounds);
    localStorage.setItem("arrayRounds", arrayRoundsJson);
    alert("Cambios Guardados");
    
});
