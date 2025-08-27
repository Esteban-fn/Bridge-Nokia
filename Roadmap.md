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
  <title>Gerador de Script ONT</title>
</head>
<body>
  <h2>Provisionamento de ONT - Gerador de Script</h2>
  
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
