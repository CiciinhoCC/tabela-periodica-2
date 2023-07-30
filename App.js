import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import data from "./tabela.json"
let elementos = []
let tabela = [[],[],[],[],[],[],[],[],[]]
data.map(item => {
  elementos.push({
    num: item.atomicNumber,
    massa: item.atomicMass,
    nome: item.name,
    simbolo: item.symbol,
    estado: item.standardState == ""? "***" : item.standardState,
    fusao: item.meltingPoint == ""? "***" : item.meltingPoint,
    ebul: item.boilingPoint == ""? "***" : item.boilingPoint,
    tipo: item.groupBlock,
    corCpk: item.cpkHexColor,
    ano: item.yearDiscovered === "Ancient"? "Antigo" : item.yearDiscovered,
    marginTop: 5
  })
})
elementos.map(elementos => {
  switch(elementos.tipo){
    case "nonmetal": elementos.tipo = "Não Metal"; elementos.cor = "328da8"; break;
    case "noble gas": elementos.tipo = "Gás Nobre"; elementos.cor = "a35b12"; break;
    case "alkali metal": elementos.tipo = "Metal Alcalino"; elementos.cor = "c3cc1b"; break;
    case "alkaline earth metal": elementos.tipo = "Metal Alcalinoterroso"; elementos.cor = "5fcc1b"; break;
    case "metalloid": elementos.tipo = "Metaloide"; elementos.cor = "271f80"; break;
    case "halogen": elementos.tipo = "Halogênio"; elementos.cor = "a38812"; break;
    case "transition metal": elementos.tipo = "Metal de Transição"; elementos.cor = "826d5e"; break;
    case "metal": elementos.tipo = "Metal Pós-Transição"; elementos.cor = "8f283b"; break;
    case "actinoid": elementos.tipo = "Actinídeo"; elementos.cor = "28758f"; break;
    case "lanthanoid": elementos.tipo = "Lantanídeo"; elementos.cor = "963e96"; break;
  };
  switch(elementos.estado){
    case "solid": elementos.estado = "Sólido"; break;
    case "gas": elementos.estado = "Gasoso"; break;
    case "liquid": elementos.estado = "Líquido"; break;
  }
})
for(let i = 0; i < 118; i++){
  if(i < 2){
    tabela[0].push(elementos[i]);
  }
  else{
    if(i < 10){
      tabela[1].push(elementos[i]);
    }
    else{
      if(i < 18){
        tabela[2].push(elementos[i]);
      }
      else{
        if(i < 36){
          tabela[3].push(elementos[i]);
        }
        else{
          if(i < 54){
            tabela[4].push(elementos[i]);
          }
          else{
            if(i < 86){
              if(i >= 57 && i < 71){elementos[i].marginTop = 10; tabela[7].push(elementos[i]);}
              else{tabela[5].push(elementos[i]);}
            }
            else{
              if(i < 118){
                if(i >= 89 && i < 103){elementos[i].marginTop = 10; tabela[8].push(elementos[i]);}
                else{tabela[6].push(elementos[i]);}
              }
            }
          }
        }
      }
    }
  }
}

