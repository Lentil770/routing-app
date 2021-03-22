import styled from "styled-components";

const Lavender = '#7B506F';
const LightSeaGreen = '#8DD4CF';

export const MainButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 50px;
    padding-right: 20px;
    padding-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-horizontal: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 26px;
`
export const ClosePageButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 30px;
    padding-right: 10px;
    padding-left: 10px;
    align-items: center;
    align-self: flex-start;
    border-radius: 26px;
    position: absolute;
    top: 5px;
    left: 5px;
`

export const TaskButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 40px;
    padding-right: 15px;
    padding-left: 15px;
    margin-top: 5px;
    margin-horizontal: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 26px;
`

export const PackageButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 25px;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 7px;
    padding-bottom: 7px;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: space-evenly;
    border: 1px solid white;
    border-radius: 5px;
`

export const PasswordInput = styled.TextInput`
    width: 120px;
    border-bottom-color: ${LightSeaGreen};
    border-bottom-width: 1.5px;
    margin-bottom: 50px;
    color: ${LightSeaGreen};
`

export const FeedbackInput = styled.TextInput`
    width: 350px;
    border-bottom-color: ${Lavender};
    border-bottom-width: 1.5px;
    color: ${Lavender};
    marginTop: 0px;
    marginBottom: 5px;
    font-size: 20px;
    max-width: 350px;
    align-self: center;
`

export const BackButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 30px;
    padding-right: 10px;
    padding-left: 10px;
    margin-left: 15px;
    align-items: center;
    align-self: flex-start;
    border-radius: 26px;
`
export const CheckInButton = styled.TouchableHighlight`
    background-color: ${Lavender};
    height: 30px;
    padding-right: 10px;
    padding-left: 10px;
    margin-left: 15px;
    align-items: center;
    align-self: flex-start;
    border-radius: 26px;
`

export const WazeButton = styled.TouchableHighlight`
    width: 75px;
    height: 75px;
    padding: 0;
    border-radius: 26px;
`
export const ButtonGroup = styled.View`
    display: flex;
    flex-direction: row;
`
