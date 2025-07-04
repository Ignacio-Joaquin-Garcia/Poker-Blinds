//Setting por defecto si no estan configurados
let settings = {roundMinutes: 10};
//Carga de Datos Fundamentales
function loadDataFromSettings(){
    let roundMinutesAnterioresJSON = localStorage.getItem("roundMinutes");
    let roundMinutesAnteriores = JSON.parse(roundMinutesAnterioresJSON);
    console.log(roundMinutesAnteriores)
    if(roundMinutesAnteriores != null){
        settings.roundMinutes = roundMinutesAnteriores.roundMinutes;
    }
}
document.addEventListener("DOMContentLoaded", ()=>{
    loadDataFromSettings();
        
    //Timer
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
        if (pausarTemporizador){
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
        //BLINDS CHANGE

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
                clearInterval(displayTemporizador);
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
    }
});



