Sistema Web Simples (HTML + CSS + JS) - Bridge ONT Nokia:

====================================================================================================================================================
COMANDO BRIDGE PARA INTERNET (TUDO QUE ESTÁ EM VERDE SERÁ ALTERADO):

DESPROVISIONAR ONT:
configure equipment ont interface 1/1/`3/16/2` admin-state down
configure equipment ont no interface 1/1/`3/16/2`

PROVISIONAR ONT:
configure equipment ont interface 1/1/`3/16/2` sw-ver-pland auto `desc1` ESAB_CONSTRUCAO_CIVIL_E_IMOBILIARIA_LTDA `desc2` esabcltda `sernum` ALCL:FCD53192 subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate

configure equipment ont interface 1/1/`3/16/2` admin-state up

PORTA BRIDGE:
configure equipment ont slot 1/1/`3/16/2/1` planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up

configure qos interface 1/1/`3/16/2/1/2` upstream-queue `0` bandwidth-profile name:HSI_1G_UP 

configure interface port uni:1/1/`3/16/2/1/2` admin-up
configure bridge port 1/1/`3/16/2/1/2` max-unicast-mac 12 max-committed-mac 1	
configure bridge port 1/1/`3/16/2/1/2` vlan-id `2710`
configure bridge port 1/1/`3/16/2/1/2` pvid `2710`

Comando TL1 para colocar a porta LAN em modo Bridge na LAN:
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-`3-16-2-30'::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.`2`.isTr069Domain,PARAMVALUE=false;

====================================================================================================================================================
O QUE SERÁ ALTERADO:

Slot - Pon - Posição - desc1 - desc2 - sernum - card-type - porta LAN (Opção de escolha 1, 2, 3 e 4).

upstream-queue: (Internet → upstream-queue 0 / Voz → upstream-queue 5).

vlan (Opção de escolha, cidades...)

Linha TL1: 
3-16-2-30 -> O 30 Será interessante validar, mas, acredito que ele possa ser o padrão.

EthPort.EthPort.2 -> Colocar no lugar do 2 a porta LAN do Bridge.
====================================================================================================================================================
CONSULTAS A SEREM REALIZADAS APÓS A REALIZAÇAO DO BRIDGE:
show vlan bridge-port-fdb 1/1/`3/16/2/1/2` - Verificar se pegou MAC
info configure bridge port 1/1/`3/16/2/1/2` flat - Verificar VLAN
====================================================================================================================================================
VERIFICAR COMO O BRIDGE VOIP FUNCIONA DE FATO PARA REALIZAR A CODAGEM:

configure equipment ont interface 1/1/`3/16/2` admin-state down
configure equipment ont no interface 1/1/`3/16/2`

configure equipment ont interface 1/1/`3/16/2` sw-ver-pland auto `desc1` ESAB_CONSTRUCAO_CIVIL_E_IMOBILIARIA_LTDA `desc2` esabcltda `sernum` ALCL:FCD53192 subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate

configure equipment ont interface 1/1/`3/16/2` admin-state up

PORTA BRIDGE:
configure equipment ont slot 1/1/`3/16/2/1` planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up
OBS: AQUI ALTERAREMOS = plndnumvoiceports '0' (Temos que colocar quantas portas FXS terá na ONT 1 ou 2).

configure qos interface 1/1/`3/16/2/1/2` upstream-queue `0` bandwidth-profile name:HSI_1G_UP 
OBS: AQUI VAI MUDAR = upstream-queue '0' (Vai ficar o 5)

configure interface port uni:1/1/`3/16/2/1/2` admin-up
configure bridge port 1/1/`3/16/2/1/2` max-unicast-mac 12 max-committed-mac 1	
configure bridge port 1/1/`3/16/2/1/2` vlan-id `2710`
configure bridge port 1/1/`3/16/2/1/2` pvid `2710`
OBS: VLANs DE VOIP (EX: 300, 200...)

Comando TL1 para colocar a porta LAN em modo Bridge na LAN:
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-`3-16-2-30'::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.`2`.isTr069Domain,PARAMVALUE=false;


