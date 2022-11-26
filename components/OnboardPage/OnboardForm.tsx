import { DefaultSession } from "next-auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { signIn } from "next-auth/react";
export type OnboardFormProps = React.PropsWithChildren<{
  user: DefaultSession["user"];
}>;
export type OnboardFormValues = {
  name: string;
};

const OnboardForm = ({ user }: OnboardFormProps) => (
  <Formik<OnboardFormValues>
    initialValues={{ name: user?.name || "" }}
    validationSchema={Yup.object({
      name: Yup.string()
        .max(30, "Must be 30 characters or less")
        .required("Required"),
    })}
    onSubmit={async ({name}, { setSubmitting }) => {
      await axios.put("/api/me", {name});
      await axios.get(
        "/api/auth/session?refresh"
      )
      setSubmitting(false);
      window.location.reload();
    }}
  >
    <Form className="max-w-sm  container mx-auto border-solid border-slate-200 border-2 mt-12">
      <div className="px-6 py-6 block text-center">
        <h1 className="text-2xl leading-relaxed">Welcome</h1>
        <p className="leading-snug">
           <strong className="bold">Welcome to Nopales!</strong><br />
           set a username and accept the term and conditions to start a revolution.
        </p>
      </div>
      <div className="py-2 px-6">
        <label htmlFor="name">Username</label>
        <Field name="name" type="text" className="mt-1 squared border-solid border-2 block w-full px-1 py-3 focus:ring-4 focus:ring-yellow-400" />
        <span className="leading-snug text-red-600 text-sm">
          <ErrorMessage name="name" />&nbsp;
        </span>
      </div>
      <div className="py-4 px-6 flex justify-end items-center">
        <button className="block p-2 rounded border-solid border-2 border-sky-300 focus:ring-4 focus:ring-yellow-400">Submit</button>
      </div>
    </Form>
  </Formik>
);

export default OnboardForm;
