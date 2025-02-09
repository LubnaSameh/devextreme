import React, { useState } from "react";
import {
  Form,
  SimpleItem,
  ButtonItem,
  GroupItem,
  TabbedItem,
  Tab,
} from "devextreme-react/form";

const EnhancedDevExtremeFormPage = () => {
  const [formData, setFormData] = useState({});

  // Validation rules - قواعد التحقق
  const validationRules = {
    required: (message) => [{ type: "required", message }],
    email: [{ type: "email", message: "Invalid email format" }],
    age: [
      {
        type: "range",
        min: 18,
        max: 100,
        message: "Age must be between 18 and 100",
      },
    ],
  };

  // Form fields data - تعريف الحقول
  const formSections = [
    {
      title: "Personal & Additional Info",
      fields: [
        {
          dataField: "name",
          editorType: "dxTextBox",
          placeholder: "Enter your name",
          validation: validationRules.required("Name is required"),
        },
        {
          dataField: "email",
          editorType: "dxTextBox",
          placeholder: "Enter your email",
          validation: [
            ...validationRules.required("Email is required"),
            ...validationRules.email,
          ],
        },
        {
          dataField: "age",
          editorType: "dxNumberBox",
          placeholder: "Enter your age",
          editorOptions: { min: 18, max: 100 },
          validation: validationRules.age,
        },
        {
          dataField: "gender",
          editorType: "dxSelectBox",
          placeholder: "Select gender",
          editorOptions: { items: ["Male", "Female"] },
          validation: validationRules.required("Gender is required"),
        },
        {
          dataField: "birthDate",
          editorType: "dxDateBox",
          placeholder: "Select birth date",
          editorOptions: { type: "date", displayFormat: "yyyy-MM-dd" },
          validation: validationRules.required("Birth date is required"),
        },
        {
          dataField: "skills",
          editorType: "dxTagBox",
          placeholder: "Select your skills",
          editorOptions: {
            items: [
              "JavaScript",
              "React",
              "Node.js",
              "CSS",
              "HTML",
              "Python",
              "Java",
            ],
            showSelectionControls: true,
          },
          validation: validationRules.required("Skills are required"),
        },
      ],
    },
    {
      title: "Address, Comments & Agreement",
      fields: [
        {
          dataField: "address",
          editorType: "dxTextBox",
          placeholder: "Enter your address",
          validation: validationRules.required("Address is required"),
        },
        {
          dataField: "city",
          editorType: "dxTextBox",
          placeholder: "Enter your city",
          validation: validationRules.required("City is required"),
        },
        {
          dataField: "comments",
          editorType: "dxTextArea",
          placeholder: "Additional comments",
          editorOptions: { height: 90 },
        },
        {
          dataField: "agreeTerms",
          editorType: "dxCheckBox",
          editorOptions: { text: "I agree to the terms and conditions" },
          validation: validationRules.required("You must agree to the terms"),
        },
      ],
    },
  ];

  // Handle form submission - تقديم الفورم
  const onSubmit = (e) => {
    const validationResult = e.validationGroup.validate();
    if (validationResult.isValid) {
      console.log("Form Submitted Data:", formData);
      alert("Form submitted successfully!");
    } else {
      alert("Please fix validation errors before submitting.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">DevExtreme Form</h2>
      <Form
        formData={formData}
        onFieldDataChanged={(e) =>
          setFormData({ ...formData, [e.dataField]: e.value })
        }
        colCount={1}
      >
        <TabbedItem>
          {formSections.map((section) => (
            <Tab key={section.title} title={section.title}>
              <GroupItem>
                {section.fields.map(
                  ({
                    dataField,
                    editorType,
                    placeholder,
                    validation,
                    editorOptions,
                  }) => (
                    <SimpleItem
                      key={dataField}
                      dataField={dataField}
                      editorType={editorType}
                      editorOptions={{ placeholder, ...editorOptions }}
                      validationRules={validation}
                    />
                  )
                )}
              </GroupItem>
            </Tab>
          ))}
        </TabbedItem>
        <ButtonItem
          horizontalAlignment="center"
          buttonOptions={{
            text: "Submit",
            type: "success",
            onClick: onSubmit,
          }}
        />
      </Form>
    </div>
  );
};

export default EnhancedDevExtremeFormPage;
