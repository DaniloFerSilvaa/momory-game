import * as C from './app.styles'
import { InfoItem } from './components/InfoItem'
import { Button } from './components/Button'
import RestartIcon from './svgs/restart.svg'
import logoImage from './assets/devmemory_logo.png'


const App = () => {

     const resetAndCreateGrid = () => {

     }

     return (
          <C.Conteiner>
               <C.Info>
                    <C.LogoLink href="">
                         <img src={logoImage} alt="" width='200' />
                    </C.LogoLink>

                    <C.InfoArea>
                         <InfoItem label='tempo' value='00:00'/>
                         <InfoItem label='Movimentos' value='0'/>
                    </C.InfoArea>

                    <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid}  />
               </C.Info>

               <C.GridArea>
                    ...
               </C.GridArea>
          </C.Conteiner>
     )
}

export default App;