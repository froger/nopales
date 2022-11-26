import { DefaultSession } from "next-auth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
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
    onSubmit={(values, { setSubmitting }) => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }}
  >
    <Form className="max-w-sm  container mx-auto border-solid border-slate-200 border-2 mt-12">
      <div className="bg-slate-200 px-4 py-6 block text-center">
        <h1 className="text-2xl leading-relaxed">Welcome</h1>
        <p className="leading-snug">
            Welcome to Nopales, to start contributing, we need you to set a username and accept the term and conditions.
        </p>
      </div>
      <div className="py-2 px-4">
        <label htmlFor="name">Username</label>
        <Field name="name" type="text" className="border-solid border-2 block" />
        <ErrorMessage name="name" className="text-red-600 text-sm" />
      </div>
    </Form>
  </Formik>
);

export default OnboardForm;
