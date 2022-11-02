import Input from '@mui/material/Input'


export const CustomInput = (props) => {

    return (

        <Input type={props.type} sx={{
            width: "17rem",
            height: "32px",
            backgroundColor: (theme) => theme.palette.background.input,
            borderRadius: "5px",
            border: "0.5px solid #E0E0E0",
            padding: "5px",
            outline: "none",
            '& .MuiInput-input': {
                color: (theme) => theme.palette.text.heading
            },
            '& .MuiFormControl-root .MuiTextField-root ':
                { border: '0.5px solid #e0e0e0' }
        }} disableUnderline className={`${props?.className && props.className}`} value={props.value}
            endAdornment={props.endAdornment && props.endAdornment} {...props} />
    )
}