export default class App extends Component {
  constructor(){
    super();

    this.state = {
      mostrado: false
    }
  }
  render(){
    console.log(tabela)
    return (
      <View style={styles.container}>
                      
        {this.state.mostrado?
          <View style={styles.info}>
            <View style={styles.infoElement}>

              <Text style={styles.elementNameBig}>{this.state.item.nome}</Text>

              <View style={[styles.elementoBig, {backgroundColor: "#" + this.state.item.cor,}]}>
                <Text style={[styles.elementMassNumBig, {alignSelf: 'flex-start'}]}>{this.state.item.num}</Text>

                  <Text style={styles.elementSymbolBig}>
                    {this.state.item.simbolo}
                  </Text>

                <Text style={[styles.elementMassNumBig, {alignSelf: 'flex-end'}]}>
                {typeof this.state.item.massa === "string"? parseFloat(this.state.item.massa).toFixed(2) : `(${this.state.item.massa})` }
                </Text>
              </View>
              
            </View>
            <View style={styles.infoInfo}>
              <Text style={styles.infoText}>Número Atômico: {this.state.item.num}</Text>
              <Text style={styles.infoText}>Massa Atômica: {typeof this.state.item.massa === "string"? this.state.item.massa : `(${this.state.item.massa})` }</Text>
              <Text style={styles.infoText}>Tipo: {this.state.item.tipo}</Text>
              <Text style={styles.infoText}>Ano Descoberto: {this.state.item.ano}</Text>
              <Text style={styles.infoText}>Estado: {this.state.item.estado}</Text>
              <Text style={styles.infoText}>Ponto de Fusão: {this.state.item.fusao} K</Text>
              <Text style={styles.infoText}>Ponto de Ebulição: {this.state.item.ebul} K</Text>

              <View style={[styles.cpkBall, {backgroundColor: "#" + this.state.item.corCpk}]}/>
            </View>
          </View>

          : <View/>}
        
        <View style={styles.tabelaPeriodica}>
          {tabela.map(periodo => {
            console.log(periodo)
            return(
              <View style={styles.tabelaPeriodo}>
                {periodo.map(item => {
                  switch(item.num){
                    case 2: item.marginLeft = 885; break;
                    case 5: item.marginLeft = 555; break;
                    case 13: item.marginLeft = 555; break;
                    case 58: item.marginLeft = 115; break;
                    case 90: item.marginLeft = 115; break;
                    default: item.marginLeft = 5; break;
                  }
                  return(
                    <View style={{alignItems: 'center'}}>
                      
                      <TouchableOpacity style={[styles.elemento, {
                        backgroundColor: "#" + item.cor, 
                        marginLeft: item.marginLeft, 
                        marginTop: item.marginTop
                      }]} onPress={() => {
                        this.setState({
                          mostrado: this.state.item === item? !this.state.mostrado : true,
                          item: item
                        })
                      }}>
                        <Text style={[styles.elementMassNum, {alignSelf: 'flex-start'}]}>{item.num}</Text>
                        <Text style={styles.elementSymbol}>
                          {item.simbolo}
                        </Text>
                        <Text style={[styles.elementMassNum, {alignSelf: 'flex-end'}]}>
                          {typeof item.massa === "string"? parseFloat(item.massa).toFixed(2) : `(${item.massa})` }
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            )
          })}
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 10,
    backgroundColor: '#777',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabelaPeriodica: {
    flexDirection: 'column'
  },
  tabelaPeriodo: {
    flexDirection: 'row'
  },
  elemento: {
    width: 50,
    height: 50,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1
  },
  elementSymbol: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    margin: 5
  },
  elementMassNum:{
    position: 'absolute',
    fontSize: 12,
    margin: 1
  },
  info: {
    backgroundColor: 'white',
    margin: 20,
    width: 500,
    height: 150,
    borderRadius: 10,
    position: 'absolute',
    marginRight: 250,
    marginBottom: 350,
    flexDirection: 'row'
  },
  elementSymbolBig: {
    fontSize: 50,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    margin: 5
  },
  elementMassNumBig:{
    position: 'absolute',
    fontSize: 24,
    margin: 1
  },
  elementoBig: {
    width: 100,
    height: 100,
    borderRadius: 20,
    flexDirection: 'row',
    borderWidth: 1,
    alignSelf: 'center'
    
  },
  infoElement: {
    flex: 0.3,
    alignItems: 'center',
    borderRightWidth: 2,
    borderColor: '#222',
    flexDirection: 'column'
  },
  infoInfo:{
    flex: 0.7,
    justifyContent: 'center'
  },
  elementNameBig:{
    fontSize: 24,
    borderBottomWidth: 1,
    borderColor: '#222',
    margin: 5,
    width: 150,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoText: {
    marginLeft: 10,
    fontSize: 15
  },
  cpkBall: {
    width: 50,
    height: 50,
    borderRadius: 50,
    margin: 20,
    alignSelf: 'flex-end',
    position: 'absolute',
    borderWidth: 1
  }
});
