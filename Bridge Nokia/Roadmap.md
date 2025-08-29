Você hoje faz toda a provisão da ONT via comandos (provavelmente por CLI ou SSH na OLT). O que você quer é um sistema com campos de preenchimento, onde o técnico coloca só as informações variáveis (ex: desc1, desc2, sernum, vlan-id, etc.), e o sistema gera automaticamente todos os comandos prontos para aplicar.

Ou seja, em vez de você digitar tudo manualmente, o sistema gera o "script" com os comandos já montados.

Como podemos fazer:

Existem alguns caminhos práticos para isso:

1. Sistema Web Simples (HTML + JS + Python/PHP no backend)

Você cria um formulário web com os campos necessários:

Descrição 1 (Cliente)

Descrição 2

Serial da ONT

VLAN

Porta UNI

Ao clicar em "Gerar Script", o sistema monta os comandos e mostra na tela ou exporta para um arquivo .txt.

Exemplo de ideia inicial em HTML + JS (bem simples):
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <title>Bridge Nokia</title>
</head>

<body>
  <h2>Provisionamento de ONT - Gerador de Script</h2>


    <div class="container">
        <div class="container_into">
            <p class="titulo">POSIÇÃO DO CLIENTE</p>    
            <form id="">
                <input type="text" id="inputSlot" placeholder="Slot GPON">
                <input type="text" id="inputGpon" placeholder="Porta PON">
                <input type="text" id="inputIndex" placeholder="Posição da ONT">
            </form>
        </div>
  
  <form id="formONT">
    <label>Descrição 1 (Cliente):</label>
    <input type="text" id="desc1"><br><br>

    <label>Descrição 2 (Empresa):</label>
    <input type="text" id="desc2"><br><br>

    <label>Serial da ONT:</label>
    <input type="text" id="sernum"><br><br>

    <label>VLAN ID:</label>
    <input type="number" id="vlan"><br><br>

    <label>Porta UNI:</label>
    <input type="number" id="uni" value="4"><br><br>

    <button type="button" onclick="gerarScript()">Gerar Script</button>
  </form>

  <h3>Script Gerado:</h3>
  <textarea id="saida" rows="20" cols="100"></textarea>

  <script>
    function gerarScript() {
      let desc1 = document.getElementById("desc1").value || "CLIENTE";
      let desc2 = document.getElementById("desc2").value || "EMPRESA";
      let sernum = document.getElementById("sernum").value || "ALCL:XXXXXX";
      let vlan = document.getElementById("vlan").value || "2750";
      let uni = document.getElementById("uni").value || "4";

      let script = `
configure equipment ont interface 1/1/1/8/2 sw-ver-pland auto desc1 ${desc1} desc2 ${desc2} sernum ${sernum} subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate
configure equipment ont interface 1/1/1/8/2 admin-state up
configure equipment ont slot 1/1/1/8/2/1 planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up
configure qos interface 1/1/1/8/2/1/${uni} upstream-queue 0 bandwidth-profile name:HSI_1G_UP
configure interface port uni:1/1/1/8/2/1/${uni} admin-up
configure bridge port 1/1/1/8/2/1/${uni} max-unicast-mac 12 max-committed-mac 1
configure bridge port 1/1/1/8/2/1/${uni} vlan-id ${vlan}
configure bridge port 1/1/1/8/2/1/${uni} pvid ${vlan}
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-1-8-2-35::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.${uni}.isTr069Domain,PARAMVALUE=false;
      `;

      document.getElementById("saida").value = script.trim();
    }
  </script>
</body>
</html>


👉 Esse código gera o script pronto baseado nos dados que o técnico digitar.

2. Integração direta por SSH (automatizar execução)

Se quiser além de gerar o script, também executar direto na OLT, dá pra usar Python com Paramiko (biblioteca de SSH).

O sistema pegaria os dados, montaria o script, e já mandaria para a OLT por SSH automaticamente.



COMANDO BRIDGE CRT:


PROVISIONAMENTO BRIDGE ONT:

DESPROVISIONAR ONT (COMANDOS SSH - UM POR UM)
configure equipment ont interface 1/1/3/16/2 admin-state down
configure equipment ont no interface 1/1/3/16/2

Digitar: exit all (apertar enter)

PROVISIONAR ONT
configure equipment ont interface 1/1/3/16/2 sw-ver-pland auto desc1 ESAB_CONSTRUCAO_CIVIL_E_IMOBILIARIA_LTDA desc2 esabcltda sernum ALCL:FCD53192 subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate

configure equipment ont interface 1/1/3/16/2 admin-state up

Porta Bridge

configure equipment ont slot 1/1/3/16/2/1 planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up

configure qos interface 1/1/3/16/2/1/2 upstream-queue 0 bandwidth-profile name:HSI_1G_UP (número após 1 porta)
configure interface port uni:1/1/3/16/2/1/2 admin-up
configure bridge port 1/1/3/16/2/1/2 max-unicast-mac 12 max-committed-mac 1		
configure bridge port 1/1/3/16/2/1/2 vlan-id 2710
configure bridge port 1/1/3/16/2/1/2 pvid 2710



Comando TL1 para colocar a porta LAN em modo Bridge na LAN porta 1 

ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-3-16-2-30::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.2.isTr069Domain,PARAMVALUE=false;

OBS:
upstream-queue 5 para voz 0 para conexão

CONSULTAR
show vlan bridge-port-fdb 1/1/3/16/2/1/1 - Verificar se pegou MAC
info configure bridge port 1/1/3/16/2/1/1 flat - Verificar VLAN


FIM
====================================

PROVISIONAMENTO TELEFONE ONT:

configure qos interface 1/1/4/12/26/1/4 upstream-queue 5 bandwidth-profile name:HSI_1G_UP 
configure interface port uni:1/1/4/12/26/1/4 admin-up		
configure bridge port 1/1/4/12/26/1/4 max-unicast-mac 12  max-committed-mac 1		
configure bridge port 1/1/4/12/26/1/4 vlan-id 300
configure bridge port 1/1/4/12/26/1/4 pvid 300

BRIDEGE PARA INTERNET 

configure qos interface 1/1/4/12/26/1/1 upstream-queue 0 bandwidth-profile name:HSI_1G_UP
configure interface port uni:1/1/4/12/26/1/1 admin-up		
configure bridge port 1/1/4/12/26/1/1 max-unicast-mac 12  max-committed-mac 1		
configure bridge port 1/1/4/12/26/1/1 vlan-id 2800
configure bridge port 1/1/4/12/26/1/1 pvid 2800

TL1 HABILITAR O BRIDGE 
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-4-12-26-32::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.4.isTr069Domain,PARAMVALUE=false;

OBS: EthPort.1.isTr069Domain  PORTA QUE FICARA O BRIDGE 
HGUTR069SPARAM-1-1-4-12-26-31   POSIÇÃO QUE FICARA O BRIDGE, SO PODE TER 1 EM CADA POSIÇÃO

FIM
====================================