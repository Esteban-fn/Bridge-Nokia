REDE

1° PASSO -> DESPROVISIONAR ONT:
configure equipment ont interface 1/1/slot/pon/posicaoONT admin-state down
configure equipment ont no interface 1/1/slot/pon/posicaoONT

2° PASSO -> PROVISIONAR ONT:
configure equipment ont interface 1/1/slot/pon/posicaoONT sw-ver-pland auto desc1 "Desc 1" desc2 "Desc 2" sernum sernum subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate

configure equipment ont interface 1/1/slot/pon/posicaoONT admin-state up

3° PASSO -> PORTA BRIDGE:
configure equipment ont slot 1/1/slot/pon/posicaoONT/cardtype planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up

configure qos interface 1/1/slot/pon/posicaoONT/cardtype/portaLAN upstream-queue 0 bandwidth-profile name:HSI_1G_UP 

configure interface port uni:1/1/slot/pon/posicaoONT/cardtype/portaLAN admin-up
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN max-unicast-mac 12 max-committed-mac 1	
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN vlan-id "vlan"
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN pvid "vlan"

4° PASSO -> Comando TL1 para colocar a porta LAN em modo Bridge na LAN:
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-slot-pon-posicaoONT-30::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.portaLAN.isTr069Domain,PARAMVALUE=false;


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

VOIP

1° PASSO -> DESPROVISIONAR ONT:
configure equipment ont interface 1/1/slot/pon/posicaoONT admin-state down
configure equipment ont no interface 1/1/slot/pon/posicaoONT

2° PASSO -> PROVISIONAR ONT:
configure equipment ont interface 1/1/slot/pon/posicaoONT sw-ver-pland auto desc1 "Desc 1" desc2 "Desc 2" sernum sernum subslocid WILDCARD fec-up disable optics-hist enable sw-dnload-version disabled voip-allowed veip log-auth-pwd plain:** pland-cfgfile1 auto dnload-cfgfile1 auto planned-us-rate nominal-line-rate

configure equipment ont interface 1/1/slot/pon/posicaoONT admin-state up

3° PASSO -> PORTA BRIDGE:
configure equipment ont slot 1/1/slot/pon/posicaoONT/cardtype planned-card-type ethernet plndnumdataports 4 plndnumvoiceports 0 admin-state up

configure qos interface 1/1/slot/pon/posicaoONT/cardtype/portaLAN upstream-queue 5 bandwidth-profile name:HSI_1G_UP 

configure interface port uni:1/1/slot/pon/posicaoONT/cardtype/portaLAN admin-up
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN max-unicast-mac 12 max-committed-mac 1	
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN vlan-id "vlan"
configure bridge port 1/1/slot/pon/posicaoONT/cardtype/portaLAN pvid "vlan"

4° PASSO -> Comando TL1 para colocar a porta LAN em modo Bridge na LAN:
ENT-HGUTR069-SPARAM::HGUTR069SPARAM-1-1-slot-pon-posicaoONT-30::::PARAMNAME=InternetGatewayDevice.X_ASB_COM_EthPort.EthPort.portaLAN.isTr069Domain,PARAMVALUE=false;





show vlan bridge-port-fdb 1/1/3/16/2/1/1 - Verificar se pegou MAC
info configure bridge port 1/1/3/16/2/1/1 flat - Verificar VLAN


Mensagem de alerta caso tenha ido para a área de transferência (Consultas)
Quando for selecionado o modo rede ou voip ira aparecer uma mensagem mostrando qual tipo o usuário escolheu...
Deixar o menu de Informações para explicar como é realizado o bridge pelo comando, com o sistema e um vídeo...

Deixar modo hamburguer para tirar e voltar o menu lateral...
Colocar temas diferentes para o usuário selecionar qual o preferido...
Colocar os parametros corretos no código fonte assim como foi colocado no Bridge...


COLOCAR ISSO NAS CONSULTAS:

show network-access aaa subscribers username "pppoe" ---> (sem aspas, para verificar as velocidades de download e upload do PPPoE na tabela)

show subscribers user-name "pppoe" ---> (sem aspas, para verificar qual IP o PPPoE está autenticado)

show subscribers address 209.14.32.13 ---> Verifica qual PPPOE o IP está vinculado.