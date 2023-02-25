import type { TextFieldProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import { type Control, Controller } from "react-hook-form";

export type ControlledTextInputProps = TextFieldProps & {
  control: Control<any>;
  name: string;
};

export default function ControlledTextInput({
  control,
  name,
  helperText,
  ...rest
}: ControlledTextInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...rest}
          error={error ? true : false}
          helperText={error?.message || helperText}
        />
      )}
    />
  );
}
