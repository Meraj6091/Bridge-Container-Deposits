import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

// #region utils

/**
 * Null OnChange
 * Handle hidden input
 */
const nullOnchange = () => {
  // no operation (do nothing real quick)
};

/**
 * @fileoverview React Select Updated
 * Handles React Select as Normal
 * Prevents Form From Submitting if Required Prop Passed
  @param {} props
 */
const Select = (props) => {
  const { required, submitted, isLoading, isDisabled } = props;
  const enableRequired = !isDisabled;

  // Field Value or Empty
  const [value, setValue] = useState(props.value || "");

  // Field Reference
  let selectRef = useRef(null);

  /**
     * Set Select Reference
      @param {} ref
     */
  const setSelectRef = (ref) => {
    selectRef = ref;
  };

  /**
     * Handle Change
     * Call Props OnChange
      @param {} val
      @param {} actionMeta
     */
  const onChange = (val, actionMeta) => {
    props.onChange(val, actionMeta);
    setValue(val);
  };

  /**
   * Get Value
   * If Value is not undefined return value
   */
  const getValue = () => {
    if (props.value !== undefined) return props.value;
    return value || "";
  };

  // JSX
  return (
    <div>
      <ReactSelect
        {...props}
        ref={setSelectRef}
        submitted={submitted}
        required={required}
        onChange={onChange}
      />
      {enableRequired && (
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{
            opacity: 0,
            width: "100%",
            height: 0,
            position: "absolute",
          }}
          value={getValue()}
          onChange={nullOnchange}
          onFocus={() => selectRef.focus()}
          required={required}
        />
      )}
    </div>
  );
};

// Component Default Props
Select.defaultProps = {
  onChange: nullOnchange,
};

// Component Prop Types
Select.protoTypes = {
  onChange: PropTypes.func,
  required: PropTypes.bool,
  submitted: PropTypes.any,
  value: PropTypes.any,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default Select;
