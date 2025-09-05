function gerarComandos() {
    // Obter valores dos campos de entrada
    const slot = document.getElementById('inputSlot').value;
    const portaPon = Document.getElementById('inputGpon').value;
    const posicaoONT = Document.getElementById('inputIndex').value;
    const portaLAN = Document.getElementById('portaLan').value;
    const cardType = Document.getElementById('CardType').value;
    const desc1 = document.getElementById('inputDesc1').value;
    const desc2 = document.getElementById('inputDesc2').value;
    const sernum = document.getElementById('inputSernum').value;
    const vlan = document.getElementById('ProvVLAN').value;
    const portaVoip = document.getElementById('portaVoip').value;

    if(!slot || !portaPon || !posicaoONT || !sernum) {
        alert('Por favor, preencha todos os campos obrigatórios: Slot, Porta PON, Posição da ONT e ALCL da ONT');
        return;      
}








}