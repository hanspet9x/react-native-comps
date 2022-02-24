import React, { useState } from 'react';
import { Text, Pressable, ViewStyle } from 'react-native';
import { StyleSheet, TextInput, View } from 'react-native';
import Icons from '../icons';
import { IInputFieldProps } from './interface';
import { appLayout } from './../common/layout';
import { appColors } from './../common/colors';
import { Animated } from 'react-native';
import { useAnimated } from './../hooks/animation';
import { useEffect } from 'react';


type TSideIconProp = {
  isValid: boolean;
  isPassword: boolean;
  showPassword: boolean;
  isRequired: boolean;
  onPress(): void;
}

const SideIcon = ({ isValid, isPassword, showPassword, onPress, isRequired }: TSideIconProp) => {

  const handleClick = () => {
    isPassword && onPress();
  }
  return (
    <Pressable onPress={handleClick}
      style={[styles.iconWrapper, { backgroundColor: isValid ? '#aaffaa' : appColors.primary, opacity: isRequired ? 1 : 0 }]}>
      <Icons
        size={20}
        style={styles.iconStyle}
        color={appColors.primaryContrast}
        name={isPassword ? showPassword ? 'eye-closed' : 'eye' :
          isValid ? 'check' : 'clear'} />
    </Pressable>
  )
}

/**
 * An InputField component.
 * @param param IInputFieldProps
 * @returns 
 */
const InputField = ({ isRequired = true, borderType = "solid", disabled = false, ...props }: IInputFieldProps) => {
  const [isValid, setisValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { start, interpolate } = useAnimated(0);
  const [value, setValue] = useState("");
  /**
   * It handle the onChangeText handler of the input comp.
   * @param text - string 
   */
  const onHandleText = (text: string) => {
    const valid = props.regex?.test(text);
    props.onChangeText(props.name, text, valid);
    setisValid(valid ?? false);
    setValue(text);
    if(props.onValidate) {
      props.onValidate(valid ?? false, isRequired, {name: props.name, value: text})
    }
  }

  useEffect(() => {
      
      setValue((val) => {

        handleFocus();
        return props.value ?? ""
      });
  }, [props.value])

  const handleFocus = () => {
    if (value.trim().length) {
      start(1);
    }
  }

  const handleBlur = () => {
    if (!value.trim().length) {
      start(0);
    }
  }

  const onPasswordEyePressed = () => {
    setShowPassword((show) => !show);
  }

  useEffect(() => {
    if (value && value.trim().length) {
      handleFocus();
    }
  })

  const getWrapperStyle = (): ViewStyle => {
    if (borderType === "bottom") {
      return { borderWidth: 0, borderBottomWidth: 1 }
    } else if(borderType === "none") {
      return {borderWidth: 0}
    }
    return {};
  }

  return (
    <View style={props.wrapperStyle}>
      <View style={styles.labelWrapper}>{typeof props.label === "string" ? <Text>{props.label}</Text> : props.label}</View>
      <View style={[styles.inputWrapper, getWrapperStyle(), props.isTextArea && styles.textareaWrapper]}>
        <View style={{ flex: 1 }}>
          <Animated.Text
            style={[styles.placeholder,
            {
              transform: [
                { translateX: interpolate([0, 1], [15, 0]) },
                { translateY: interpolate([0, 1], [ props.isTextArea ? 8 : 23, 0]) },
                { scale: interpolate([0, 1], [1.7, 1]) }
              ]
            }
            ]}>{props.placeholder}</Animated.Text>

          <TextInput
            editable={!disabled}
            multiline={props.isTextArea}
            secureTextEntry={props.isPassword ? !showPassword : false}
            onFocus={handleFocus} onBlur={handleBlur}
            style={[styles.inputStyle, props.isTextArea && styles.multilineStyle]}
            selectionColor={appColors.inputColor}
            onChangeText={onHandleText}
            {...props.props}
            value={value}
          />

        </View>
        <SideIcon isRequired={isRequired ?? false} isValid={isValid} isPassword={props.isPassword ?? false} showPassword={showPassword} onPress={onPasswordEyePressed} />
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputWrapper: {
    position: 'relative',
    borderColor: appColors.inputBorderColor,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderRadius: 6,
    height: appLayout.textInputHeightWrapper
  },

  textareaWrapper: {
    height: appLayout.textMultilineHeightWrapper,
    alignItems: 'flex-start',
    paddingTop: 10
  },

  labelWrapper: {
    marginBottom: 5
  },

  placeholderInactive: {
    transform: [{ scale: 1.4 }, { translateX: 10 }, { translateY: 8 }],
  },
  placeholder: {
    position: 'absolute',
    top: -7,
    fontSize: 10,
    left: 0,
    color: appColors.inputPlaceholderColor,
    zIndex: 1
  },

  inputStyle: {
    
    height: appLayout.textInputHeight,
  },
  multilineStyle: {
    height: appLayout.textMultilineHeight,
    paddingTop: 8,
    textAlignVertical: "top"
  },

  iconWrapper: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
    marginLeft: 6
  },
  iconStyle: {

  }
});
