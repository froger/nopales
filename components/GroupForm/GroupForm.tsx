import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Card } from "components/Card";
import { Modal } from "components/Modal";
import { useState } from "react";
import { PrimaryButton } from "components/Button";
export type GroupFormValues = {
  name: string;
};

const GroupForm = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PrimaryButton
        href="#addbutton"
        className="underline hover:opacity-80"
        activeClassName=""
        onClick={() => {
          setOpen((o) => !o);
          return false;
        }}
      >
        Create a new group
      </PrimaryButton>
      <Modal open={open} onBackdropClick={() => setOpen(false)}>
        <div className="my-32 mx-auto shadow-xl border-stone-700">
          <Formik<GroupFormValues>
            initialValues={{ name: "" }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(30, "Must be 30 characters or less")
                .required("Required"),
            })}
            onSubmit={async ({ name }, { setSubmitting }) => {
              await axios.post("/api/groups", { name });
              setSubmitting(false);
            }}
          >
            <Form>
              <Card
                Header={
                  <>
                    <h1 className="text-2xl leading-relaxed">Create a Group</h1>
                    <p className="leading-snug">
                      <strong className="bold">
                        Let's start a revolution?
                      </strong>
                      <br />
                      define a name for your group and let's go.
                    </p>
                  </>
                }
                Footer={
                  <input
                    type="submit"
                    className="block p-2 rounded border-solid border-2 border-sky-300 focus:ring-4 focus:ring-yellow-400"
                    value="Create"
                  />
                }
              >
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="mt-1 squared border-solid border-2 block w-full px-1 py-3 focus:ring-4 focus:ring-yellow-400"
                />
                <span className="leading-snug text-red-600 text-sm">
                  <ErrorMessage name="name" />
                  &nbsp;
                </span>
              </Card>
            </Form>
          </Formik>
        </div>
      </Modal>
    </>
  );
};

export default GroupForm;
