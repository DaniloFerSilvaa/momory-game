import * as C from './styles'

type Props = {
     label: string;
     icon?: any;
     onClick: React.MouseEventHandler<HTMLDivElement>;
}

export const Button = ({label, icon, onClick}: Props) => {
     return (
          <C.Container onClick={onClick}> 
               {icon &&
                    <C.iconArea>
                         <C.icon src={icon}/>
                    </C.iconArea>
               }
               <C.label>
                    { label } 
               </C.label>          
               
          </C.Container>
     )
}