import React, { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import PropTypes from "prop-types";
import {
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { generalStyle } from "properties/styles";
import primaryColors from "properties/colors";

const defaultStyles = StyleSheet.create({
  viewContainer: {
    alignSelf: "stretch",
  },
  modalViewTop: {
    flex: 1,
  },
  modalViewBottom: {
    justifyContent: "center",
    backgroundColor: primaryColors.gainsboroGrey,
  },
  placeholder: {
    ...generalStyle.basicText,
  },
  textInput: {},
});

const RNPickerSelect = ({
  onValueChange,
  items,
  value = null,
  placeholder = { label: "Select an item...", value: null, color: "#9EA0A4" },
  style,
  useNativeAndroidPickerStyle = true,
  pickerProps,
  disabled = false,
}) => {
  const [selectedValue, setSelectedValue] = useState(value || null);
  const [showPicker, setShowPicker] = useState(false);
  const [inputLabel, setInputLabel] = useState("");

  useEffect(() => {
    const currentItem = items.find((item) => item.value === selectedValue);
    if (currentItem) {
      setInputLabel(currentItem.label);
    } else if (placeholder && placeholder.label) {
      setInputLabel(placeholder.label);
    } else {
      setInputLabel("");
    }
  }, [selectedValue, placeholder, items]);

  const handleValueChange = (value, index) => {
    if (value == "null") value = null;
    setSelectedValue(value);
    onValueChange?.(value, index);
    setShowPicker(false);
  };

  const renderPickerItems = () => {
    const combinedItems = placeholder
      ? [{ ...placeholder, isPlaceholder: true }, ...items]
      : items;

    return combinedItems.map((item) => (
      <Picker.Item
        key={item.value}
        label={item.label}
        value={item.value}
        color={item.color}
      />
    ));
  };

  const renderInput = () => (
    <TouchableOpacity
      style={[defaultStyles.textInput, style?.input]}
      onPress={() => !disabled && setShowPicker(true)}
      disabled={disabled}
    >
      <Text
        style={
          selectedValue
            ? defaultStyles.placeholder
            : [defaultStyles.placeholder, { color: primaryColors.lightGrey }]
        }
      >
        {inputLabel}
      </Text>
    </TouchableOpacity>
  );

  const renderIOSPicker = () => (
    <Modal
      visible={showPicker}
      transparent
      animationType="slide"
      onRequestClose={() => setShowPicker(false)}
    >
      <TouchableOpacity
        style={defaultStyles.modalViewTop}
        onPress={() => setShowPicker(false)}
      />
      <View style={defaultStyles.modalViewBottom}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={handleValueChange}
          {...pickerProps}
        >
          {renderPickerItems()}
        </Picker>
      </View>
    </Modal>
  );

  const renderAndroidPicker = () => (
    <View style={defaultStyles.viewContainer}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={handleValueChange}
        style={
          useNativeAndroidPickerStyle ? pickerProps?.style : { display: "none" }
        }
        enabled={!disabled}
        {...pickerProps}
      >
        {renderPickerItems()}
      </Picker>
      {!useNativeAndroidPickerStyle && renderInput()}
    </View>
  );

  if (Platform.OS === "ios") {
    return (
      <>
        {renderInput()}
        {renderIOSPicker()}
      </>
    );
  }

  return renderAndroidPicker();
};

RNPickerSelect.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      color: PropTypes.string,
    }),
  ).isRequired,
  value: PropTypes.any,
  placeholder: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any,
    color: PropTypes.string,
  }),
  style: PropTypes.object,
  useNativeAndroidPickerStyle: PropTypes.bool,
  textInputProps: PropTypes.object,
  pickerProps: PropTypes.object,
  disabled: PropTypes.bool,
};

export default RNPickerSelect;
