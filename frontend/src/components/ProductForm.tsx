'use client';
import { useCreateProductMutation } from '@/store/products-api';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ProductSchema = Yup.object().shape({
  title: Yup.string().required(),
  price: Yup.number().required(),
  image: Yup.string().required(),
  category: Yup.string().required(),
  description: Yup.string(),
});

export default function ProductForm() {
  const [createProduct] = useCreateProductMutation();

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        image: '',
        category: '',
        price: 0,
        availability: true,
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        await createProduct(values);
        resetForm();
      }}
    >
      {() => (
        <Form className="form">
          <h3>Add Product</h3>
          <Field name="title" placeholder="Title" />
          <Field name="price" placeholder="Price" type="number" />
          <Field name="image" placeholder="Image URL" />
          <Field name="category" placeholder="Category" />
          <Field name="description" placeholder="Description" />
          <button type="submit">Add</button>
        </Form>
      )}
    </Formik>
  );
}
