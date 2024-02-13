import React from 'react';
import { styled } from '@mui/system';
// import { Hidden, Tooltip } from '@mui/material';

const Wrapper = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
})

const Label = styled('p')({
    color: '#000000',
    textTransform: 'uppercase',
    fontWeight: '600',
    fontSize: '16px',
})

const ValidChecker = styled('p')({
    color: '#000000',
    textTransform: 'uppercase',
    fontWeight: '300',
    fontSize: '16px',
    margin: '2px',
})

const Input = styled("input")({
    flexGrow: 1,
    height: '40px',
    border: '1px solid black',
    borderRadius: '5px',
    color: '#000000',
    background: '#ffffff',
    margin: 0,
    fontSize: "16px",
    padding: "0 5px",
    width: "100%"
})

const InputWithLabel = (props) => {
    const { value, setValue, label, type, placeholder, validateState,
        maxLength, min, max } = props

    const handleValueChange = (event) => {
        setValue(event.target.value)
    }
    return (
        <Wrapper>
            <Label>{label}</Label>
            <Input
                value={value}
                onChange={handleValueChange}
                type={type}
                placeholder={placeholder}
                min={min}
                max={max}
                maxLength={maxLength}
            />
            <div style={{ display: 'inline-block' }}>
                <ValidChecker>{validateState}</ValidChecker>
            </div>
        </Wrapper>
    );
};

// const InputWithLabel = React.forwardRef(function InputWithLabel(props, ref) {
//     const handleValueChange = (event) => {
//         props.setValue(event.target.value)
//     }
//     return (
//         <Wrapper>
//             <Label>{props.label}</Label>
//             <Input
//                 value={props.value}
//                 onChange={handleValueChange}
//                 type={props.type}
//                 placeholder={props.placeholder}
//             />
//         </Wrapper>
//     );
// })


export default InputWithLabel;