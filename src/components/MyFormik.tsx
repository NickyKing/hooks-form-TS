import React from "react";
import { Button, TextField } from "@material-ui/core";
import { Formik, Form, Field, FieldArray, getIn, FieldProps } from "formik";
import * as yup from "yup";
import uuidv4 from "uuid/v4";

const validationSchema = yup.object().shape({
  people: yup.array().of(
    yup.object().shape({
      id: yup.string(),
      firstName: yup
        .string()
        .max(10, "first name should be no longer than 10 characters."),
      lastName: yup.string()
    })
  )
});

// this should be an import
const Input = ({ field, form: { errors } }: FieldProps) => {
  const errorMessage = getIn(errors, field.name);
  return (
    <>
      <TextField {...field} />
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

const MyFormik = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <Formik
        initialValues={{ people: [{ id: "", firstName: "", lastName: "" }] }}
        onSubmit={() => {}}
        validationSchema={validationSchema}
      >
        {({ values }) => (
          <Form>
            <FieldArray name="people">
              {({ push, remove }) => (
                <div>
                  {values.people.map((person, index) => {
                    return (
                      <div key={person.id}>
                        <Field
                          style={{ margin: "0.8rem"}}
                          name={`people[${index}].firstName`}
                          component={Input}
                        />
                        <Field
                          style={{ margin: "10px"}}
                          name={`people[${index}].lastName`}
                          component={Input}
                        />
                        <span onClick={()=> remove(index)}>X</span>
                      </div>
                    );
                  })}

                  <Button
                    type="button"
                    onClick={() =>
                      push({ id: uuidv4(), firstName: "", lastName: "" })
                    }
                  >
                    Add to list
                  </Button>
                </div>
              )}
            </FieldArray>
            <div>
              <Button type="submit">submit</Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyFormik;
