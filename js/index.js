//Setting por defecto si no estan configurados
let settings = {roundMinutes: 10};
let arrayRounds = [];
let index = 0;
const audio = new Audio('../assets/audio/acdc.m4a');
//Carga de Datos Fundamentales
function loadDataFromSettings(){
    //Temporizador
    let roundMinutesAnterioresJSON = localStorage.getItem("roundMinutes");
    let roundMinutesAnteriores = JSON.parse(roundMinutesAnterioresJSON);
    console.log(roundMinutesAnteriores)
    if(roundMinutesAnteriores != null){
        settings.roundMinutes = roundMinutesAnteriores.roundMinutes;
    }
    
    //Carga de datos SI EXISTEN de BLINDS
    let arrayRoundsJson = localStorage.getItem("arrayRounds");
    if (arrayRoundsJson && arrayRoundsJson !== "[]") {
        let datosAnteriorArrayRounds = JSON.parse(arrayRoundsJson);
        console.log(datosAnteriorArrayRounds);
        arrayRounds = datosAnteriorArrayRounds;
    } else {
        arrayRounds.push({
    round: 1,
    minBlind: 1,
    maxBlind: 2
})
        console.log(arrayRounds)
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    loadDataFromSettings();
        
    //Timer
    const divValores = document.getElementsByClassName("valores");
    const divInterfaz = document.getElementsByClassName("interfaz")

    let tiempoInicial = settings.roundMinutes;
    let displayTemporizador;
    let cronometroMinutos = tiempoInicial-1;
    let cronometroSegundos = 59;
    let pausarTemporizador = true;
    const pTemporizador = document.getElementById("temporizador");
    pTemporizador.style.display = "none";
    const botonEmpezarTemportizador = document.getElementById("empezarTemporizador");
    const botonesResetTemportizador = document.getElementsByClassName("resetTemporizador");
    botonEmpezarTemportizador.addEventListener("click", temporizadorControl);
    pTemporizador.addEventListener("click", temporizadorControl);
    function temporizadorControl(){
        
        if (cronometroMinutos === 0 && cronometroSegundos === 0 && botonEmpezarTemportizador.style.display === "none"){
            cronometroMinutos = tiempoInicial-1;
            cronometroSegundos = 59;
            pausarTemporizador = false;
            divValores[0].id = "";
            divValores[1].id = "";
            divInterfaz[0].id = "";
            empezarTemporizador();
        }else if(pausarTemporizador){
            pausarTemporizador = false;
            botonEmpezarTemportizador.style.display = "none";
            pTemporizador.style.display = "block";
            pTemporizador.style.color = "white";
            
            empezarTemporizador();
            
        } else {
            clearInterval(displayTemporizador);
            pTemporizador.style.color = "yellow";
            pausarTemporizador = true;
            
        }
    }
    
    for(let i = 0; i<2;i++){
        botonesResetTemportizador[i].addEventListener("click", resetTemporizador);
    }

    function actualizarTextoP(){
        pTemporizador.textContent = `${cronometroMinutos}:${cronometroSegundos}`;
    }
    actualizarTextoP();
    function empezarTemporizador(){
        displayTemporizador = setInterval(()=>{
            if (cronometroSegundos === 0){
                cronometroMinutos--;
                cronometroSegundos = 59;
            } else{
                cronometroSegundos--;
            }
            if ((cronometroMinutos === 0) && (cronometroSegundos === 0)){
                pausarTemporizador = true;
                divValores[0].id = "pausa";
                divValores[1].id = "pausa";
                divInterfaz[0].id = "pausa";
                clearInterval(displayTemporizador);
                audio.play()
                setTimeout(()=>{audio.pause()},7500);
            }
            actualizarTextoP()
        },1000)
    }
    function resetTemporizador(){
        clearInterval(displayTemporizador);
        pausarTemporizador = true;
        pTemporizador.style.display = "none";
        botonEmpezarTemportizador.style.display = "block";
        cronometroMinutos = tiempoInicial-1;
        cronometroSegundos = 59;
        actualizarTextoP();
        divValores[0].id = "";
        divValores[1].id = "";
        divInterfaz[0].id = "";
    }

    const pMinBlind = document.getElementById("apuestaMinima");
    const pMaxBlind = document.getElementById("apuestaMaxima");

    function mostrarBlind(math){
        index = index + math;
        console.log(arrayRounds.length)
        if (index >= arrayRounds.length){
            index--;
            resetTemporizador();
        } else if(index < 0){
            index++;
            resetTemporizador();
        } else{
            console.log(arrayRounds[index].minBlind);
            pMinBlind.textContent = arrayRounds[index].minBlind;
            pMaxBlind.textContent = arrayRounds[index].maxBlind;
        }
    }
    mostrarBlind(0);
    botonesResetTemportizador[0].addEventListener("click", ()=>{mostrarBlind(-1)});
    botonesResetTemportizador[1].addEventListener("click",()=>{mostrarBlind(1)});
});



