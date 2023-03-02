import styles from "styled-components";

type ContainerProps = {
     showBackground: boolean
}

type IconProps = {
     opacity?: number
}

export const Conteiner = styles.div<ContainerProps>`
     background-color: ${props => props.showBackground ? '#1550FF' : '#E2E3E3' };
     height: 100px;
     border-radius: 20px;
     display: flex;
     justify-content: center;
     align-Items: center;
     cursor: pointer;
`;

export const Icon = styles.img<IconProps>`
     width: 45px;
     height: 45px;
     opacity: ${props => props.opacity ??  1 };
`;