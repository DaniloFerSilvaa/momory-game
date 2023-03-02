import { useEffect, useState } from 'react'
import * as C from './app.styles'
import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'
import { GridItem } from './components/GridItem'
import RestartIcon from './svgs/restart.svg'
import logoImage from './assets/devmemory_logo.png'
import { GridItemType } from './types/GridItemType'
import { items } from './data/items'
import { formatTimeElepsed } from './helpers/formatTimeElepsed'




const App = () => {
     const [ playing, setPlaying ] = useState<boolean>(false);
     const [ timeElapsed, setTimeElepsed ] = useState<number>(0);
     const [ moveCount, setMoveCont ] = useState<number>(0);
     const [ shownCount, setShownCount ] = useState<number>(0);
     const [ gridItems, setGridItems ] = useState<GridItemType[]>([])

     //iniciando jogo quando a tela for iniciada
     useEffect(() => resetAndCreateGrid(), []);
     
     //temporizador
     useEffect(() => {
          const timer = setInterval(() => {
               if(playing) setTimeElepsed(timeElapsed + 1)
          }, 1000);
          return () => clearInterval(timer)
     }, [playing, timeElapsed])

     //verificando se os dois abertos são iguais
     useEffect(() => {
          if (shownCount === 2) {
               let opened = gridItems.filter(item => item.shown === true)


               if (opened.length === 2) {
                    //Se os dois são iguais coloca eles permanentes
                    if (opened[0].item === opened[1].item) {
                         let tmpGrid = [...gridItems];
                         for (let i in tmpGrid) {
                              if (tmpGrid[i].shown) {
                                   tmpGrid[i].permanentShown = true
                                   tmpGrid[i].shown = false
                              }
                         }
                         setGridItems(tmpGrid);
                         setShownCount(0);
                    } else {
                         //se eles são diferentes, fecha os que estão mostrando
                         setTimeout(() => {
                              let tmpGrid = [...gridItems];
                         for(let i in tmpGrid){
                              tmpGrid[i].shown = false;
                         }
                         setGridItems(tmpGrid);
                         setShownCount(0);
                         }, 1000)
                    }
                    setMoveCont(moveCount => moveCount + 1 )
               }
          }
     }, [shownCount, gridItems])

     //Verifica se o jogo acabou
     useEffect(() => {
          if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
               setPlaying(false)
          }
     }, [moveCount, gridItems])

     const resetAndCreateGrid = () => {
          //passo 1 - Resetar o jogo
          setTimeElepsed(0);
          setMoveCont(0);
          setShownCount(0);


          //Passo 2 - Criar grid vazio
          let tmpGrid: GridItemType[] = [];
          for (let i = 0; i < (items.length * 2 ); i++)  tmpGrid.push({
               item: null,  shown: false, permanentShown: false
          });

          //passo 2.1 Preencher grid
          for (let w = 0; w < 2; w++) {
               for(let i = 0; i < items.length; i++){
                    let pos = -1;
                    while (pos < 0 || tmpGrid[pos].item !== null) {
                         pos = Math.floor(Math.random() * (items.length * 2))
                    }
                    tmpGrid[pos].item = i
               }
          }

          //Passo 2.2 Jogar no state do grid
          setGridItems(tmpGrid);

          //Passo 3 - começar o jogo
          setPlaying(true);

     }

     const handleItemClick = (index:number) => {
          if(playing && index !== null && shownCount < 2) {
               let tmpGrid = [...gridItems]

               if (tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
                    tmpGrid[index].shown = true
                    setShownCount(shownCount + 1)
               }
               setGridItems(tmpGrid)
          }
     }

     return (
          <C.Conteiner>
               <C.Info>
                    <C.LogoLink href="">
                         <img src={logoImage} alt="" width='200' />
                    </C.LogoLink>

                    <C.InfoArea>
                         <InfoItem label='tempo' value={formatTimeElepsed(timeElapsed)}/>
                         <InfoItem label='Movimentos' value={moveCount.toString()}/>
                    </C.InfoArea>

                    <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}  />
               </C.Info>

               <C.GridArea>
                    <C.Grid>
                         {gridItems.map((item, index) => (
                              <GridItem 
                                   key={index}
                                   item={item}
                                   onClick ={() => handleItemClick(index)}
                              />
                         )) }
                    </C.Grid>
               </C.GridArea>
          </C.Conteiner>
     )
}

export default App;